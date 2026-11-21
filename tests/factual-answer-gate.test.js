const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const catalog=JSON.parse(fs.readFileSync('curriculum/catalog.json','utf8'));
test('unreviewed samples cannot be returned as verified answers',()=>{
 assert.match(html,/Evidence gate active:/);
 assert.match(html,/Verified knowledge is unavailable/);
 assert.match(html,/fetch\('\.\/api\/verified-knowledge'/);
 assert.doesNotMatch(html,/out\.textContent=l\[2\]/);
 for(const r of catalog.records)assert.notEqual(r.publicationStatus,'verified');
});
