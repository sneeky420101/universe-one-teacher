# Modern simulator engineering research — 2026-11-23

Status: research and architecture decision record, NOT implemented gameplay.

## Existing application findings
- Current entry point is static HTML with separate WebXR experiment.
- Existing README explicitly disclaims production-ready immersive school, real headset verification, and true AI tutoring.
- Preserve existing lessons and pre-launch publication hold.

## Evaluated technology
1. Unreal Engine 5: Nanite/Lumen, Chaos rigid bodies and vehicles, World Partition, animation and networking. Best candidate for premium desktop visual fidelity. Requires distinct mobile scalability and web delivery strategy. Sources: https://www.unrealengine.com/unreal-engine-5 ; https://dev.epicgames.com/documentation/unreal-engine/chaos-vehicles
2. Godot 4: open-source, 3D, mobile, desktop, web, OpenXR; good candidate for downloadable cross-platform and browser-oriented prototype. Source: https://docs.godotengine.org/en/latest/about/list_of_features.html
3. Carlito: MIT-licensed Godot vehicle simulation with CC0 bundled assets, garage and vehicle systems. Study and evaluate actual reusable code, preserving notices and license. Source: https://github.com/leaukojo/carlito

## Inspiration (mechanics, not proprietary code)
- DayZ: world traversal, contextual item interactions, equipment/inventory and persistent world state.
- Modern shooters: responsive first-person movement, aiming, hands and animation polish; educational applications exclude combat mechanics by default.
- Minecraft: modular construction, crafting dependencies, repeatable scenarios and learner experimentation.
- Vehicle and life simulators: subsystem modeling, diagnostics, economy/progression, non-punitive feedback.

## Required vertical slice — Automotive electrical fault
- First-person 3D workshop, collision and camera.
- Detailed licensed vehicle and engine assets with LODs.
- Physically selectable/removable battery terminal and fastener; hand/tool animations.
- Simulated voltage and resistance measurements with faults seeded by deterministic scenario data.
- Tool selection, safe isolation sequence, torque check and post-repair verification.
- Instructor explanations and assessment based on actual state transitions, not button-only scripted success.
- Keyboard/mouse, touch and VR input adapters; accessibility alternatives.
- Automated tests for state transitions, wrong order, reset, save/load and deterministic faults.
- Real-device performance, comfort and usability test reports.

## Architecture gates
A. Inventory existing source, build/test setup and asset provenance.
B. Benchmark Godot web/mobile/XR and Unreal high-end rendering against target devices.
C. Choose a primary runtime based on actual measured requirements, not visuals alone.
D. Implement deterministic simulation core independent of presentation.
E. Integrate real 3D scene, interactions, lesson progression and instructor.
F. Run automated + manual gameplay tests, regression tests and performance profiling.
G. Expand only after a complete playable, verified vertical slice.

## Acceptance criteria
A lesson is complete only when the student can move through the environment, manipulate a 3D part with the correct tool, observe simulation-dependent outcomes, recover from mistakes, and finish with assessed learning results. Evidence: source revision, build artifact, automated test output, recorded device testing, known limitations.

## Release policy
Keep private/pre-launch. Do not publish or merge without verified tests and owner approval. Do not import proprietary commercial game assets or source code without permission.
