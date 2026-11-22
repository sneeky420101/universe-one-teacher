// VOLTFRAME Studios — fail on broken local classroom navigation before packaging.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const pages=['index.html','play.html','hands-on-lab.html','quest.html','metaverse.html','3d-campus.html','trades-campus.html','workshop-3d.html','learning-quest.html','college.html','engineering-lab.html','tutorial.html','privacy.html','global.html','pathways.html','campus.html'];
test('all declared classroom pages and relative HTML links exist',()=>{
  for(const page of pages){
    const full=path.join(root,page);
    assert.ok(fs.existsSync(full),'missing page '+page);
    const html=fs.readFileSync(full,'utf8');
    for(const match of html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)){
      const href=match[1].trim();
      if(!href||href.startsWith('#')||/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(href))continue;
      const pathname=href.split(/[?#]/)[0];
      if(!pathname)continue;
      const destination=path.resolve(path.dirname(full),decodeURIComponent(pathname));
      assert.ok(destination.startsWith(root+path.sep),'link escapes repository in '+page+': '+href);
      assert.ok(fs.existsSync(destination),'broken link in '+page+': '+href);
    }
  }
});
