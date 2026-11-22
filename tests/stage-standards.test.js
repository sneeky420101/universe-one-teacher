const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const os=require("node:os");
const path=require("node:path");
const {stageStandards}=require("../scripts/stage-standards.cjs");
const sample={id:"demo",jurisdiction:"Example",authority:"Example",subject:"Math",grade:"5",standardCode:"5.A",description:"Demonstration",version:"2026",sourceUrl:"https://example.org/std",license:"pending",reviewer:"pending",reviewedAt:"2026-11-22",approved:false};
test("stage valid draft without granting approval",t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"standards-"));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const input=path.join(dir,"input.json");fs.writeFileSync(input,JSON.stringify([sample]));
 const result=stageStandards(input,path.join(dir,"out"));
 assert.equal(result.ok,true);assert.equal(result.approved,0);
 assert.equal(JSON.parse(fs.readFileSync(result.output)).records[0].approved,false);
 assert.throws(()=>stageStandards(input,path.join(dir,"out")),/EEXIST/);
});
test("reject invalid batch without writing output",t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"standards-"));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const input=path.join(dir,"input.json");fs.writeFileSync(input,JSON.stringify([{...sample,sourceUrl:"http://bad"}]));
 const output=path.join(dir,"out");assert.equal(stageStandards(input,output).ok,false);
 assert.equal(fs.existsSync(path.join(output,"standards-staged.json")),false);
});
