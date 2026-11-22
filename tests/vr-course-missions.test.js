const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync('quest.html','utf8');
test('VR classroom has school and college course choices',()=>{for(const id of ['school-science','MATH-FOUND-001','SCI-FOUND-001'])assert.ok(html.includes(id));assert.match(html,/id="course"/)});
test('VR hands-on missions track practical steps and are noncredit',()=>{assert.match(html,/const courseSteps=/);assert.match(html,/stepsCompleted\.add\(step\)/);assert.match(html,/Practice mission complete/);assert.match(html,/No official grade/);});
test('VR classroom supports controllers and regular browser input',()=>{assert.match(html,/targetRaySpace/);assert.match(html,/id="interact"/);assert.match(html,/\$\('interact'\)\.onclick=/)});
