#!/usr/bin/env node
// VOLTFRAME Studios — curriculum publication gate. No network or student data.
const fs = require('node:fs');
const path = require('node:path');
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'curriculum', 'catalog.json'), 'utf8'));
const failures = [];
const ids = new Set();
const url = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
for (const [i, item] of (catalog.records || []).entries()) {
  const at = `records[${i}]`;
  for (const field of ['id', 'country', 'jurisdiction', 'stage', 'subject', 'topic', 'language', 'license', 'publicationStatus']) {
    if (typeof item[field] !== 'string' || !item[field].trim()) failures.push(`${at} missing ${field}`);
  }
  if (ids.has(item.id)) failures.push(`${at} duplicate id`);
  ids.add(item.id);
  if (!['draft', 'review', 'approved'].includes(item.publicationStatus)) failures.push(`${at} invalid publicationStatus`);
  if (item.publicationStatus === 'approved') {
    if (!item.educatorReviewed || !item.verifiedAgainstOfficialCurriculum) failures.push(`${at} approved without educator and standards verification`);
    if (!item.standardCode || !item.standardText || !url(item.sourceUrl)) failures.push(`${at} approved without standard code/text and HTTPS source`);
    if (!item.license || item.license === 'unknown') failures.push(`${at} approved without license metadata`);
    if (item.jurisdiction === 'illustrative-only' || item.country === 'GLOBAL') failures.push(`${at} illustrative/global example cannot claim jurisdictional approval`);
  }
  if (item.verifiedAgainstOfficialCurriculum && (!item.standardCode || !item.standardText || !url(item.sourceUrl))) failures.push(`${at} verified claim lacks primary-source metadata`);
}
if (!Array.isArray(catalog.records) || !catalog.records.length) failures.push('catalog has no records');
if (catalog.policy?.doNotStoreStudentPII !== true || catalog.policy?.requireEducatorReviewBeforePublishing !== true) failures.push('required safeguards disabled');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Curriculum gate passed: ${ids.size} records; approved records satisfy minimum metadata checks.`);
