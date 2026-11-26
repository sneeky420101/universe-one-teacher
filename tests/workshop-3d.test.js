const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const server=fs.readFileSync('server.js','utf8'),workshop=fs.readFileSync('workshop-3d.html','utf8'),trades=fs.readFileSync('trades-campus.html','utf8');
test('interactive workshop route and navigation exist',()=>{assert.match(server,/\/workshop-3d\.html/);assert.match(trades,/workshop-3d\.html/)});
test('three modeled workshop environments are selectable',()=>{for(const key of ['auto','medical','construction'])assert.match(workshop,new RegExp('value="'+key+'"'))});
test('workshop supports pointer manipulation and inspection feedback',()=>{assert.match(workshop,/pointerdown/);assert.match(workshop,/pointermove/);assert.match(workshop,/pointerup/);assert.match(workshop,/visited\.add\(selected\)/);assert.match(workshop,/role="status"/)});
test('medical simulation avoids claims of surgical credentialing',()=>{assert.match(workshop,/not validated surgical simulators/);assert.match(workshop,/anatomy and safety only/)});
test('trades catalog is served as JSON',()=>assert.match(server,/file==='curriculum\/trades-worlds\.json'/));

test('automotive and excavator manipulation controls are wired',()=>{for(const term of ['hoodOpen','wheelRemoved','boomAngle','bucketAngle','id="action"','addEventListener(\'click\''])assert.ok(workshop.includes(term),term)});

test('guided mission offers keyboard-accessible object selection and progression',()=>{assert.match(workshop,/id="nextTarget"/);assert.match(workshop,/function selectPart\(part\)/);assert.match(workshop,/Next objective: inspect/);assert.match(workshop,/All components inspected\. Complete the knowledge checks to finish the mission\./);assert.match(workshop,/Practice mission complete:/)});

test('3D trade missions include scored, single-attempt scenario assessments',()=>{for(const marker of ['id="challenge"','id="score"','const assessments=','function renderChallenge(part)','if(answered)return','correctCount=correctParts.size','practice only; not a professional qualification'])assert.ok(workshop.includes(marker),marker)});

test('practice mission tracks attempted and correct answers without awarding credentials',()=>{for(const marker of ['attempted=new Set()','correctParts=new Set()','attempted.add(part.i)','correctParts.add(part.i)','id="missionResult"','Practice mission passed:','Reset to retry missed concepts.'])assert.ok(workshop.includes(marker),marker)});

test('revisiting a question cannot inflate the score',()=>{assert.match(workshop,/answered=attempted\.has\(part\.i\)/);assert.match(workshop,/b\.disabled=attempted\.has\(part\.i\)/);assert.match(workshop,/correctCount=correctParts\.size/);assert.match(workshop,/Already answered this attempt/)});

test('POV inspection and focus controls are available to non-VR students',()=>{for(const marker of ['id="pov"','aria-pressed="false"','id="focus"','pov?1.65:1','POV inspection enabled','POV focused on'])assert.ok(workshop.includes(marker),marker)});
