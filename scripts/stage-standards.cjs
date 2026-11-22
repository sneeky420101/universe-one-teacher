"use strict";
const fs = require("node:fs");
const path = require("node:path");
const {validateImport} = require("../curriculum/standards-validator.cjs");
/** Offline, non-destructive staging. Does not publish curriculum or collect student data. */
function stageStandards(input, outputDir) {
  const records = JSON.parse(fs.readFileSync(input, "utf8"));
  const validation = validateImport(records);
  if (!validation.ok) return {ok:false, errors:validation.errors, staged:0};
  const safe = records.map(r => ({...r, approved: r.approved === true && r.licensePermission === "verified" && r.educatorReview === "approved"}));
  fs.mkdirSync(outputDir, {recursive:true});
  const output = path.join(outputDir, "standards-staged.json");
  fs.writeFileSync(output, JSON.stringify({schemaVersion:1, status:"staging-only", records:safe},null,2)+"\n", {flag:"wx"});
  return {ok:true, staged:safe.length, approved:safe.filter(r=>r.approved).length, output};
}
if (require.main === module) {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) { console.error("Usage: node scripts/stage-standards.cjs INPUT.json OUTPUT_DIR"); process.exitCode=2; }
  else {
    try { const result=stageStandards(input,output); console.log(JSON.stringify(result,null,2)); if (!result.ok) process.exitCode=1; }
    catch (e) {console.error(e.message);process.exitCode=1;}
  }
}
module.exports={stageStandards};
