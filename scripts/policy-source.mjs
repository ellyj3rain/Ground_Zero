#!/usr/bin/env node
/** Identity and structure of canonical policy source; no adoption or runtime authority. */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCUMENTS = ['constitutional/CONSTITUTION.md', 'constitutional/BILL_OF_STANDARDS.md'];
const MANIFEST = 'constitutional/POLICY-SOURCE.json';
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const slug = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');

function outsideFences(text) {
  let fence = null;
  return text.split(/\r?\n/).map((line) => {
    const marker = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && /^[ \t]*$/.test(marker[2])) {
        fence = null;
      }
      return '';
    }
    if (marker && !(marker[1][0] === '`' && marker[2].includes('`'))) {
      fence = marker[1];
      return '';
    }
    return line;
  }).join('\n');
}

export function collectPolicy(rootInput) {
  const root = resolve(rootInput);
  const captured = DOCUMENTS.map((path) => {
    const bytes = readFileSync(resolve(root, path));
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return { path, sha256: sha256(bytes), text };
  });
  const documents = captured.map(({ path, sha256 }) => ({ path, sha256 }));
  const bill = outsideFences(captured[1].text);
  const provisions = [...bill.matchAll(/^### ((Article [IVX]+|Standard \d+): .+)$/gm)].map((match) => ({
    id: match[2].toLowerCase().replace(' ', '-'),
    source: DOCUMENTS[1] + '#' + slug(match[1]),
    title: match[1],
  }));
  const expected = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'].map((id) => 'article-' + id.toLowerCase())
    .concat(Array.from({ length: 17 }, (_, i) => `standard-${i + 1}`));
  if (JSON.stringify(provisions.map((entry) => entry.id)) !== JSON.stringify(expected)) {
    throw new Error('The canonical Bill must contain its nine ordered articles and seventeen ordered standards.');
  }
  const body = {
    format: 'ground-zero.policy-source/1',
    project: 'Ground Zero',
    documents,
    provisions,
  };
  return { ...body, sourceRevision: 'sha256:' + sha256(JSON.stringify(body)) };
}

export function verifyPolicy(rootInput) {
  const root = resolve(rootInput);
  const current = collectPolicy(root);
  const retained = JSON.parse(readFileSync(resolve(root, MANIFEST), 'utf8'));
  if (JSON.stringify(retained) !== JSON.stringify(current)) {
    throw new Error('Policy-source manifest differs from canonical source; review the edit before regenerating it.');
  }
  return current;
}

export function main(args) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node scripts/policy-source.mjs [--check | --write] [--root DIRECTORY]');
    console.log('--check verifies retained source identity; --write regenerates it after a selected policy edit.');
    return 0;
  }
  let mode = '--check';
  let root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const seen = new Set();
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if ((arg === '--check' || arg === '--write') && !seen.has('mode')) {
      seen.add('mode'); mode = arg;
    } else if (arg === '--root' && !seen.has('root') && args[i + 1]) {
      seen.add('root'); root = resolve(args[++i]);
    } else {
      console.error('Usage: node scripts/policy-source.mjs [--check | --write] [--root DIRECTORY]');
      return 2;
    }
  }
  try {
    const result = mode === '--write' ? collectPolicy(root) : verifyPolicy(root);
    if (mode === '--write') writeFileSync(resolve(root, MANIFEST), JSON.stringify(result, null, 2) + '\n');
    console.log(`${mode === '--write' ? 'Recorded' : 'Verified'} ${result.sourceRevision}; ${result.provisions.length} provision identities.`);
    console.log('Source identity only; adoption, semantic conformity and execution authority remain separate.');
    return 0;
  } catch (error) {
    console.error(error.code ? `Policy source unavailable (${error.code}).` : error.message);
    return 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
