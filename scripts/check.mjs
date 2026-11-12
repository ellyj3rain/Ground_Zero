#!/usr/bin/env node
/** Local source/link hygiene. This is not a semantic or complete disclosure review. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIP = new Set(['.git', 'node_modules', 'build', 'coverage', '.cache']);
const SECRET_PATTERNS = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['API key', /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9_]{36,}\b/],
];

function inRoot(root, path) {
  const pathRelative = relative(root, path);
  return pathRelative !== '..' && !pathRelative.startsWith('..' + sep) && !resolve(path).startsWith('\\\\');
}

function withoutFences(text) {
  let fence = null;
  return text.split(/\r?\n/).map((line) => {
    const match = /^\s*(`{3,}|~{3,})/.exec(line);
    if (match && (!fence || (match[1][0] === fence[0] && match[1].length >= fence.length))) {
      fence = fence ? null : match[1];
      return '';
    }
    return fence ? '' : line;
  }).join('\n');
}

function headingAnchors(text) {
  const counts = new Map();
  return new Set(withoutFences(text).split('\n').flatMap((line) => {
    const match = /^#{1,6}\s+(.+?)(?:\s+#+)?$/.exec(line);
    if (!match) return [];
    const slug = match[1].toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
    const count = counts.get(slug) ?? 0;
    counts.set(slug, count + 1);
    return [count ? `${slug}-${count}` : slug];
  }));
}

export function inspect(rootInput) {
  const root = resolve(rootInput);
  const failures = [];
  const files = new Map();
  const fail = (file, message) => failures.push(`${file}: ${message}`);
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = resolve(directory, entry.name);
      const name = relative(root, full).split(sep).join('/');
      if (entry.isSymbolicLink()) { fail(name, 'symbolic link requires an explicit source boundary'); continue; }
      if (entry.isDirectory()) { if (!SKIP.has(entry.name)) walk(full); continue; }
      if (!entry.isFile()) { fail(name, 'unsupported source file type'); continue; }
      if (/(?:^|\/)\.env(?:\.|$)|\.(?:pem|key|sqlite3?|db)$/i.test(name)) fail(name, 'private-state or credential-bearing filename');
      let text;
      try { text = new TextDecoder('utf-8', { fatal: true }).decode(readFileSync(full)); }
      catch { fail(name, 'non-UTF-8 source needs a separately reviewed asset boundary'); continue; }
      files.set(full, text);
      const lines = text.split(/\r?\n/);
      lines.forEach((line, index) => {
        if (/^(?:<{7}|={7}|>{7})(?:\s|$)/.test(line)) fail(name, `merge conflict marker at line ${index + 1}`);
        for (const [label, pattern] of SECRET_PATTERNS) if (pattern.test(line)) fail(name, `${label} pattern at line ${index + 1}`);
        if (/(?:[A-Za-z]:[\\/]Users[\\/]|\/mnt\/[a-z]\/Users\/|\/home\/|\/Users\/)[^\s<>]+/.test(line)) {
          fail(name, `machine-specific user path at line ${index + 1}`);
        }
      });
    }
  }
  try { walk(root); } catch (error) { fail('.', `cannot inspect source: ${error.code ?? error.name}`); }
  let links = 0;
  for (const [file, text] of files) {
    if (!file.endsWith('.md')) continue;
    const name = relative(root, file).split(sep).join('/');
    const pattern = /!?\[[^\]\n]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\)/g;
    for (const match of withoutFences(text).matchAll(pattern)) {
      const raw = match[1] ?? match[2];
      if (/^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^[a-z]:[\\/]/i.test(raw)) continue;
      links += 1;
      const hash = raw.indexOf('#');
      let pathname, fragment;
      try {
        pathname = decodeURIComponent(hash < 0 ? raw : raw.slice(0, hash));
        fragment = hash < 0 ? '' : decodeURIComponent(raw.slice(hash + 1));
      } catch { fail(name, 'malformed encoded link'); continue; }
      const target = pathname ? resolve(dirname(file), pathname) : file;
      if (!inRoot(root, target) || /^[a-z]:[\\/]/i.test(pathname) || pathname.startsWith('/')) {
        fail(name, 'local link leaves the repository'); continue;
      }
      let info;
      try { info = statSync(target); } catch { fail(name, `missing link target: ${pathname || '.'}`); continue; }
      if (info.isDirectory()) continue;
      if (!files.has(target)) { fail(name, `link target is not in inspected source: ${pathname}`); continue; }
      if (fragment && target.endsWith('.md') && !headingAnchors(files.get(target)).has(fragment)) {
        fail(name, `missing heading: ${pathname || name}#${fragment}`);
      }
    }
  }
  return { files: files.size, localLinks: links, failures };
}

export function main(args) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node scripts/check.mjs [--root DIRECTORY]');
    console.log('Checks UTF-8 source, local Markdown targets/headings, conflict markers and limited private-data patterns.');
    return 0;
  }
  if (args.length && !(args.length === 2 && args[0] === '--root')) {
    console.error('Usage: node scripts/check.mjs [--root DIRECTORY]');
    return 2;
  }
  const root = args.length ? args[1] : resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const result = inspect(root);
  for (const failure of result.failures) console.error(failure);
  console.log(`${result.files} source files; ${result.localLinks} local links; ${result.failures.length} findings.`);
  return result.failures.length ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
