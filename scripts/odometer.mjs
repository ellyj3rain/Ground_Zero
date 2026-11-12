#!/usr/bin/env node
/** Mechanical Ground Zero accounting. Tier selection and release decisions remain external. */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CAPS = [Number.MAX_SAFE_INTEGER, 12, 16, 24];
const TIERS = new Map([['major', 0], ['minor', 1], ['kohai', 2], ['patch', 3], ['hotfix', 3]]);

export function computeNextVersion(current, requestedTier) {
  const tier = String(requestedTier ?? '').toLowerCase();
  if (!TIERS.has(tier)) return { ok: false, error: 'Select major, minor, kohai, patch or hotfix.' };
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.exec(String(current ?? ''));
  if (!match) return { ok: false, error: 'Expected four canonical numeric coordinates and an optional suffix.' };
  const coordinates = match.slice(1, 5).map(Number);
  if (coordinates.some((n, i) => !Number.isSafeInteger(n) || n > CAPS[i])) {
    return { ok: false, error: 'A coordinate is outside the disclosed policy or safe integer range.' };
  }
  const selectedIndex = TIERS.get(tier);
  let index = selectedIndex;
  while (index > 0 && coordinates[index] === CAPS[index]) {
    coordinates[index] = 0;
    index -= 1;
  }
  if (coordinates[index] === Number.MAX_SAFE_INTEGER) {
    return { ok: false, error: 'The next major coordinate exceeds the safe integer range.' };
  }
  coordinates[index] += 1;
  coordinates.fill(0, index + 1);
  const suffix = match[5] ?? '';
  const labels = ['major', 'minor', 'kohai', 'patch'];
  const milestones = index > 0 && coordinates[index] === 10 ? [labels[index]] : [];
  return {
    ok: true,
    next: coordinates.join('.') + suffix,
    selectedTier: tier,
    carried: index < selectedIndex,
    maturitySuffix: suffix,
    milestones,
  };
}

export function main(args) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node scripts/odometer.mjs CURRENT TIER [--explain]');
    console.log('TIER: major | minor | kohai | patch | hotfix. Prints only; changes no files.');
    return 0;
  }
  const positional = args.filter((arg) => arg !== '--explain');
  if (positional.length !== 2 || args.filter((arg) => arg === '--explain').length > 1) {
    console.error('Usage: node scripts/odometer.mjs CURRENT TIER [--explain]');
    return 2;
  }
  const result = computeNextVersion(...positional);
  if (!result.ok) {
    console.error(result.error);
    return 2;
  }
  console.log(result.next);
  if (args.includes('--explain')) {
    console.log(`${result.carried ? 'Mechanical carry' : 'Direct movement'}; the selected tier was ${result.selectedTier}.`);
    console.log('The maturity suffix is preserved. No release, compatibility or completion decision is made.');
    if (result.milestones.length) console.log(`Informational milestone 10: ${result.milestones.join(', ')}.`);
  }
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
