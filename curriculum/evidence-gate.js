'use strict';
// Factual-knowledge admission gate: never equate a link with verified evidence.
const REQUIRED=['id','claim','primarySourceUrl','sourceOrganization','sourceTitle','sourcePublicationDateOrVersion','retrievalDate','supportingExcerptOrLocator','evidenceAssessment','licenseOrUsePermission','educatorReview'];
function evaluate(record){
 const reasons=[];
 if(!record||typeof record!=='object'||Array.isArray(record))return {approved:false,reasons:['invalid-record']};
 for(const key of REQUIRED){const v=record[key];if(v===undefined||v===null||typeof v==='string'&&!v.trim())reasons.push('missing-'+key)}
 if(typeof record.claim!=='string'||!record.claim.trim())reasons.push('invalid-claim');
 try{const url=new URL(record.primarySourceUrl);if(url.protocol!=='https:'||!url.hostname.includes('.'))reasons.push('invalid-primary-source-url')}catch{reasons.push('invalid-primary-source-url')}
 const validDate=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;
 if(!validDate(record.retrievalDate))reasons.push('invalid-retrieval-date');
 if(record.evidenceAssessment!=='supported')reasons.push('evidence-not-supported');
 if(record.licenseOrUsePermission!=='approved')reasons.push('reuse-not-approved');
 if(record.educatorReview?.approved!==true||typeof record.educatorReview?.reviewerId!=='string'||!record.educatorReview.reviewerId.trim()||!validDate(record.educatorReview?.reviewedAt))reasons.push('educator-review-required');
 if(record.sourceVerified!==true)reasons.push('source-not-independently-verified');
 if(record.evidenceAssessment==='supported'&&(!Array.isArray(record.supportingSources)||record.supportingSources.length<1))reasons.push('corroborating-source-required');
 if(Array.isArray(record.supportingSources)&&record.supportingSources.some(s=>typeof s!=='string'||!/^https:\/\/[^\s/]+\.[^\s/]+/.test(s)))reasons.push('invalid-corroborating-source');
 if(record.publicationStatus!=='approved')reasons.push('publication-not-approved');
 if(record.knowledgeType!=='empirical-fact'&&record.knowledgeType!=='scientific-theory')reasons.push('not-factual-knowledge');
 return {approved:reasons.length===0,reasons};
}
function approvedRecords(records){return (Array.isArray(records)?records:[]).filter(r=>evaluate(r).approved)}
module.exports={evaluate,approvedRecords};
