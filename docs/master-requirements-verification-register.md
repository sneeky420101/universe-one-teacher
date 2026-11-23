# Universe One AI Teacher — Master Requirements and Verification Register
Last consolidated: 2026-11-23. Owner pre-launch hold: NO public publishing, production deployment or store submission without explicit owner approval.

## Status rules
REQUESTED = owner requirement recorded; DESIGNED = technical plan exists; CODED = source implementation exists; TESTED = automated tests executed and passing; INTEGRATED = working end-to-end in app; DEVICE VERIFIED = tested on real target hardware; RELEASED = explicit owner-approved production launch.
Never promote a status without evidence. Existing prototypes are not production features. This register is a living, non-exhaustive reconstruction; historical conversations and repo artifacts should be reconciled before claiming every requirement is captured.

| ID | Requirement | Evidence/current status | Next acceptance gate |
|---|---|---|---|
| EDU-01 | Complete real virtual school, all classrooms, gym, library, outdoor learning | REQUESTED; partial prototype pages CODED | Curriculum-backed functioning campus flows |
| EDU-02 | Real college/university courses, exams, grades, transcripts | REQUESTED; draft college catalog | Educator review, grading integrity, legal/accreditation review |
| EDU-03 | Math, science, language, arts, trades, practical life, every viable discipline | REQUESTED; limited demos | Validated course catalog with domain-specific assessment |
| EDU-04 | Worldwide official curricula, domestic/international, South America, multilingual | REQUESTED; exploratory links | Source/license verification and translated content review |
| EDU-05 | Verified factual answers, citations, educator approvals | Partial evidence gate CODED | Audited records, evidence tests and teacher review |
| EDU-06 | Adaptive AI tutor with constructive feedback and mastery | REQUESTED; keyword prototype | Safe model integration and measurable learning outcomes |
| EDU-07 | Voice-prompt lessons, captions, quiet-room option | REQUESTED | Consent-based voice controls, captions and fallback |
| EDU-08 | Student accounts, privacy-preserving progress, assignments, achievements | REQUESTED; local quiz progress CODED | Auth, permissions, data retention and FERPA/COPPA review as applicable |
| EDU-09 | Educator dashboard, reporting, school integration | REQUESTED | Roles, exports, SIS/LMS interoperability and acceptance testing |
| EDU-10 | Tutorials, accessibility, functional buttons and links throughout | REQUESTED; partial guides | Automated accessibility and browser click-path QA |
| GAME-01 | First-person interactive 3D metaverse campus | REQUESTED; experimental WebGL/WebXR CODED | Real movement, interaction, performance and accessibility |
| GAME-02 | Hands-on all-trades realistic workshops and labs | REQUESTED; four template domains CODED | Detailed 3D assets, tools, physics and assessments |
| GAME-03 | Individual nuts, bolts, parts, tear-down and rebuild | REQUESTED; basic fastener/cover CODED | Component hierarchy, collision, tool animation, tests |
| GAME-04 | Automotive and realistic vehicles/equipment | REQUESTED; generic model CODED | Manufacturer-sourced specs and safe training models |
| GAME-05 | VR and non-VR functional parity (Android, Windows, web, tablets, Quest) | REQUESTED; early fallback CODED | Real-device parity matrix and acceptance tests |
| GAME-06 | On-demand scenario creation from student request | Four-domain deterministic template API CODED | Browser/server end-to-end tests and expanded safe DSL |
| GAME-07 | AI code generation and new simulation assets in sandbox | DESIGNED only | Restricted execution, static scans, tests, human review |
| GAME-08 | Real-time correction, encouragement, safe mistakes | REQUESTED; basic prerequisite feedback CODED | Tutor explanation and scenario-specific feedback |
| GAME-09 | High-quality graphics, animations, lighting, audio | REQUESTED; primitive 3D CODED | Optimized production art pipeline and performance tests |
| PLATFORM-01 | Unified VOLTFRAME ecosystem with Grand Library, Universe Storage, Cloud Studio | REQUESTED | Auth/API contracts, permissions and approved integration |
| PLATFORM-02 | Unlimited expansion of learning catalog, reviewed updates | DESIGNED | Versioned content pipeline with approval gates |
| PLATFORM-03 | Monetization without manipulative learning incentives | REQUESTED | Product/legal review and billing architecture |
| PLATFORM-04 | Security, private ownership, safeguards, backups | REQUESTED; partial audits CODED | Threat model, secret scan, backup/restore drills |
| PLATFORM-05 | Full regression, performance, device and store readiness | REQUESTED; CI workflow CODED | Confirmed green CI, hardware QA, release audit |
| PLATFORM-06 | Owner-only release authorization | REQUIRED HOLD | Never deploy publicly without explicit approval |

## Engineering order
1. Establish a reproducible, passing automated test baseline and identify regressions.
2. Replace duplicate browser step logic with the validated workshop state machine.
3. Build one high-quality, fully assessed, interactive 3D workshop vertical slice.
4. Establish curriculum provenance and age-appropriate AI tutor guardrails.
5. Expand domain assets, courses, and internationalization incrementally.
6. Integrate VR/non-VR parity, account roles, educator reporting and ecosystem APIs.
7. Conduct security, privacy, accessibility, device and release-gate verification.

## Open risks
- No verified full-device test results or production AI integration.
- The current four-domain generator selects predefined educational templates; it does not generate novel executable code or detailed equipment geometry.
- Physical safety-critical procedures require manufacturer specifications, vetted sources, and expert review.
- A public GitHub repository does not by itself mean a public app deployment is authorized.
