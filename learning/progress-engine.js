// VOLTFRAME Studios — privacy-preserving local learning state primitive.
// No account, student identity, network transmission, or cloud synchronization.
'use strict';
const VALID = new Set(['attempted', 'mastered']);
function recordAttempt(state, event) {
  if (!state || typeof state !== 'object' || Array.isArray(state)) throw new TypeError('Invalid state');
  if (!event || typeof event !== 'object') throw new TypeError('Invalid event');
  const { eventId, lessonId, status, score } = event;
  for (const [name, value] of [['eventId',eventId],['lessonId',lessonId]]) {
    if (typeof value !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(value)) throw new TypeError('Invalid '+name);
  }
  if (!VALID.has(status)) throw new TypeError('Invalid status');
  if (!Number.isFinite(score) || score < 0 || score > 100) throw new RangeError('Score must be 0–100');
  const events = Array.isArray(state.events) ? state.events : [];
  if (events.some(x => x.eventId === eventId)) return { state, duplicate: true };
  const entry = Object.freeze({eventId, lessonId, status, score});
  return {state: {version:1, events:[...events,entry]}, duplicate:false};
}
function lessonSummary(state, lessonId) {
  const events = (state?.events || []).filter(e => e.lessonId === lessonId);
  return {attempts:events.length, bestScore:events.length ? Math.max(...events.map(e=>e.score)) : null,
    mastered:events.some(e=>e.status === 'mastered')};
}
function supportiveFeedback(correct) {
  return correct
    ? 'Good work. Explain why your answer works, then try the next challenge.'
    : 'Good effort. Review the explanation, compare each step with your answer, and try again. Mistakes are part of learning.';
}
module.exports = {recordAttempt,lessonSummary,supportiveFeedback};
