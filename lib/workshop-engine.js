'use strict';
function createWorkshop(definition) {
  if (!definition || !Array.isArray(definition.parts) || !Array.isArray(definition.steps)) throw Error('Invalid workshop');
  const parts = new Map();
  for (const part of definition.parts) {
    if (!part.id || parts.has(part.id)) throw Error('Duplicate or missing part ID');
    parts.set(part.id, { ...part, installed: true });
  }
  const steps = new Map();
  for (const step of definition.steps) {
    if (!step.id || steps.has(step.id)) throw Error('Duplicate or missing step ID');
    if (!['remove','install','inspect'].includes(step.action) || !parts.has(step.part)) throw Error('Invalid step');
    steps.set(step.id, step);
  }
  for (const step of steps.values()) for (const id of step.requires || []) if (!steps.has(id)) throw Error('Unknown prerequisite');
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    if (visiting.has(id)) throw Error('Cyclic prerequisites');
    if (visited.has(id)) return;
    visiting.add(id);
    for (const prerequisite of steps.get(id).requires || []) visit(prerequisite);
    visiting.delete(id); visited.add(id);
  }
  for (const id of steps.keys()) visit(id);
  for (const step of steps.values()) {
    if (step.specRequired && step.verifiedSpec && (!Number.isFinite(step.target) || !Number.isFinite(step.tolerance) || step.tolerance < 0)) throw Error('Invalid verified specification');
  }
  const done = new Set(), events = [];
  function perform(input = {}) {
    if (!input || typeof input !== 'object') return {ok:false,reason:'invalid-input'};
    const {stepId,tool,measurement} = input;
    const step = steps.get(stepId);
    if (!step) return { ok:false, reason:'unknown-step' };
    if (done.has(stepId)) return { ok:false, reason:'already-completed' };
    if ((step.requires || []).some(id => !done.has(id))) return { ok:false, reason:'prerequisite', hint:'Complete earlier operations.' };
    if (step.tool && step.tool !== tool) return { ok:false, reason:'wrong-tool', hint:'Check the service procedure for the correct tool.' };
    if (step.specRequired && (typeof measurement !== 'number' || !Number.isFinite(measurement))) return { ok:false, reason:'verified-measurement-required' };
    if (step.specRequired && !step.verifiedSpec) return { ok:false, reason:'missing-verified-spec' };
    if (step.specRequired && Math.abs(measurement-step.target) > step.tolerance) return { ok:false, reason:'measurement-out-of-range' };
    const part = parts.get(step.part);
    if (step.action === 'remove' && !part.installed) return { ok:false, reason:'already-removed' };
    if (step.action === 'install' && part.installed) return { ok:false, reason:'already-installed' };
    if (step.action === 'remove') part.installed = false;
    if (step.action === 'install') part.installed = true;
    done.add(stepId); events.push({ stepId, action:step.action, part:step.part });
    return { ok:true, complete:done.size === steps.size, progress:done.size / steps.size };
  }
  return { perform, snapshot: () => ({ completed:[...done], parts:[...parts.values()].map(p=>({...p})), events:events.map(e=>({...e})), complete:done.size===steps.size }) };
}
module.exports = { createWorkshop };
