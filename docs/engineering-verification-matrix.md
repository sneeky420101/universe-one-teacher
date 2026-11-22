# Universe One AI Teacher — Engineering Verification Matrix

Owner: VOLTFRAME Studios. Status: INTERNAL QA ONLY. Public launch, payment activation, and merging to production require explicit owner approval.

| Workstream | Current verified state | Next engineering acceptance criteria |
| --- | --- | --- |
| Classroom navigation | Automated source and local HTTP tests pass in QA | Browser automation verifies all clickable controls, keyboard focus, mobile layouts, and screenshots |
| Progress and assessments | Corrupt local progress handling and quiz score regression tests added | Persist and reset across browser restart, offline/online transition, and mobile process death |
| Engineering workshop | Circuit validator and session tests pass | Hands-on input, correction feedback, keyboard and touch usability verified in a real browser |
| Android packaging | Web payload staging and SHA-256 manifest pass CI | Verified Android wrapper, debug APK, install and launch on real Android hardware |
| Android release | Preflight blocks missing production requirements | Verified signing identity, package ID, icons, HTTPS origin, Play declarations, signed AAB |
| Quest / VR | Source-level WebXR and fallback tests pass | Real headset test: session entry, exit, controllers, comfort, performance |
| AI teacher and voice | Verified-knowledge evidence gate exists; voice prompting not verified | Working audio prompts, permission and privacy controls, quiet-room guidance, accessibility alternatives |
| Curriculum and languages | Introductory lessons and catalog previews exist | Subject-by-subject factual review, source traceability, translations and native-speaker QA |
| School/college status | Noncredit preview only | Institution agreements, academic oversight, accreditation/credit claims independently reviewed |
| Privacy and security | Automated security checks pass | Independent privacy/child-safety review, secrets scan, penetration test, documented incident response |
| Public deployment | Owner pre-launch hold | Written owner approval after all required gates pass |

## Verification rules
- **Requested** means user-directed scope, not functionality.
- **Designed** means specification or architecture exists.
- **Coded** means implementation committed.
- **Tested** means an automated or manual test actually ran.
- **Integrated** means tested with the intended live components and devices.
- **Deployed** means available to intended users after approval.
- CI passing does not imply physical hardware testing, legal certification, production readiness, or educational accreditation.
- Preserve every outstanding requirement in the backlog until objective evidence closes it.

## Current evidence
- GitHub Actions commit `7660f4b0bada94e2b75c7486a90c81e6b6cb5063`: five workflows completed successfully (QA, private quality, gameplay/security, classroom, Android/Quest checks).
- The Android QA workflow stages and archives an **unsigned web payload**, not an APK or AAB.
- Release gate remains fail-closed; never treat an expected failed preflight as release approval.

## Immediate parallel priorities
1. Produce Android wrapper/debug APK under private QA, without production signing.
2. Add automated browser-level button, accessibility and responsive layout tests.
3. Build a functional, accessible voice-prompt prototype with opt-in controls and quiet-room guidance.
4. Add practical workshop acceptance tests using real browser input.
5. Audit source evidence, translations and noncredit course disclaimers.
