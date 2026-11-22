// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('local server exposes circuit engine with JavaScript MIME and safe same-origin CSP', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');
  assert.match(source, /'\/workshops\/circuit-lab\.js':'workshops\/circuit-lab\.js'/);
  assert.match(source, /script-src 'self' 'unsafe-inline'/);
  assert.match(source, /file\.endsWith\('\.js'\)\?'text\/javascript; charset=utf-8'/);
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'workshops', 'circuit-lab.js')));
});
