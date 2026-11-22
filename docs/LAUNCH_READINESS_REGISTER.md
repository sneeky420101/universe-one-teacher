# Universe One Teacher — launch-readiness engineering register
Status: DRAFT / NOT PUBLIC RELEASE APPROVED. Owner authorization required before publishing.

## Acceptance gates (all must be demonstrated, not assumed)
- [ ] Trace original owner requirements and revisions to source conversations; unresolved historical coverage is explicitly unknown.
- [ ] Curriculum map: preschool, K-12, college, trades, life skills, languages, accessibility, international localization, factual sourcing.
- [ ] Each interactive lesson: prerequisites, objectives, detailed steps, realistic 3D/2D interaction, corrective and encouraging feedback, retry, mastery, evidence, teacher review.
- [ ] Authentic classroom workflows: accounts, roles, assignments, exams, grading, records, safeguarding, school admin; accreditation claims prohibited without formal approval.
- [ ] VR and non-VR functional parity, device compatibility, keyboard/controller/touch accessibility, performance and offline fallback.
- [ ] Persist progress reliably, idempotent events, conflict resolution, cross-device sync, consent and data deletion; secure student data.
- [ ] Verified sources, content review, age-appropriate safety, licensing and multilingual QA.
- [ ] CI tests: unit, integration, E2E, accessibility, security, performance, and device smoke tests with evidence.
- [ ] Deployment rehearsal, rollback, privacy policy, terms, ownership and release checklist.
- [ ] Owner approval to remove pre-launch hold.

## Engineering priority
1. Inventory actual repo implementation and tests, identify placeholders and non-working UI.
2. Integrate progress engine behind authenticated APIs; verify offline-to-cloud sync.
3. Implement one complete workshop vertical slice, prove feedback and assessment loops.
4. Expand curriculum only after reusable platform passes acceptance gates.

Status vocabulary: REQUESTED / DESIGNED / CODED / TESTED / INTEGRATED / DEPLOYED. No status upgrade without evidence.
Dependencies: Universe Storage requires separate verification; no assumption of existing working integration.
