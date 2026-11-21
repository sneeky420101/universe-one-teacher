const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
test('Android preview uses secure local asset loader and disallows cleartext',()=>{
 const activity=read('android/app/src/main/java/com/voltframe/teacher/preview/MainActivity.java');
 const manifest=read('android/app/src/main/AndroidManifest.xml');
 assert.match(activity,/WebViewAssetLoader/);
 assert.match(activity,/appassets\.androidplatform\.net\/assets\/index\.html/);
 assert.match(activity,/setAllowFileAccess\(false\)/);
 assert.match(activity,/setMixedContentMode\(WebSettings\.MIXED_CONTENT_NEVER_ALLOW\)/);
 assert.match(manifest,/usesCleartextTraffic="false"/);
 assert.match(manifest,/android:exported="true"/);
});
test('Android preview CI includes all required offline assets and pinned toolchain',()=>{
 const y=read('.github/workflows/android-preview.yml');
 for(const name of ['index.html','quest.html','tutorial.html','privacy.html','global.html','pathways.html','campus.html','manifest.webmanifest','icon.svg','sw.js','curriculum/catalog.json'])assert.ok(y.includes(name),name);
 assert.match(y,/gradle-version: '8\.9'/);
 assert.match(y,/node-version: '22'/);
 assert.match(y,/assembleDebug/);
 assert.doesNotMatch(y,/bundleRelease|publishRelease/);
});

test('local Gradle builds bundle offline classroom without CI-only preparation',()=>{
 const gradle=read('android/app/build.gradle');
 assert.match(gradle,/stageClassroomAssets/);
 assert.match(gradle,/task\.dependsOn\('stageClassroomAssets'\)/);
 for(const name of ['index.html','quest.html','privacy.html','curriculum\/catalog.json'])assert.ok(gradle.includes(name),name);
});
