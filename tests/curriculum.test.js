// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const catalog=JSON.parse(fs.readFileSync('curriculum/catalog.json','utf8'));
test('catalog schema and ownership',()=>{assert.equal(catalog.schemaVersion,'1.0.0');assert.match(catalog.owner,/VOLTFRAME Studios/);assert.equal(catalog.policy.requireEducatorReviewBeforePublishing,true)});
test('draft records cannot falsely claim official alignment',()=>{for(const r of catalog.records){assert.equal(r.publicationStatus,'draft');assert.equal(r.verifiedAgainstOfficialCurriculum,false);assert.equal(r.educatorReviewed,false);assert.equal(r.standardCode,null);assert.equal(r.standardText,null);assert.match(r.sourceUrl,/^https:\/\//);assert.ok(r.sampleObjective);assert.ok(r.license)}});
test('unique curriculum record IDs',()=>assert.equal(new Set(catalog.records.map(r=>r.id)).size,catalog.records.length));
