const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
test('progress engine is served and loaded by pathways',()=>{
 const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
 const page=fs.readFileSync(path.join(root,'pathways.html'),'utf8');
 assert.match(server,/\/learning\/progress-engine\.js/);
 assert.match(page,/<script src="\/learning\/progress-engine\.js"><\/script>/);
 assert.match(page,/UniverseProgress\.recordAttempt/);
 assert.match(page,/UniverseProgress\.lessonSummary/);
 assert.match(page,/UniverseProgress\.supportiveFeedback/);
});
test('reset clears local progress events',()=>{
 const page=fs.readFileSync(path.join(root,'pathways.html'),'utf8');
 assert.match(page,/progressState=\{version:1,events:\[\]\};saveEvents\(\)/);
});
