# Automotive Workshop Expansion — Engineering Specification v1

Status: DESIGN SPECIFICATION ONLY. No gameplay implementation or tests claimed.

## Educational contract
Each job requires: customer complaint -> safety inspection -> diagnostic hypothesis -> tests -> tool selection -> disassembly -> inspection -> repair -> manufacturer-specific torque/fluid verification -> reassembly -> quality-control test -> explanation and reflection.
Do not teach universal torque, jacking, or fluid specifications. Load verified vehicle-specific service data; when unavailable label values as illustrative and prevent certification scoring.

## First playable vertical slice: Tire service
Stages: inspect tire size and condition; check safe lift points; secure vehicle; loosen fasteners safely; lift; remove wheel; inspect tire and rim; choose replace/repair within safety limits; use tire changer; inflate with safe procedure; balance wheel; reinstall; lower; apply verified wheel-fastener torque and sequence; verify TPMS and roadworthiness.
Obstacles: rounded fastener, mismatched tire size, hidden sidewall damage, uneven wear, missing wheel weight, unsafe lift point, TPMS fault, incorrect torque.
Assess diagnostics, safety, procedure, final outcome; safety-critical errors require correction, not humiliation.

## Second slice: Oil and oil-pan service
Stages: identify engine and manufacturer spec; confirm fluid type and quantity; secure/lift vehicle; remove undertray as required; position drain pan; drain safely; replace filter and drain sealing hardware as specified; inspect pan and gasket; for pan replacement remove obstructions according to vehicle service manual; clean mating surfaces correctly; reinstall using verified sequence/torque; refill; inspect leaks; verify oil level using model-specific procedure; reset service reminder if applicable; document disposal.
Obstacles: stripped drain plug, cross-threading, stuck filter, wrong viscosity, damaged pan, blocked pan removal, gasket leak, low oil, double-gasket filter.
Avoid unsafe generic advice on engine running or hot oil; PPE and fluid disposal are mandatory.

## Progression
Apprentice: guided steps, transparent hints.
Technician: partial guidance, diagnostic choices.
Master: ambiguous complaints, multiple simultaneous faults, constrained inventory.
Instructor: explains why each action is correct, assesses reasoning, offers accessible voice/text alternatives.
Scenarios must remain completable without VR on touch, mouse/keyboard, or controller.

## Simulation architecture
Data-driven vehicle schema: vehicle_id, engine_code, wheel_specs, tire_specs, fluid_specs, service_procedures, tool_requirements, verified_source, revision_date.
Job graph: prerequisites, interactive actions, fault injections, telemetry, validation rules, undo/retry, feedback.
Separate deterministic domain simulation from rendering; adapt 3D graphics quality to device capabilities.
Never copy third-party game code, assets, proprietary UI, trademarks, or licensed vehicle designs.

## Acceptance tests
- Cannot complete a job with unresolved safety-critical errors.
- Fault injection yields reproducible results with fixed seeds.
- Every failure has corrective feedback and retry.
- All tasks are playable without VR and support save/resume.
- Vehicle-specific specs cannot silently fall back to invented values.
- Keyboard/controller/touch interaction parity is checked.
- Job scoring tests include correct, incorrect, interrupted, and repeated attempts.

## Backlog
Brakes; suspension; steering; cooling; electrical and OBD; transmission; engine rebuild; diesel; hybrid/EV high-voltage awareness (no unsafe hands-on access without appropriate training); bodywork; customer work orders; parts inventory; instructor dashboard; localization; credential-aligned assessments.
