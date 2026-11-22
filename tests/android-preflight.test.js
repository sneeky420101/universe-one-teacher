// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test=require('node:test');
const assert=require('node:assert/strict');
const cp=require('node:child_process');
const path=require('node:path');
test('Android preflight fails closed before verified Play release evidence',()=>{
  const root=path.resolve(__dirname,'..');
  const result=cp.spawnSync(process.execPath,['scripts/android-preflight.js'],{cwd:root,encoding:'utf8'});
  assert.equal(result.status,1,'Play preflight must not pass without required verified assets and device tests');
  assert.match(result.stderr,/BLOCKED/);
});
