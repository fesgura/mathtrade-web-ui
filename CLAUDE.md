# mathtrade-web-ui

## System context

This is one of three repos that make up the Math Trade Argentina system. This one is the public, participant-facing Next.js app; it talks to `mathtrade-backend`'s REST API and has a sibling repo, `mathtrade-logistics`, that serves event staff instead. See [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) for the full cross-project picture.

## What this is / who it's for

The app a board-game hobbyist uses to register for a math trade event, list items they're offering, manage their want-lists, and view event results/trade-chain graphs. There's also a secondary informal "referrer" role (users who invited others) with light box-tracking UI, but no distinct admin app or `is_staff` role in the frontend.

## Routes

- `/sign/in`, `/sign/up`, `/sign/forgot-password` — auth
- `/mathtrade` — home/dashboard (countdown, timeline, status)
- `/mathtrade/my-collection` — personal board-game library
- `/mathtrade/my-offer`, `/mathtrade/offer` — items you're offering / browsing others'
- `/mathtrade/my-wants` — want-list management
- `/mathtrade/my-data`, `/mathtrade/my-account` — event sign-up / account settings
- `/mathtrade/referral`, `/mathtrade/referrals-area` — refer-a-user flow, referrer-only area
- `/mathtrade/results`, `/mathtrade/statistics`, `/mathtrade/graph` — results, stats, and trade-chain graph views
- `/mathtrade/faqs`, `/mathtrade/memardiums` — FAQ list, news feed
- `/media`, `/terms-conditions` — public static pages
- `/mathtrade/playground` — a Pico.css component demo page, not linked from any menu (see Known gaps)

## Talking to the backend

HTTP client: `apisauce` (`src/hooks/useFetch/constants/api.js:6-11`). Base URL is **hardcoded in `next.config.js`** (`:3-9`), not read from a `.env` file — `API_TEST_MODE` is hardcoded `"yes"`, so the deployed app currently always targets the `fly.dev` test backend rather than the production API host. Auth token is stored in a cookie (`auth_token_mt`, 7-day expiry) and sent as `Authorization: token <token>`. On HTTP 401 the shared `useFetch` hook auto-signs the user out. Endpoint paths are centralized in `src/hooks/useFetch/constants/endpoints.ts` with `$[...]` placeholder substitution — unlike `mathtrade-logistics`, which inlines endpoint strings per call site.

## State

Two zustand stores, both persisted to `localStorage` (`src/store/index.js`): `useStore` holds domain data (`data.user`, `data.mathtrade`, `data.mathtrade_history`, `data.membership`, cached `locations`); `useOptions` holds only per-screen UI filter state.

## Trade-chain graph

`GraphViewer`/`GraphCanvas` (`src/components/interactiveGraph/`) renders trade chains with `cytoscape`+`cytoscape-fcose`. **This does not read live backend data** — it fetches static bundled JSON (`public/data/graph_results_{year}.json`), an apparently manually-produced export of a past event's solved trade chains. Easy to assume it's live; it isn't.

## i18n

`src/i18n/index.jsx:6` hardcodes `currentLanguage = "es_AR"` with an explicit `// HARDCODED NOW:` comment — only one language file exists, no runtime locale switching despite an unused `data.lang` field in the store's default state.

## Deployment & environment

No Dockerfile, no `.env*` file — all env vars (`PAUSED_SITE`, `API_TEST_MODE`/`BASE_URL`/`BASE_URL_TEST`, `GOOGLE_RECAPTCHA_CLIENT_KEY`, help links) are hardcoded directly in `next.config.js`'s `env` block, baked into the build rather than sourced at deploy time.

## Working conventions

- **TypeScript migration is incremental, "as you touch it".** The codebase is plain JS/JSX with TS bootstrapped (`tsconfig.json`, `strict: false`) but not yet adopted file-by-file. Whenever you edit a component, migrate it to `.tsx`/`.ts` as part of that same change — don't leave a file you just modified in `.jsx`. A recurring gotcha: an untyped component with destructured props that have no default value gets inferred as "prop required" by TS even under `strict: false`; fix it by giving the prop a real default value (matching its actual runtime behavior), not by overriding the type.
- **Use the workspace's QRSPI workflow** (see `../CLAUDE.md`) for any non-trivial frontend change — new feature, multi-file refactor, or a design-system change that touches several components. Skip straight to implementation only for trivial, single-file, low-risk edits.

## Tests: none

No `jest.config.*`, no test files, no testing library in `package.json`, no `test` script.

## Known gaps

Facts observed during research — not a prescribed fix list:
- No tests at all, on the highest-traffic app in the system.
- A full mock-API implementation (`src/hooks/useFetch/mocks/**`) exists but is unused — `API_TEST_MODE` only switches the real base URL, not real-vs-mock.
- ~~Orphaned files confirmed unimported anywhere: `useLeavePageConfirmation copy.js`, `statusTypes copy.js`.~~ Both deleted.
- Several commented-out-but-retained code blocks, including route `enabled` flags commented out in `src/config/routes.ts`.
- `src/components/results/wantsOffered/app/data.js` is ~69,541 lines of hardcoded historical event data bundled directly into the JS.
- `API_TEST_MODE` hardcoded `"yes"` means the app currently always hits the test backend, not production, regardless of actual deploy environment.
