# Universe One AI Teacher

An early educational browser application with eight source-linked lessons and practice quizzes.

## Current features
- Select Pre-K, Kindergarten, grades 1–12, college, or adult/GED.
- Filter sample lessons by mathematics and science.
- Read original educational sources and complete quizzes.
- Ask questions against a limited set of existing lessons (keyword matching, **not** a generative AI tutor).
- Store quiz completion locally in the current browser.
- View a 2D Meta Quest classroom **concept preview**.

## Limitations
The grade selector currently changes the classroom label only. The eight lessons are **not** differentiated, mapped to grade standards, or sufficient for all-grade curricula. The classroom preview is not an immersive WebXR scene and does not connect to Meta Quest devices, controllers, or other students. No school accounts or teacher management features exist.

## Engineering backlog
1. Create structured curriculum schema with grade, subject, standards, citations, licensing, reading level and human-review status.
2. Populate grade-specific learning paths across language arts, math, science, social studies, arts, computing, health and career education, with dedicated college and GED tracks.
3. Build accessible teacher lesson planning, class assignments, progress reports, assessments and parent controls.
4. Add evidence-grounded AI tutoring with age-appropriate guardrails, clear citations, moderation and educator oversight.
5. Build actual WebXR Quest support with controller/hand interactions, seated mode, accessibility, spatial comfort, moderation and fallback.
6. Introduce age-aware authentication, consent, FERPA/COPPA review, data minimization, encryption, retention and deletion.
7. Test with automated browser checks, accessibility tooling, and physical Meta Quest devices.

## Run locally
Open `index.html` in a modern browser. No build step is required.

## Release
Pre-launch hold: do not publicly publish, submit to an app store, or enable paid accounts without explicit owner authorization and production readiness checks.
