// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test('offline shell lists only existing local files', () => {
  const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const match = source.match(/const SHELL=(\[[^;]+\]);/);
  assert.ok(match, 'service worker shell list missing');
  const entries = JSON.parse(match[1].replace(/'/g, '"'));
  for (const entry of entries) {
    const local = entry === './' ? 'index.html' : entry.replace(/^\.\//, '');
    assert.ok(fs.existsSync(path.join(root, local)), 'missing cached asset: ' + entry);
  }
});
test('uncached offline navigation must not masquerade as home page', () => {
  const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  assert.doesNotMatch(source, /cached\s*\|\|\s*caches\.match\('\.\/index\.html'\)/);
  assert.match(source, /cached\s*\|\|\s*Response\.error\(\)/);
});
