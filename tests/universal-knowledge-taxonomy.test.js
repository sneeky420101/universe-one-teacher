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

test('factual teaching requires traceable evidence and human review',()=>{
 const p=taxonomy.teachingPolicy;
 assert.equal(p.defaultMode,'verified-facts-only');
 assert.equal(p.firstGroup,'verified-factual-knowledge');
 for(const field of ['claim','primarySourceUrl','sourceOrganization','supportingExcerptOrLocator','evidenceAssessment','educatorReview'])assert.ok(p.requiredEvidence.includes(field),field);
 assert.match(p.noCitation,/Do not teach as established fact/);
 assert.match(p.fictionAndSpeculation,/never represented as fact/);
 assert.equal(p.reviewState,'policy-defined-not-yet-enforced-in-app');
});
