# Cálamo Andret · Developer Portfolio

A responsive, English-language portfolio focused on Python backend engineering, software quality, practical AI integration, and IT support. Built with React, TypeScript, Vite, Tailwind CSS, Lucide icons, and Motion. All content and visuals run statically: no backend, account, API key, or paid service is required.

## Local development

Install **Node.js 24 LTS** (or Node 22.13+), with npm. From this directory:

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite (normally `http://127.0.0.1:5173`). If Node is already installed, open a new terminal so its PATH is available.

### Windows PowerShell and VS Code

The portable runtime is in **`.tools` with a leading dot**, not `tools`:

- Node: `C:\developer-portfolio\.tools\node-v24.22.2-win-x64\node.exe`
- npm: `C:\developer-portfolio\.tools\node-v24.22.2-win-x64\npm.cmd`

The ignored workspace file `.vscode/settings.json` adds this runtime to PATH for new VS Code terminals in this folder. Its default **PowerShell (Portfolio Node)** profile aliases `npm` and `npx` to their `.cmd` launchers, so no PowerShell execution-policy change is needed. Close the old terminal using the trash button, then select **Terminal → New Terminal**. Existing terminals retain their old environment.

These commands work in an existing PowerShell terminal as well:

```powershell
Set-Location C:\developer-portfolio
$env:PATH = "C:\developer-portfolio\.tools\node-v24.22.2-win-x64;$env:PATH"
npm.cmd run dev -- --port 5173 --strictPort
```

Open `http://localhost:5173/`. Leave that terminal running and use **Ctrl+C** to stop the server. In a new configured VS Code terminal, the PATH line can be omitted and either `npm` or `npm.cmd` can be used. This setup is local to this workspace; it does not install software system-wide or alter other repositories. If the project is moved, update the runtime paths in `.vscode/settings.json`.

An isolated, checksum-verified Node 24 runtime was downloaded to the ignored `.tools/` directory for initial validation because the task shell had no Node on PATH. To use it in PowerShell from this project, without modifying your system PATH:

```powershell
$runtime = (Get-ChildItem .tools -Directory -Filter 'node-v24*-win-x64' | Select-Object -First 1).FullName
$env:PATH = "$runtime;$env:PATH"
npm.cmd run dev
```

The runtime is a local convenience and is not included in source control. For a fresh clone, install Node normally.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server on loopback |
| `npm run lint` | ESLint with zero warnings allowed |
| `npm run typecheck` | Strict TypeScript check |
| `npm test` | Vitest + React Testing Library tests |
| `npm run test:watch` | Interactive test runner |
| `npm run build` | Type check and optimized static build in `dist/` |
| `npm run preview` | Serve the production build locally |

`package-lock.json` records exact resolved dependencies. Use `npm ci` in CI and fresh checkouts. Fonts are bundled locally; visitors do not contact a font service. Manrope and JetBrains Mono are distributed under the SIL Open Font License in their respective packages.

The `minimatch` override replaces the lint tooling’s vulnerable transitive glob matcher with patched version 11.0.1. Lint and component/build checks verify this resolution. Review and remove the override when upstream dependencies adopt a patched version.

## Customize

- **Content:** `src/data/portfolio.ts` contains the typed profile, navigation, project details, skill groups, and experience responsibilities.
- **Design:** `src/styles.css` contains the palette, responsive layouts, and typography. Tailwind is enabled through its Vite plugin and used for layout utilities.
- **Visuals:** `src/components/Architecture.tsx` contains the original conceptual API architecture and project diagrams. These are static illustrations, not a running application or execution status.
- **Contact:** confirmed public defaults in `src/data/portfolio.ts` are `calamoandret@gmail.com` and `https://www.linkedin.com/in/c%C3%A1lamo-andret-377481238/`. Optional nonempty `VITE_CONTACT_EMAIL` and `VITE_LINKEDIN_URL` values override them at build time. Restart Vite after changing environment values. Invalid overrides are omitted. The defaults ensure a clean CI build includes contact links without relying on the ignored `.env.local`. Email copying requires clipboard support in a secure browser context.
- **Metadata:** update `index.html`, `public/favicon.svg`, and `public/social-card.png` (the editable vector concept is `public/social-card.svg`). Set `SITE_URL` to the complete deployed URL, including the repository path and a trailing slash. The build then emits canonical/Open Graph URL tags and a sitemap; `robots.txt` is always emitted. No public hostname is invented for local builds. After editing the optional Windows social-card helper, run it from this project with `Get-Content -Raw scripts/generate-social-card.ps1 | powershell -NoProfile -Command -`.
- **Base path:** `BASE_PATH=/` is the default. For project Pages, use `/developer-portfolio/`. `SITE_URL` must include that same path. Assets and the favicon respect the Vite base; in-page anchors remain relative to the current page.

All `VITE_` variables are public build inputs. Never put secrets in them. Changing contact details or public URLs requires rebuilding.

## Content integrity

Project descriptions were checked against these public READMEs on **November 6, 2026**:

- [AI Document Intelligence](https://github.com/CalamoAndret/ai-document-intelligence#readme): durable background processing, validated extraction and source evidence, deterministic offline mock, and optional real Gemini provider.
- [Python Backend Testing Lab](https://github.com/CalamoAndret/python-backend-testing-lab#readme): optimistic concurrency, persistent idempotency, PostgreSQL transactions, property/state-machine/race testing, and CI.

Repository links are the source of truth. No hosted demo, benchmark, test count, employment date, employer, certification, graduation date, or seniority is claimed. The IT responsibilities and education follow the supplied brief. Skill labels describe project use and familiarity rather than mastery.

## Accessibility and behavior

Semantic landmarks, one main heading, a skip link, visible keyboard focus, descriptive link names, mobile menu state, Escape dismissal with focus return, active section tracking, and system reduced-motion preferences are supported. The mobile menu is a disclosure navigation, so normal Tab order remains available. External links identify that they open a new tab. Layouts target 320px and wider screens.

Tests cover section destinations, menu behavior, project links, the confirmed contact destinations, missing contact states, configuration validation, clipboard success/failure, accidental placeholder links, and axe-core structural accessibility checks. The axe check runs in jsdom and excludes contrast; it does not certify WCAG compliance. Key text colors were checked separately for contrast. Browser QA should also include 320px mobile, tablet, desktop, keyboard navigation, reduced motion, and external link destinations.

## Continuous integration

`.github/workflows/ci.yml` runs `npm ci`, lint, type checking, component tests, and production build on pull requests and pushes to `main`. It can also be run manually.

## Deployment

Repository: `https://github.com/CalamoAndret/developer-portfolio`. GitHub Pages target: `https://calamoandret.github.io/developer-portfolio/`. Publication is controlled by the manual deployment workflow; normal pushes run CI only.

### GitHub Pages

For initial setup or a future deployment:

1. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
2. Optionally set repository **Actions variables**: `VITE_CONTACT_EMAIL`, `VITE_LINKEDIN_URL`, `BASE_PATH`, and `SITE_URL`.
3. Run **Actions → Deploy to GitHub Pages (manual) → Run workflow** when you are ready to publish.

The deployment workflow has only `workflow_dispatch`; a push alone never publishes. It runs all quality gates before deploying. It infers `/<repository-name>/` for project Pages, or `/` for an `<owner>.github.io` repository. For a custom domain, set `BASE_PATH=/` and `SITE_URL=https://your-real-domain/`, then configure the domain and HTTPS in Pages settings. Deployment uses GitHub's scoped workflow token and OIDC; no personal access token is needed. Branch/environment protections may require a separate deployment approval in GitHub.

### Other static hosts

Run `npm ci` and `npm run build`, configure the correct `BASE_PATH` and `SITE_URL`, and upload `dist/` to a static host when you decide to publish. There are no client-side routes requiring rewrite rules. Do not upload source, `.env` files, `.tools`, or `node_modules`.

## Files and repository hygiene

Generated builds, dependency folders, runtime downloads, test coverage, local settings, caches, and `.env` files are ignored. `.env.example` contains empty public configuration fields only. The email and LinkedIn defaults are intentionally public. No authentication tokens or backend credentials belong in this project. Review `git diff --cached` before each commit.

## Implementation validation · November 6, 2026

- Release checks include `npm run lint`, `npm run typecheck`, `npm test` (11 tests, including axe-core), and `npm run build` with the GitHub Pages base path.
- `npm audit --audit-level=low`: zero reported vulnerabilities at validation time.
- `npm ls --depth=0`: dependency tree resolves without peer errors.
- Root build and `/developer-portfolio/` build: verified. The production configuration uses `BASE_PATH=/developer-portfolio/` and `SITE_URL=https://calamoandret.github.io/developer-portfolio/`.
- Local HTTP checks: HTML, JavaScript, CSS, favicon, social image, and fonts returned 200. Pages robots and sitemap also returned 200, with matching base paths and canonical URLs. The default local build correctly omits an unconfigured canonical URL and sitemap.
- Social-card PNG: visually inspected.
- Interactive browser/viewport verification: **not completed**. The browser connector was unavailable, and Windows computer use stopped because it could not confidently determine Chrome’s current URL. Responsive styles, keyboard navigation, and reduced motion are implemented, but mobile/desktop visual checks remain a recommended manual review.
- GitHub profile and both project repositories returned HTTP 200. LinkedIn returned an automated-access block (999); the link is preserved exactly as supplied, without claiming automated verification of the profile or mailbox ownership.
- Release staging excludes `.env.local`, `.tools/`, `.npm-cache/`, `.vscode/`, `node_modules/`, `dist/`, and `artifacts/`. Common credential token and private-key patterns are checked before committing.
