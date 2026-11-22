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
