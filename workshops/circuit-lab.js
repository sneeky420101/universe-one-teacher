// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
// Educational low-voltage DC simulation only. Not instructions for mains wiring.
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.VoltframeCircuitLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const COMPONENTS = Object.freeze(['battery', 'switch', 'lamp']);
  const STEPS = Object.freeze([
    { id: 'identify', title: 'Identify components', prompt: 'Select the battery, switch and lamp in the diagram.', expected: 'identify' },
    { id: 'connect', title: 'Complete the loop', prompt: 'Connect battery positive to switch, switch to lamp, and lamp to battery negative.', expected: 'connect' },
    { id: 'close', title: 'Test the circuit', prompt: 'Close the switch and observe the lamp.', expected: 'close' },
    { id: 'explain', title: 'Explain the result', prompt: 'Explain why the lamp lights only when the path is closed.', expected: 'closed-loop' }
  ]);
  function createSession() {
    return { step: 0, attempts: 0, hintsUsed: 0, completed: false, history: [], edges: [], switchClosed: false };
  }
  function normalizeEdge(a, b) { return [a, b].sort().join('|'); }
  const REQUIRED = ['battery+', 'switch-in', 'switch-out', 'lamp-in', 'lamp-out', 'battery-'];
  const EXPECTED = [
    normalizeEdge('battery+', 'switch-in'),
    normalizeEdge('switch-out', 'lamp-in'),
    normalizeEdge('lamp-out', 'battery-')
  ];
  function circuitComplete(edges) {
    if (!Array.isArray(edges) || edges.length !== EXPECTED.length) return false;
    if (!edges.every(e => Array.isArray(e) && e.length === 2 &&
      e.every(x => typeof x === 'string' && REQUIRED.includes(x)) && e[0] !== e[1])) return false;
    const actual = new Set(edges.map(e => normalizeEdge(e[0], e[1])));
    return actual.size === EXPECTED.length && EXPECTED.every(e => actual.has(e));
  }
  function feedback(session, correct, explanation) {
    const n = correct ? 0 : session.attempts + 1;
    return {
      correct,
      message: correct ? 'Nice work. You have demonstrated this step.' :
        'Good attempt. This is a practice step, and you can try again as often as you need.',
      explanation,
      hint: correct ? null : n === 1 ? 'Trace the intended path from the positive terminal to the negative terminal.' :
        'The full path is battery positive → switch → lamp → battery negative. Both sides of the switch must be connected.',
      nextStep: correct ? STEPS[session.step + 1]?.id || null : STEPS[session.step].id
    };
  }
  function submit(session, action) {
    if (!session || !Number.isInteger(session.step) || session.step < 0 || session.step > STEPS.length || !Array.isArray(session.history) || !Number.isInteger(session.attempts) || session.attempts < 0 || typeof session.completed !== 'boolean' || (session.step === STEPS.length && !session.completed)) throw new TypeError('Invalid session');
    if (session.completed) return { session, result: { correct: true, message: 'Lesson already completed.', nextStep: null } };
    const step = STEPS[session.step];
    let correct = false, explanation = '';
    if (step.id === 'identify') {
      correct = Array.isArray(action?.components) && COMPONENTS.every(c => action.components.includes(c));
      explanation = 'A source provides energy, a switch controls the path, and a lamp converts electrical energy into light.';
    } else if (step.id === 'connect') {
      correct = Array.isArray(action?.edges) && action.edges.every(e => Array.isArray(e) && e.length === 2 && e.every(x => REQUIRED.includes(x))) && circuitComplete(action.edges);
      explanation = 'Current needs a continuous path through the switch and lamp back to the source. This model uses idealized components.';
    } else if (step.id === 'close') {
      correct = action?.switchClosed === true;
      explanation = 'Closing the switch joins the path, allowing current through the lamp in this simplified circuit.';
    } else {
      correct = action?.answer === 'closed-loop';
      explanation = 'A closed conductive loop is required for sustained current in this simplified DC circuit.';
    }
    const result = feedback(session, correct, explanation);
    const next = {
      ...session,
      step: session.step + (correct ? 1 : 0),
      attempts: correct ? 0 : session.attempts + 1,
      hintsUsed: session.hintsUsed + (correct ? 0 : 1),
      completed: correct && session.step === STEPS.length - 1,
      history: [...session.history, { step: step.id, correct }]
    };
    return { session: next, result: { ...result, nextStep: correct ? STEPS[next.step]?.id || null : step.id } };
  }
  return { COMPONENTS, STEPS, createSession, circuitComplete, submit };
});
