// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
test('curriculum publication gate runs successfully on current catalog', () => {
  const result = spawnSync(process.execPath, [path.join(__dirname, '..', 'scripts', 'validate-curriculum.js')], { encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  assert.match(result.stdout, /Curriculum gate passed/);
});
