"use strict";
/**
 * Gate for proposed international curriculum standards imports.
 * No student data or external fetching. A passing record is eligible for
 * educator review, not automatically approved for classroom use.
 */
const REQUIRED = ["id","jurisdiction","authority","subject","grade","standardCode","description","version","sourceUrl","license","reviewer","reviewedAt"];
function validateStandard(record) {
  const errors = [];
  if (!record || typeof record !== "object" || Array.isArray(record)) return ["Record must be an object"];
  for (const key of REQUIRED) {
    if (typeof record[key] !== "string" || !record[key].trim()) errors.push(`Missing or invalid ${key}`);
  }
  if (record.sourceUrl) {
    try {
      const url = new URL(record.sourceUrl);
      if (url.protocol !== "https:" || !url.hostname.includes(".")) errors.push("sourceUrl must be a public HTTPS URL");
      if (url.username || url.password) errors.push("sourceUrl must not contain credentials");
    } catch { errors.push("sourceUrl must be a valid URL"); }
  }
  if (record.reviewedAt && !/^\d{4}-\d{2}-\d{2}$/.test(record.reviewedAt)) errors.push("reviewedAt must be YYYY-MM-DD");
  if (record.reviewedAt && /^\d{4}-\d{2}-\d{2}$/.test(record.reviewedAt)) {
    const date = new Date(record.reviewedAt + "T00:00:00Z");
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== record.reviewedAt) errors.push("reviewedAt must be a real date");
  }
  if (record.approved === true && record.licensePermission !== "verified") errors.push("Approval requires verified reuse permission");
  if (record.approved === true && record.educatorReview !== "approved") errors.push("Approval requires educator review");
  return errors;
}
function validateImport(records) {
  if (!Array.isArray(records)) return {ok:false, errors:["Import must be an array"]};
  const errors = [];
  const ids = new Set();
  records.forEach((record, index) => {
    validateStandard(record).forEach(error => errors.push(`[${index}] ${error}`));
    if (record && typeof record.id === "string") {
      if (ids.has(record.id)) errors.push(`[${index}] Duplicate id`);
      ids.add(record.id);
    }
  });
  return {ok:errors.length===0, errors};
}
module.exports = {validateStandard, validateImport};
