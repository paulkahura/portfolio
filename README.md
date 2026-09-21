# Paul Kahura / Personal Workstation

A React, TypeScript, and Vite portfolio presented as an accessible HTML interface inside a CSS CRT monitor. No WebGL or external services are required.

## Local development

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open the URL printed by Vite, including `/portfolio/`. Vite selects another port if the default is occupied.

```sh
npm run lint
npm test
npm run build
npm run preview
```

## Content

- `src/data/portfolio.ts`: typed project records, experience, contact details, and section IDs.
- `src/data/blogPosts.ts`: existing articles and their original IDs.
- `public/projects/`: actual Zuka app capture and TIVTAV/Repsafe brand assets from the supplied project folders. Logos are identified as logos, not product screenshots.
- `public/paul-kahura-resume.pdf`: supplied resume, served locally for viewing and downloading.

Company projects have summaries rather than source-code links. Zuka's provider adapters are described as integration extension points, not active partnerships.

## Navigation and display

Sections use `?section=projects`; project details add `&project=zuka-safari`. Browser history and refreshed links preserve the selected view. Existing `/blog/:id` paths remain available. Unknown sections, projects, and article paths render a recovery view.

The optional command prompt accepts section names (including `games`), `open <section>`, project IDs or names, `home`, `back`, `clear`, and `help`. Every destination is also accessible through links. Display controls toggle scanlines and standby. The monitor fits the viewport; long content scrolls only inside its screen, including on mobile.

The introduction types once, then cycles through five shuffled descriptions with a decryption effect. The pause control stops the description cycle. Reduced-motion preferences render static text. A generated SVG displacement map adds mild lens curvature to the HTML, with a CSS glass treatment and a custom pixel cursor.

## Snake

The games section uses [snake-game-engine](https://github.com/lucabro81/snake-game-engine) for movement, growth, food, and collision rules. A small adapter provides a safe starting position, a cancellable timer, and React snapshots. Unit tests cover food/scoring, boundaries, reversal, pause/resume, and timer cleanup. `npm test` requires Node 22.18 or newer.

Arrow keys or WASD steer while the canvas is focused; Space toggles play/pause and Escape pauses. Touch players can swipe the board or use the directional buttons. The game pauses when focus leaves it or the page becomes hidden. Best scores stay in local storage when available, and blocked storage does not prevent play.

## Hosting

The Vite base remains `/portfolio/`. The build creates `dist/404.html` as a copy of the application shell so GitHub Pages can render direct visits to legacy blog paths. GitHub Pages still returns HTTP 404 for those fallback requests; query-based section links return normally. No deployment happens during a build.

## Browser verification checklist

- Open all seven sections and four featured projects with both links and commands.
- Refresh a project URL, then use browser Back/Forward and the in-screen Back/Home controls.
- Download the resume and verify its PDF contents; check email, GitHub, LinkedIn, and clipboard actions.
- Visit all existing blog URLs and invalid section/project/article URLs.
- Verify keyboard focus after navigation, reduced motion, scanlines, and standby recovery.
- Verify the five-description animation, pause control, and stable text layout.
- Play Snake with keyboard and touch; test scoring, restart, focus loss, and best-score persistence.
- Inspect 320px, 390px, 768px, 1440px, and 1920px layouts for overflow and asset loading.

The redesign was checked with Chromium/Playwright against the local Vite server, including PDF downloading, clipboard copying, route history, missing-entry states, and desktop/mobile screenshots.
