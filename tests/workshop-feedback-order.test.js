const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const html=fs.readFileSync(path.join(__dirname,'..','life-workshops-3d.html'),'utf8');
test('practice success feedback is written after rerender',()=>{assert.ok(html.includes("render();$('practiceFeedback').textContent='Good reasoning."))});
test('incorrect practice decisions provide a retry path',()=>{assert.ok(html.includes('Revisit the procedure, compare the choices, and try again.'))});
