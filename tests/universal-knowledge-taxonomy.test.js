const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const taxonomy=JSON.parse(fs.readFileSync(path.join(__dirname,'../curriculum/universal-knowledge-taxonomy.json'),'utf8'));
test('universal knowledge taxonomy spans disciplines and distinguishes evidence',()=>{
 assert.equal(taxonomy.status,'research-taxonomy-not-ingested');
 assert.ok(taxonomy.domains.length>=9);
 const subjects=taxonomy.domains.flatMap(d=>d.subjects);
 for(const subject of ['mathematics','history','world-languages','indigenous-knowledge','astrobiology','search-for-extraterrestrial-life','science-fiction'])assert.ok(subjects.includes(subject),subject);
 for(const kind of ['empirical-fact','hypothesis','religious-belief','fiction','unverified-claim','unknown'])assert.ok(taxonomy.knowledgeTypes.includes(kind),kind);
 assert.equal(taxonomy.guardrails.neverPresentAlienContactAsEstablishedFact,true);
 assert.equal(taxonomy.guardrails.protectChildrenAndStudentPrivacy,true);
 assert.equal(taxonomy.guardrails.neverInventCitations,true);
});
