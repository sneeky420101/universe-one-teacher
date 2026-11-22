# Classroom voice acceptance protocol (internal QA)

Scope: optional spoken lesson guidance on the main classroom page. This feature uses browser text-to-speech and does not use speech recognition or a microphone.

## Required device trials
1. Android Chrome: tap **Read current lesson aloud**. Verify the selected subject's introductory lesson and practice question are spoken, and the visible status updates.
2. Tap **Stop speaking** during narration. Verify playback stops immediately.
3. Start narration and switch apps or lock the screen. Verify playback stops when the page is hidden and status reflects interruption.
4. Start narration and navigate to another page. Verify the utterance is canceled.
5. Change the subject from Science to Mathematics and start again. Verify the narrated lesson changes accordingly.
6. Use TalkBack or VoiceOver and a hardware keyboard. Verify both controls are reachable and status messages are announced without trapping focus.
7. On a browser with no speech synthesis, verify controls are disabled and lessons remain readable.
8. Test with headphones, without headphones, in a quiet room and with ambient noise. Quiet-room use is recommended but **never required** to access lessons.
9. Deny microphone permissions and verify narration still works. No recording or microphone permission should be requested.
10. Repeat in desktop Chrome/Firefox/Safari and Quest Browser. Record differences in available voices, language, latency, and playback.

## Acceptance evidence
Record device model, OS, browser, test date, pass/fail, screenshots or short recording, and any console errors. **These physical tests are not yet complete.** No release or student rollout is authorized.

## Future engineering scope
- Student-selected voice, speaking speed, and lesson language with accurate language tags.
- Sentence-by-sentence highlighting and pause/resume controls.
- Accessibility review for screen-reader overlap and reduced sensory load.
- Separate opt-in microphone speech input only after explicit privacy, parental-consent and child-safety review.
