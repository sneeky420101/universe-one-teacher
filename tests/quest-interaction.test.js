// VOLTFRAME Studios — WebXR hands-on classroom regression checks
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync('quest.html','utf8');
test('VR controller trigger performs a learning interaction',()=>{assert.match(html,/session\.addEventListener\('select',interact\)/);assert.match(html,/function interact\(\)/)});
test('non-VR users have an equivalent accessible interaction',()=>{assert.match(html,/id="interact"/);assert.match(html,/\$\('interact'\)\.onclick=interact/);assert.match(html,/id="activity" role="status"/)});
test('hands-on practice does not claim official grades',()=>{assert.match(html,/Practice only; no official grade/);assert.match(html,/experimental immersive WebXR|Experimental WebXR/);});

test('VR interaction uses controller ray and chooses learning targets',()=>{assert.match(html,/input\.targetRaySpace/);assert.match(html,/getPose\(input\.targetRaySpace,refSpace\)/);assert.match(html,/bestDist/);assert.match(html,/Aim the controller ray/)});
