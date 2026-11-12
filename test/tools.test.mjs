import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync } from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { computeNextVersion } from '../scripts/odometer.mjs';
import { inspect } from '../scripts/check.mjs';
import { collectPolicy, verifyPolicy } from '../scripts/policy-source.mjs';

function policyFixture() {
  const root = mkdtempSync(join(tmpdir(), 'ground-zero-policy-'));
  mkdirSync(join(root, 'constitutional'));
  for (const name of ['CONSTITUTION.md', 'BILL_OF_STANDARDS.md']) {
    copyFileSync(fileURLToPath(new URL(`../constitutional/${name}`, import.meta.url)), join(root, 'constitutional', name));
  }
  return root;
}

test('odometer preserves scope accounting across direct changes, carries and refusals', () => {
  const cases = [
    ['2.3.4.5-alpha', 'major', '3.0.0.0-alpha', false],
    ['2.3.4.5-alpha', 'minor', '2.4.0.0-alpha', false],
    ['2.3.4.5-alpha', 'kohai', '2.3.5.0-alpha', false],
    ['2.3.4.5-alpha', 'patch', '2.3.4.6-alpha', false],
    ['2.3.4.5-alpha', 'hotfix', '2.3.4.6-alpha', false],
    ['2.3.4.24-rc.1', 'patch', '2.3.5.0-rc.1', true],
    ['2.3.16.24', 'hotfix', '2.4.0.0', true],
    ['2.12.16.24-alpha', 'patch', '3.0.0.0-alpha', true],
    ['2.12.16.7', 'kohai', '3.0.0.0', true],
    ['2.12.4.7', 'minor', '3.0.0.0', true],
    ['2.12.4.7', 'patch', '2.12.4.8', false],
    ['2.9.8.4', 'minor', '2.10.0.0', false],
  ];
  for (const [current, tier, next, carried] of cases) {
    const result = computeNextVersion(current, tier);
    assert.equal(result.ok, true, `${current} ${tier}`);
    assert.equal(result.next, next);
    assert.equal(result.carried, carried);
    assert.equal(result.selectedTier, tier);
  }
  assert.deepEqual(computeNextVersion('2.9.8.4', 'minor').milestones, ['minor']);
  assert.deepEqual(computeNextVersion('2.10.8.4', 'patch').milestones, []);
  for (const [current, tier] of [
    ['1.2.3', 'patch'], ['1.13.0.0', 'patch'], ['1.0.17.0', 'patch'],
    ['1.0.0.25', 'patch'], ['1.0.0.0', 'release'], ['01.0.0.0', 'minor'],
    ['1.0.0.0-alpha..1', 'patch'], ['9007199254740992.0.0.0', 'patch'],
    ['9007199254740991.12.16.24', 'patch'], ['9007199254740991.0.0.0', 'major'],
  ]) assert.equal(computeNextVersion(current, tier).ok, false, `${current} ${tier}`);
  const script = fileURLToPath(new URL('../scripts/odometer.mjs', import.meta.url));
  const good = spawnSync(process.execPath, [script, '2.3.4.5-alpha', 'kohai'], { encoding: 'utf8' });
  assert.equal(good.status, 0);
  assert.equal(good.stdout.trim(), '2.3.5.0-alpha');
  assert.equal(spawnSync(process.execPath, [script, '2.3.4.5', 'patch', '--unknown']).status, 2);
});

test('source check detects broken relationships and reports private-data patterns without values', () => {
  const root = mkdtempSync(join(tmpdir(), 'ground-zero-check-'));
  try {
    mkdirSync(join(root, 'docs'));
    writeFileSync(join(root, 'README.md'), '# Start\n\n[Guide](docs/guide.md#use-it)\n');
    writeFileSync(join(root, 'docs/guide.md'), '# Guide\n\n## Use it\n\n[Back](../README.md)\n');
    assert.equal(inspect(root).failures.length, 0);
    writeFileSync(join(root, 'docs/guide.md'), '# Guide\n\n[Absent](missing.md)\n[Escape](../../outside.md)\n[Heading](../README.md#absent)\n');
    let result = inspect(root);
    assert(result.failures.some((x) => x.includes('missing link target')));
    assert(result.failures.some((x) => x.includes('leaves the repository')));
    assert(result.failures.some((x) => x.includes('missing heading')));
    const fakeKey = ['-----BEGIN', 'PRIVATE KEY-----'].join(' ');
    writeFileSync(join(root, '.env'), fakeKey + '\n');
    result = inspect(root);
    assert(result.failures.some((x) => x.includes('credential-bearing filename')));
    assert(result.failures.some((x) => x.includes('private key pattern')));
    assert(result.failures.every((x) => !x.includes(fakeKey)));
    writeFileSync(join(root, 'bad.md'), Buffer.from([0xff]));
    assert(inspect(root).failures.some((x) => x.includes('non-UTF-8')));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
  const publicRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const script = fileURLToPath(new URL('../scripts/check.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [script, '--root', publicRoot], { cwd: tmpdir(), encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test('policy-source receiving detects source-body drift and missing provisions without issuing authority', () => {
  const root = policyFixture();
  try {
    const initial = collectPolicy(root);
    assert.equal(initial.provisions.length, 26);
    assert.equal(initial.project, 'Ground Zero');
    assert.equal(Object.hasOwn(initial, 'permissions'), false);
    const manifest = join(root, 'constitutional/POLICY-SOURCE.json');
    writeFileSync(manifest, JSON.stringify(initial, null, 2) + '\n');
    assert.deepEqual(verifyPolicy(root), initial);
    const constitution = join(root, 'constitutional/CONSTITUTION.md');
    writeFileSync(constitution, readFileSync(constitution, 'utf8') + '\nA synthetic test amendment.\n');
    assert.notEqual(collectPolicy(root).sourceRevision, initial.sourceRevision);
    assert.throws(() => verifyPolicy(root), /differs from canonical source/);
    const script = fileURLToPath(new URL('../scripts/policy-source.mjs', import.meta.url));
    const write = spawnSync(process.execPath, [script, '--write', '--root', root], { cwd: tmpdir(), encoding: 'utf8' });
    assert.equal(write.status, 0, write.stderr);
    const check = spawnSync(process.execPath, [script, '--root', root, '--check'], { cwd: tmpdir(), encoding: 'utf8' });
    assert.equal(check.status, 0, check.stderr);
    const bill = join(root, 'constitutional/BILL_OF_STANDARDS.md');
    writeFileSync(bill, readFileSync(bill, 'utf8').replace('### Standard 14:', '### Missing standard:'));
    assert.throws(() => collectPolicy(root), /seventeen ordered standards/);
    assert.equal(spawnSync(process.execPath, [script, '--write', '--check', '--root', root]).status, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('policy source excludes fenced examples instead of inventing rendered provision anchors', () => {
  const root = policyFixture();
  try {
    const bill = join(root, 'constitutional/BILL_OF_STANDARDS.md');
    const original = readFileSync(bill, 'utf8');
    const heading = '### Standard 14: Coherent responsibilities and work';
    assert(original.includes(heading));
    for (const example of [
      `\`\`\`md\n${heading}\n\`\`\``,
      `~~~md\n${heading}\n~~~`,
      `\`\`\`\`md\n\`\`\`\n${heading}\n\`\`\`\``,
      `\`\`\`md\n\`\`\`not-a-closing-fence\n${heading}\n\`\`\``,
    ]) {
      writeFileSync(bill, original.replace(heading, example));
      assert.throws(() => collectPolicy(root), /seventeen ordered standards/);
    }
    writeFileSync(bill, original.replace(heading, `\`\`\`md\n${heading}\n\`\`\`\n\n${heading}`));
    const result = collectPolicy(root);
    assert.equal(result.provisions.length, 26);
    assert.equal(result.provisions.find((entry) => entry.id === 'standard-14').title, heading.slice(4));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('policy digest and provisions describe the same captured Bill when a later read would differ', { concurrency: false }, () => {
  const root = policyFixture();
  const originalRead = fs.readFileSync;
  try {
    const expected = collectPolicy(root);
    const bill = join(root, 'constitutional/BILL_OF_STANDARDS.md');
    const original = originalRead(bill, 'utf8');
    const later = original.replace('### Standard 14: Coherent responsibilities and work', '### Standard 14: Changed title from a later read');
    assert.notEqual(later, original);
    let billReads = 0;
    fs.readFileSync = (file, options) => {
      if (file === bill && ++billReads > 1) {
        return options === 'utf8' ? later : Buffer.from(later);
      }
      return originalRead(file, options);
    };
    syncBuiltinESMExports();
    const observed = collectPolicy(root);
    assert.deepEqual(observed.documents, expected.documents);
    assert.deepEqual(observed.provisions, expected.provisions);
    assert.equal(observed.sourceRevision, expected.sourceRevision);
  } finally {
    fs.readFileSync = originalRead;
    syncBuiltinESMExports();
    rmSync(root, { recursive: true, force: true });
  }
  assert.equal(readFileSync, originalRead);
});
