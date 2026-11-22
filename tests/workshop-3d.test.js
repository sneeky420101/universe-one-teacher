const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const server=fs.readFileSync('server.js','utf8'),workshop=fs.readFileSync('workshop-3d.html','utf8'),trades=fs.readFileSync('trades-campus.html','utf8');
test('interactive workshop route and navigation exist',()=>{assert.match(server,/\/workshop-3d\.html/);assert.match(trades,/workshop-3d\.html/)});
test('three modeled workshop environments are selectable',()=>{for(const key of ['auto','medical','construction'])assert.match(workshop,new RegExp('value="'+key+'"'))});
test('workshop supports pointer manipulation and inspection feedback',()=>{assert.match(workshop,/pointerdown/);assert.match(workshop,/pointermove/);assert.match(workshop,/pointerup/);assert.match(workshop,/visited\.add\(selected\)/);assert.match(workshop,/role="status"/)});
test('medical simulation avoids claims of surgical credentialing',()=>{assert.match(workshop,/not validated surgical simulators/);assert.match(workshop,/anatomy and safety only/)});
test('trades catalog is served as JSON',()=>assert.match(server,/file==='curriculum\/trades-worlds\.json'/));

test('automotive and excavator manipulation controls are wired',()=>{for(const term of ['hoodOpen','wheelRemoved','boomAngle','bucketAngle','id="action"','addEventListener(\'click\''])assert.ok(workshop.includes(term),term)});

test('guided mission offers keyboard-accessible object selection and progression',()=>{assert.match(workshop,/id="nextTarget"/);assert.match(workshop,/function selectPart\(part\)/);assert.match(workshop,/Next objective: inspect/);assert.match(workshop,/Mission complete:/)});
