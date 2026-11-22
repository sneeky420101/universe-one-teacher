// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('learning-quest.html','utf8');
const server=fs.readFileSync('server.js','utf8');
test('learning quest is exposed by the application router',()=>{assert.match(server,/['"]\/learning-quest\.html['"]\s*:\s*['"]learning-quest\.html['"]/);});
test('learning quest has accessible status and challenge controls',()=>{for(const id of ['rooms','question','options','feedback','next','stars','mastery'])assert.match(html,new RegExp('id="'+id+'"'));assert.match(html,/aria-live="polite"/);});
test('learning quest does not rerender question after answer selection',()=>{const answer=html.slice(html.indexOf('function answer('),html.indexOf("\n$('next').onclick"));assert.ok(answer.includes('if(answered)return'));assert.ok(!answer.includes('render();'));});
test('learning quest stores no student identity fields',()=>{assert.doesNotMatch(html,/localStorage\.setItem\([^,]+,\s*JSON\.stringify\(\{\s*(name|email|birthdate)/i);});

test('learning quest fetches provenance catalog and labels unreviewed lessons',()=>{
 assert.match(html,/fetch\('\.\/curriculum\/catalog\.json'/);
 assert.match(html,/educatorReviewed===true/);
 assert.match(html,/verifiedAgainstOfficialCurriculum===true/);
 assert.match(html,/Curriculum catalog is unavailable/);
});
