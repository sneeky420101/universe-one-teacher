const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
test('PWA manifest is valid and project-path safe',()=>{const m=JSON.parse(read('manifest.webmanifest'));assert.ok(m.name);assert.equal(m.display,'standalone');assert.equal(m.start_url,'./');assert.equal(m.scope,'./');for(const i of m.icons){assert.ok(fs.existsSync(path.join(root,i.src)))}});
test('home page includes working PWA and Quest references',()=>{const h=read('index.html');assert.match(h,/manifest\.webmanifest/);assert.match(h,/serviceWorker\.register/);assert.match(h,/quest\.html/);for(const f of ['quest.html','global.html','pathways.html','campus.html','sw.js','icon.svg'])assert.ok(fs.existsSync(path.join(root,f)),f)});
test('WebXR lab exposes supported mode and safe fallback',()=>{const h=read('quest.html');for(const token of ['immersive-vr','isSessionSupported','requestSession','requestReferenceSpace','requestAnimationFrame','desktopPreview','session.addEventListener'])assert.ok(h.includes(token),token);assert.match(h,/teacher supervision/i);assert.match(h,/gl\.scissor\(viewport\.x,viewport\.y,viewport\.width,viewport\.height\)/)});
test('server routes static PWA assets with safe MIME types',()=>{const s=read('server.js');for(const token of ['manifest.webmanifest','icon.svg','sw.js','worker-src'])assert.ok(s.includes(token),token)});

test('offline shell includes Quest lab and isolates cache to app scope',()=>{const sw=read('sw.js');assert.match(sw,/\.\/quest\.html/);assert.match(sw,/self\.registration\.scope/);assert.match(sw,/request\.method!==['"]GET['"]/);assert.match(sw,/request\.mode===['"]navigate['"]/);assert.match(sw,/voltframe-teacher-preview-v2/)});
test('GitHub Pages pipeline runs checks before deployment',()=>{const y=read('.github/workflows/pages.yml');assert.match(y,/npm test/);assert.match(y,/needs: verify/);assert.match(y,/actions\/deploy-pages@v4/)});
