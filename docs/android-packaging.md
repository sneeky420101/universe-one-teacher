# Android packaging — pre-release implementation checklist

**Owner hold:** Do not publish, merge to release, upload to Play Console, enable payments, or change live routing without explicit owner approval.

## Packaging choice
Use a Trusted Web Activity (TWA) only after the production HTTPS origin is chosen and verified. A TWA displays the verified web app in an Android browser context; it does **not** convert the browser prototype into native VR, offline AI, or a complete accredited school. If the application must function fully without network access, first ensure all required resources are locally available and that the app meets Play policies.

## Required inputs (not yet verified)
- Production HTTPS URL and control of its domain; GitHub Pages domain ownership and Digital Asset Links verification must be validated for the actual package.
- Final Android application ID (unique reverse-DNS identifier) and verified developer contact.
- 192×192 and 512×512 PNG icons plus a separate adaptive/maskable icon, properly licensed.
- Verified privacy policy URL and accurate data safety/child-directed disclosures.
- Play Console developer account and applicable testing eligibility.
- Secure release signing key stored outside the repository; never commit keystores, passwords, or access tokens.

## Reproducible build procedure (once inputs exist)
1. Run `npm test`, `npm run security:audit`, and `npm run android:preflight`.
2. Set up JDK 17 and Android SDK on a trusted build runner; pin the Android build tooling versions.
3. Initialize TWA packaging against the verified HTTPS manifest with Bubblewrap (or another reviewed Android wrapper); inspect generated AndroidManifest permissions, target SDK, app links and package ID.
4. Publish the package's SHA-256 signing certificate fingerprint in `https://<verified-origin>/.well-known/assetlinks.json`, matching the Android package ID, then verify Android App Links on a physical device.
5. Build a **debug-only** APK first; install on a real Android phone/tablet and run the matrix below. A debug APK is not a Play Store deliverable.
6. After test sign-off, generate a signed release **AAB**, verify its signature and package ID, and record its SHA-256 digest and reproducible build evidence.
7. Complete Play Console policy declarations, screenshots, accessibility review, and closed testing where required.
8. Request explicit owner approval before any release upload or public rollout.

## Physical test matrix
| Platform | Required checks |
| --- | --- |
| Android phone (small screen) | launch, back navigation, portrait/landscape, touch quizzes, progress persistence, reset |
| Android tablet | responsive layout, rotation, keyboard, multi-window |
| Low-memory Android | startup, workshop graphics, long sessions, resume after process death |
| Android offline/update | first online load, airplane mode, cached pages, missing pages show error, updated service worker |
| Desktop browsers | keyboard navigation, visible focus, mouse interaction, verified knowledge error state |
| Meta Quest | browser fallback, actual immersive WebXR entry/exit, controllers, comfort and frame rate |

Record OS/browser versions, device models, screenshots, crashes, test results, and reviewer for each run. **No physical-device pass has been recorded here.**

## Blockers
The repository currently contains an SVG icon only, no verified PNG Play icons, no finalized Android application ID or trusted HTTPS origin, and no signed AAB. The automated preflight intentionally fails until evidence exists. Passing source tests is not evidence of Play certification.
