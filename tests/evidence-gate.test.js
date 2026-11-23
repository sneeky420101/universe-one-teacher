const test=require('node:test');
const assert=require('node:assert/strict');
const {evaluate,approvedRecords}=require('../curriculum/evidence-gate');
const candidate={id:'demo',claim:'Earth orbits the Sun',primarySourceUrl:'https://science.nasa.gov/',supportingSources:['https://solarsystem.nasa.gov/'],sourceOrganization:'NASA',sourceTitle:'Solar system',sourcePublicationDateOrVersion:'2026',retrievalDate:'2026-11-21',supportingExcerptOrLocator:'section 1',evidenceAssessment:'supported',licenseOrUsePermission:'approved',educatorReview:{approved:true,reviewerId:'reviewer-1',reviewedAt:'2026-11-21'},sourceVerified:true,publicationStatus:'approved',knowledgeType:'empirical-fact'};
test('complete review metadata can pass structural gate, not independently prove truth',()=>assert.equal(evaluate(candidate).approved,true));
test('unreviewed, unsourced, speculative and unlicensed records fail closed',()=>{
 for(const patch of [{sourceVerified:false},{educatorReview:{approved:false}},{primarySourceUrl:'http://example.com'},{knowledgeType:'speculation'},{licenseOrUsePermission:'unknown'},{evidenceAssessment:'disputed'},{publicationStatus:'draft'},{retrievalDate:'yesterday'},{retrievalDate:'2026-02-30'},{supportingSources:[]},{supportingSources:['http://invalid.example']},{educatorReview:{approved:true,reviewerId:'reviewer-1',reviewedAt:'2026-02-30'}}])assert.equal(evaluate({...candidate,...patch}).approved,false,JSON.stringify(patch));
 assert.deepEqual(approvedRecords([{...candidate,publicationStatus:'draft'}]),[]);
 assert.equal(evaluate(null).approved,false);
});
