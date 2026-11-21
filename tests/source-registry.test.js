const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const registry=JSON.parse(fs.readFileSync(path.join(__dirname,'../curriculum/source-registry.json'),'utf8'));
test('source discovery registry requires provenance and no unreviewed publication',()=>{
 assert.equal(registry.policy.publicationStatus,'research-only');
 assert.equal(registry.policy.neverCopySourceTextWithoutPermission,true);
 assert.ok(registry.sources.length>=10);
 const ids=new Set();
 for(const source of registry.sources){
  assert.ok(source.id && !ids.has(source.id));ids.add(source.id);
  assert.match(source.url,/^https:\/\//);
  assert.ok(source.organization && source.region && source.subjects.length);
  assert.equal(source.contentImported,false);
  assert.equal(source.educatorReviewed,false);
  assert.equal(source.licenseVerified,false);
 }
});
