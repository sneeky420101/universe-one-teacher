# Universe One AI Teacher — Simple Tutorials
These instructions cover features present in the repository. Features described as experimental are not certified for school use.

## Start here: first lesson (about 2 minutes)
1. Open `index.html` in a modern browser or use a verified deployment.
2. Select a learning level. **Note:** level selection currently changes the label, not the difficulty of lessons.
3. Select a sample lesson, read the source, and answer the practice question.
4. If something is unclear, return to the lesson and try again. Quiz progress may be stored only in your browser.

## Curriculum workshop (about 2 minutes)
1. Open `curriculum-workshop.html`.
2. Use **Choose a sample workshop** to select Fractions or Water cycle.
3. Read the learning objective, then select **Read external educational source**.
4. Return to the workshop, read **Practice check**, and select an answer.
5. Read the feedback. An incorrect answer is safe to retry; no grade is submitted to a school.
**Troubleshooting:** If the page does not load, verify the file exists and use a current browser. External source links require internet access.

## Experimental VR lab
1. On a supported Meta Quest browser, open `quest.html` through HTTPS.
2. Select the VR entry option if your browser and headset support immersive WebXR.
3. Follow browser permission prompts. Use the controller trigger to switch sample stations.
4. Exit VR using the provided exit control. Use the desktop fallback if immersive VR is unavailable.
**Important:** Physical Quest compatibility and comfort testing are not yet verified. Use educator/adult supervision.

## Curriculum standards staging (developers and educators)
1. Prepare a JSON array of standards records with provenance, license and reviewer fields.
2. Run `node scripts/stage-standards.cjs input.json output-directory`.
3. Review validation errors; correct them in the source file and retry using a new empty output directory.
4. Inspect `standards-staged.json`. Staging does **not** publish lessons or certify standards.
5. Never include student personal information or credentials in the import.
**Troubleshooting:** Output files cannot be overwritten by this command; choose a fresh directory.

## Teacher and school administrators
Teacher dashboards, managed classes, gradebook synchronization, student accounts, school integrations, and AI tutoring are **not yet available**. Do not use the prototype for official grades or student records.

## Tutorial requirements for future features
Each new feature should include: a plain-language purpose, prerequisites, a numbered first-use walkthrough, a practice example, an accessible text alternative, common problems and fixes, privacy notes, and an explicit statement of what is not yet implemented. Update this guide in the same change as the feature. Do not claim an untested capability is working.

## Educator dashboard preview (about 2 minutes)
1. Open `educator-dashboard.html` in your browser.
2. Select **Start guided tutorial** to learn the three dashboard sections.
3. Read the sample overview and sample workshop activity table.
4. Select **Reset sample data** to restore the fictional examples.
5. Use **Try a workshop** to practice as a learner.
**Important:** All dashboard figures are fictional. This is not a gradebook, does not read workshop progress, and cannot identify students. School use requires privacy review, access controls, and verified integrations.

## Tutor preview (about 2 minutes)
1. Open `tutor.html` in a browser.
2. Choose **Fractions** or **Water cycle**.
3. Select **Explain simply** for an introduction, **Give a hint** for help, or **Practice question** to review.
4. Type a subject-related question, such as “What is evaporation?”, and select **Ask**.
5. If the tutor cannot answer, use the provided lesson or ask a teacher. Do not enter names, passwords, contact information, or student records.
**Important:** This is a limited offline rule-based assistant, not a generative AI system. It does not personalize lessons, access school accounts, or submit student data.

## Tutor explanation levels
1. Open `tutor.html`.
2. Choose **Beginner** for shorter explanations or **More detail** for additional subject vocabulary.
3. Choose a subject and select **Explain simply**. Hints, practice and typed questions remain limited rule-based features.
4. Change the level and select **Explain simply** again to compare explanations.

## View anonymous practice in the educator preview
1. Open `curriculum-workshop.html` and answer one or more practice questions.
2. Follow the **Anonymous educator preview** link in the same browser tab.
3. Under **Data source**, choose **Anonymous practice from this browser tab**.
4. Read the counts. They are not student-level records, classroom analytics, or grades.
5. To clear the shared counters, choose **Reset sample data** while the anonymous session source is selected. The button label is retained for now but clears the selected session source.
**Troubleshooting:** A new tab or private window may not share the session data. If there are no answers, the overview may be empty.

## Spanish tutor explanation preview
1. Open `tutor.html`.
2. Set **Language for explanations** to **Español (preview)**.
3. Choose **Beginner** or **More detail**, then select **Explain simply**.
4. Switch to **English** to use the current hint, practice, and typed-question features.
**Limitations:** Spanish is available only for the two sample explanation topics. This is not full multilingual tutoring or verified translated national curriculum.

## Dashboard reset and privacy
1. Open `educator-dashboard.html`.
2. Choose **Fictional sample data** to inspect demonstration numbers; **Reset fictional sample data** restores the examples.
3. Choose **Anonymous practice from this browser tab** to see practice counters from the workshop in the same tab.
4. Select **Clear this tab’s practice counters** to delete those temporary counters.
**Important:** This is not a student roster, gradebook, or school analytics system.

## French tutor explanation preview
1. Open `tutor.html` and select **Français (preview)** under language.
2. Choose **Beginner** or **More detail** and select **Explain simply**.
3. Return to **English** for hints, practice questions, and typed questions; those features have not been translated.
4. Use the external educational reference link to explore the subject.
**Limitations:** Only two sample subjects have French explanations. Translation and curriculum accuracy require educator review before school use.

## Gameplay testing checklist (prototype)
1. Open `play.html` and follow each mode link: 3D campus, POV workshop, VR classroom, school and hands-on lab. Confirm pages load and controls respond.
2. Open `learning-quest.html`. Complete correct and incorrect answers in each room. Check feedback, Next challenge, mastery, stars and reset; refresh to check local progress persistence.
3. Open `curriculum-workshop.html`. Answer sample practice questions, follow the tutor link and return; inspect anonymous progress in `educator-dashboard.html` in the same tab.
4. Try keyboard, touch and mouse where supported. Test VR only on an actual compatible headset over HTTPS; desktop inspection cannot prove headset behavior.
5. Run `npm test` from the repository root (Node.js 20+). The gameplay smoke tests verify local files and links, not real device interaction or visual rendering.
**Testing status:** These steps are a manual test plan; device/browser and VR tests have not yet been confirmed. Report the exact mode, device, steps and error before marking a feature broken or fixed.

## Returning to a workshop without losing tab progress
1. Open `curriculum-workshop.html` and answer a question.
2. Follow the tutor or dashboard link, then return to the workshop **in the same browser tab**.
3. The workshop now restores validated attempts and correct-answer counters from session storage.
4. Select **Reset practice progress** to clear counters; a new browser tab or closed session may start fresh.
**Privacy:** These are anonymous per-tab counters, not student records or grades. Storage may be unavailable in restricted browsers. Browser verification is still required.
