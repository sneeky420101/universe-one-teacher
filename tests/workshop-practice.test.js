const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const html=fs.readFileSync(path.join(__dirname,'..','life-workshops-3d.html'),'utf8');
test('practice activity exposes prompt, choices and feedback',()=>{for(const id of ['practicePrompt','practiceChoices','practiceFeedback'])assert.ok(html.includes('id="'+id+'"'))});
test('practice decisions gate assessment and allow correction',()=>{assert.match(html,/!practiceDone\[key\]/);assert.match(html,/Complete the practice decision before checking your answer/);assert.match(html,/Revisit the procedure, compare the choices, and try again/)});

test('practice scenarios are independent from knowledge-check answers',()=>{assert.match(html,/const practiceScenarios=/);assert.match(html,/practiceScenarios\[\$\('workshop'\)\.value\]\[selected\]/);assert.match(html,/i===practice\.correct/);assert.doesNotMatch(html,/const practiceOptions=\[s\.choices\[s\.answer\]/)});
