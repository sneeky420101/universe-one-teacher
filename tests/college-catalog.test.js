// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const catalog=JSON.parse(fs.readFileSync('college/catalog.json','utf8'));
test('college catalog does not claim accreditation or recognized credit',()=>{
 assert.equal(catalog.status,'planning-not-authorized-or-accredited');
 assert.equal(catalog.policy.noAccreditationClaims,true);
 assert.equal(catalog.policy.noOfficialDegreesOrCreditsUntilAuthorized,true);
 for(const c of catalog.courses){assert.equal(c.status,'draft');assert.equal(c.creditHours,null);assert.equal(c.instructorApproved,false)}
});
test('college course, module and assessment references resolve',()=>{
 const ids=new Set(catalog.courses.map(c=>c.id));
 assert.equal(ids.size,catalog.courses.length);
 const assessments=new Map(catalog.assessments.map(a=>[a.id,a]));
 assert.equal(assessments.size,catalog.assessments.length);
 for(const program of catalog.programs)for(const id of program.courses)assert.ok(ids.has(id));
 for(const course of catalog.courses){
  assert.ok(course.learningOutcomes.length>0);
  for(const id of course.assessmentIds){assert.ok(assessments.has(id));assert.equal(assessments.get(id).courseId,course.id)}
  for(const module of course.modules)for(const id of module.assessmentIds)assert.ok(course.assessmentIds.includes(id));
 }
});
test('sample assessments cannot create official grades',()=>{
 for(const a of catalog.assessments)assert.equal(a.countsTowardOfficialGrade,false);
 assert.equal(catalog.policy.studentRecordsRequireSecureAuthenticatedBackend,true);
});
