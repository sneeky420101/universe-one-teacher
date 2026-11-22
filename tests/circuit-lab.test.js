// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test = require('node:test');
const assert = require('node:assert/strict');
const lab = require('../workshops/circuit-lab.js');
const edges = [
  ['battery+', 'switch-in'],
  ['switch-out', 'lamp-in'],
  ['lamp-out', 'battery-']
];
test('empty circuit does not count as complete', () => {
  assert.equal(lab.circuitComplete([]), false);
  assert.equal(lab.circuitComplete(edges), true);
});
test('incorrect answers provide supportive retries without skipping steps', () => {
  const start = lab.createSession();
  const {session, result} = lab.submit(start, {components: ['battery']});
  assert.equal(session.step, 0);
  assert.equal(session.attempts, 1);
  assert.equal(result.correct, false);
  assert.match(result.message, /try again/);
  assert.ok(result.hint);
});
test('learner can finish the complete sequence', () => {
  let s = lab.createSession();
  for (const action of [
    {components: ['battery','switch','lamp']},
    {edges},
    {switchClosed: true},
    {answer: 'closed-loop'}
  ]) {
    const response = lab.submit(s, action);
    assert.equal(response.result.correct, true);
    s = response.session;
  }
  assert.equal(s.completed, true);
  assert.equal(s.step, lab.STEPS.length);
});
test('malformed connection does not pass', () => {
  const start = lab.submit(lab.createSession(), {components: ['battery','switch','lamp']}).session;
  const result = lab.submit(start, {edges: [['battery+', 'lamp-in']]});
  assert.equal(result.result.correct, false);
});
