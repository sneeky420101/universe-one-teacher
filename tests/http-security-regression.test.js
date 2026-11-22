// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
// Regression checks for unsafe HTTP methods, path traversal, and information leaks.
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const net = require('node:net');
const http = require('node:http');

async function request(port, method, path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, method, path }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('production HTTP boundary rejects mutation and traversal and hides internal files', async () => {
  const probe = net.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const port = probe.address().port;
  probe.close();
  await once(probe, 'close');

  const child = spawn(process.execPath, ['server.js'], {
    cwd: require('node:path').resolve(__dirname, '..'),
    env: { ...process.env, PORT: String(port) },
    stdio: 'ignore'
  });
  try {
    let ready = false;
    for (let i = 0; i < 50; i++) {
      if (child.exitCode !== null) throw new Error('Server exited before readiness');
      try {
        if ((await request(port, 'GET', '/health')).status === 200) {
          ready = true;
          break;
        }
      } catch {}
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'server failed to start');

    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
      const result = await request(port, method, '/api/verified-knowledge');
      assert.equal(result.status, 405, method);
      assert.equal(result.headers.allow, 'GET, HEAD');
    }
    for (const path of ['/server.js', '/package.json', '/.git/config', '/%2e%2e/server.js', '/curriculum/source-registry.json']) {
      const result = await request(port, 'GET', path);
      assert.equal(result.status, 404, path);
      assert.doesNotMatch(result.body, /require\(|private_key|password/i);
    }
    const head = await request(port, 'HEAD', '/');
    assert.equal(head.status, 200);
    assert.equal(head.body, '');
    assert.equal(head.headers['x-content-type-options'], 'nosniff');
    assert.equal(head.headers['x-frame-options'], 'DENY');
    assert.equal(head.headers['cache-control'], 'no-store');
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const exit = once(child, 'exit');
      child.kill();
      await exit.catch(() => {});
    }
  }
});
