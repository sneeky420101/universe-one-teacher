# Universe One — playable build acceptance gates

No public release without owner approval. A source code link or HTML attachment is **not** an accepted playable deployment.

1. Staging deployment reachable via browser URL; game launches without source view or download.
2. Test Android touch controls and desktop keyboard/mouse; verify loading and input.
3. Validate actual first-person movement, interaction range, tasks, feedback, reset, and completion for every shipped environment.
4. Verify third-party libraries and assets are permitted and actually load under server Content-Security-Policy.
5. Test server route, HTTP 200, JavaScript console errors, device memory/performance, and no blocking exceptions.
6. Verify authentication or access restrictions for private owner testing; do not assume an unlisted public URL is private.
7. Label visuals and simulation limitations accurately. Never describe primitive geometry as photorealistic or claim physics that are not implemented.
8. Do not mark launch ready until independent browser tests pass and owner accepts gameplay.

Current known blockers: the server had no /simulation-game.html route before a recent source change; the game's Three.js CDN import is not permitted by the server's default CSP; the current staging deployment predates the route change. No verified playable link yet.
