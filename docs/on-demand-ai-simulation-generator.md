# On-Demand Educational Simulation Generator — Architecture v1

Status: design only. No live model, sandbox, or code generation integration is claimed.

## Product intent
A student describes a learning objective in natural language. An AI tutor identifies scope, age/skill level, learning objectives, trusted references, and suitable simulation fidelity. The system generates a declarative scenario first, using existing simulation primitives. Novel code generation is an exceptional, separately authorized path, not the default.

## Request-to-simulation pipeline
1. Normalize request; enforce educational intent and age-appropriate safety policy.
2. Retrieve vetted curricula, manuals, citations and available licensed assets; disclose uncertainty and source gaps.
3. Produce structured lesson plan and scenario JSON with domain, prerequisites, objectives, components, interactions, constraints, assessment rubric, citations, provenance and safety tier.
4. Validate schema, reference integrity, asset licenses, interaction graph, reachability, resource limits and unsafe operations.
5. Assemble scene from approved 3D components and animations, with desktop/touch/controller/VR adapters.
6. Run deterministic simulation tests, accessibility checks and visual interaction tests; do not claim verification if tests are absent.
7. Launch isolated, resource-limited preview; record feedback and learning progress with consent.
8. Submit approved content improvements to versioned review pipeline. Never automatically promote arbitrary generated code to production.

## AI code generation lane
Only when the approved declarative DSL cannot express a safe educational objective:
- Generate a scoped patch in a temporary workspace without production credentials, network or student data.
- Allowlisted dependencies, strict quotas, static scanning, unit/integration tests, policy review, human approval for elevated capabilities.
- Build signed/versioned artifact and deploy only through authorized release process.
- Reject shell access, privilege escalation, network exfiltration, self-modification of safety controls, and unrestricted code execution from learner prompts.

## AI tutor
Provide explanations, multimodal prompts, encouragement, misconceptions, formative assessment, and citations. Keep model claims separate from verified facts. Adapt difficulty with student consent and privacy safeguards. Avoid claiming accreditation or professional certification.

## Continual learning
Feedback queue -> evaluation datasets -> educator review -> curriculum versioning -> regression tests -> release gate.
Model weight training/fine-tuning is a separate governed process; do not equate conversation memory with reliable permanent model learning.
Use retrieval and reviewed content updates to keep knowledge current.

## Example scenario request
"Teach me to rebuild a motorcycle engine."
Generated outline: safety and PPE; component identification; fastener tracking; ordered disassembly; inspection and measurement; parts selection; reassembly with verified manufacturer specifications; assessment and explanation.
If reliable specifications are unavailable, generate conceptual exploration only, clearly labeled.

## Required gates before production
Authentication and abuse controls; isolation; cost budgets; generated asset provenance; human oversight; COPPA/FERPA review as applicable; adversarial prompt-injection tests; automated lesson QA; rollback; user-visible uncertainty and reporting.
Pre-launch hold remains in force.
