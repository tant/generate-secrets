## PRD: Phase 1 — Foundation for Multiple Templates

### Summary
Establish the core architecture and UX to support multiple stack-specific .env templates while keeping the app privacy-first, performant, and easy to extend. Built on Astro 5 with Tailwind v4 + daisyUI, we’ll add a Template Registry, shared UI panels (import, controls, parsed list, preview), routing for template pages, and a robust, lossless parser + secure generators. We’ll prefer Astro components with small client-side scripts; React islands are optional for complex interactions.

### Goals
- Enable adding new .env templates with minimal changes (registry-based, route-per-template).
- Preserve user input exactly: comments, order, spacing, and line endings.
- Generate secrets using Web Crypto (no Math.random) with clear, per-key policies.
- Keep home page minimal and fast; leverage Astro’s route-level bundling so template code isn’t shipped on home.
- Allow client-only import via drag-drop and GitHub URL (blob→raw) within size limits.

### Non-goals
- Building any specific template’s business rules (that’s Phase 2+).
- Server-side proxying or storing secrets.
- Full-blown .env editor (we don’t restructure unknown keys).

### Users and needs
- Developers who want to quickly prepare secure .env files for popular stacks.
- Contributors who want an easy way to add templates without touching core logic.

### Success metrics (targets)
- Home TTI unchanged (±5%) vs MVP; no large JS from templates on home.
- Parser round-trip = 100% exact match on representative fixture sets.
- GitHub URL import success rate > 95% for supported blob/raw links.
- No network calls on home and template pages except direct GitHub fetch when using URL import.

---

## Scope

### In scope
- Template Registry with metadata and per-key generation policies (TypeScript module).
- Lossless .env parser and renderer (preserve comments/order/CRLF; detect duplicates).
- Shared UI components built as Astro components with minimal client directives (client:load/idle) and vanilla TS; React island(s) only if needed for complex lists.
- Routing: /templates/[id] with friendly alias support (e.g., /supabase → /templates/supabase).
- Client-only GitHub URL handling: blob→raw normalization, 256 KB guard.
- Basic navigation: Astro layout + header nav (Home, Templates, Privacy) with active state.
- Internationalization-ready microcopy (EN, VI baseline) via simple TS messages map (no i18n lib in Phase 1).
- Test scaffolding: unit (Vitest), E2E (Playwright); component tests optional via Playwright component or DOM tests.

### Out of scope
- Specific template content (Supabase logic etc.).
- Non-GitHub URL import providers (GitLab, Bitbucket).
- Server persistence, telemetry, or analytics.

---

## Assumptions & constraints
- Astro 5 with @tailwindcss/vite (Tailwind v4) and daisyUI for styling/components.
- @astrojs/react is available but optional; prefer Astro components + vanilla TS; introduce React islands only if clearly beneficial.
- Use Web Crypto API for randomness; if unavailable, show a blocking message with guidance (no insecure fallback).
- Max input size: 256 KB per file/URL response.
- Privacy-first: no proxying; no uploads; no storage beyond session (no cloud).

---

## Detailed requirements

### 1) Template Registry
- Provide a typed registry: templates[id] with fields:
  - id, title, description, version (semver), keywords.
  - match(content) → number|boolean for future auto-detect (stub OK in Phase 1).
  - urlNormalizer(url) → normalizedUrl|error (GitHub blob→raw by default).
  - knownKeys[] with minimal metadata (labels, tooltips, mask default). Generation funcs may be stubbed in Phase 1.
  - uiOptions: toggles available (preserve existing, JWT TTL control visibility), showUrlInput (boolean).
- Expose helpers for registering templates and retrieving by id.

Acceptance
- Given a registered template id, when navigating to /templates/[id], then registry returns metadata used by shared panels.
- Given an unknown id, then a friendly 404 template page is shown.

### 2) Parser & Renderer (lossless)
- Parse .env text into a sequence of nodes preserving:
  - line endings (LF/CRLF), comments (# …), blank lines, spacing around =, and quotes.
  - key-value pairs including values with = inside, quoted values, and inline comments.
- Renderer must produce identical text for a no-op roundtrip.
- Detect duplicate keys: mark first occurrence as primary, flag duplicates.
- Preserve malformed lines verbatim.

Acceptance
- Roundtrip identity on fixture sets (Unix LF, Windows CRLF, mixed quotes, equals, BOM).
- Duplicate detection: first primary, others flagged; no reordering.

### 3) Shared UI panels
- Import panel (Astro component): drag-drop (1 file limit) + GitHub URL input (blob/raw only); privacy and size notes. Client directive: client:load to attach event handlers using vanilla TS.
- Summary & Controls: counts; preserve toggle; optional JWT TTL control (hidden unless template opts-in); actions: Generate, Reset.
- Parsed list: render rows with key, value (masked for isSecret), badges (generated/unchanged/duplicate/placeholder), actions (Info, Eye, Copy, Re-roll if supported later). Implement as Astro + small script; if performance becomes an issue, migrate list rendering to a React island.
- Preview: read-only textarea with exact output; Copy .env and optional Download actions.
- Accessibility: keyboard support, visible focus, aria-live alerts, accessible tooltips (no hover-only interactions).

Acceptance
- Dropzone accepts file and shows summary; URL import rewrites blob→raw and fetches; non-GitHub shows guidance.
- Copy .env copies exact preview; actions are keyboard accessible.

### 4) Routing & Navigation
- New route: /templates/[id]; alias system allows /supabase → /templates/supabase.
- Shared Astro layout with header nav: Home, Templates, Privacy; active link has aria-current=page.
- Astro’s default route-based code splitting ensures template code is not shipped on Home.

Acceptance
- Visiting Home does not load template code; visiting a template route loads only needed modules.

### 5) GitHub URL import (client-only)
- Support github.com blob links by rewriting to raw.githubusercontent.com.
- Size guard: reject >256 KB with a clear error.
- Error handling: 4xx/5xx show reason; network failures show retry guidance.

Acceptance
- Blob URL successfully normalized and fetched client-side; non-GitHub rejected.

### 6) Internationalization (baseline)
- All user-visible strings in a messages map (TypeScript object) with EN/VI values.
- Phase 1: default locale can be VI; optional toggle is nice-to-have; ensure all strings flow through the messages map to enable later expansion.

Acceptance
- Messages resolved via the i18n map; adding a second locale updates displayed strings without code changes in components.

### 7) Testing scaffolding
- Unit (Vitest): parser, renderer, URL normalizer.
- Component (optional): DOM-level tests using @testing-library/dom or Playwright component tests.
- E2E (Playwright): import via drag-drop and GitHub URL; copy .env; keyboard nav basics.

Acceptance
- CI runs unit + component + E2E suites green.

---

## UX requirements (high-level)
- Follow the Wireframes in docs/8-supabase-env-import.md for shared components style (cards, tooltips, badges, snackbars) adapted generically.
- Maintain privacy note near import actions; make non-GitHub limitation explicit.
- Provide consistent badges and iconography across templates.

---

## Performance & accessibility
- Home page JS stays minimal via Astro routing; verify no template bundles on Home.
- Use client:idle or client:visible where appropriate to defer non-critical scripts.
- Template pages pass basic Lighthouse a11y checks; keyboard navigable; readable contrasts.

---

## Privacy & security
- Client-only operations; no proxy; no telemetry.
- Use Web Crypto for randomness (centralized util). Phase 1 focuses on interfaces; actual per-template generation comes in Phase 2.

---

## Milestones & deliverables
- M1: Parser + Renderer + tests (roundtrip, duplicates, malformed).
- M2: Template Registry + Routing + basic nav.
- M3: Shared UI panels wired to registry (import, summary/controls, parsed list, preview).
- M4: GitHub URL normalization + size/error handling.
- M5: i18n scaffolding + baseline strings (EN/VI).
- M6: Test scaffolding (unit/component/E2E) + CI config.

---

## Acceptance criteria (end-to-end)
1) Preservation: Given a sample input, when imported and immediately exported without generation, then output is byte-for-byte identical.
2) GitHub import: Given a GitHub blob URL, when importing, then it is normalized to raw and fetched; non-GitHub URLs are rejected.
3) Isolation: Visiting Home does not load template code; visiting /templates/[id] loads only needed modules.
4) Accessibility: Import and Copy actions are keyboard accessible; alerts/snackbars announced via aria-live.
5) Copy: The Copy .env action places exactly the preview content onto the clipboard.
6) Tests: All unit, component, and E2E tests pass in CI.

---

## Risks & mitigations
- Complex parsing edge cases → Add extensive fixtures and a conservative renderer; preserve verbatim when unsure.
- Bundle growth → Lazy-load template code; keep shared panels lean; defer generators until needed.
- CORS variability → GitHub-only scope; clear fallback to drag-drop.

---

## Tracking & references
- Roadmap: ROADMAP.md (Phase 1 section)
- Architecture: docs/9-template-architecture-and-roadmap.md
- Wireframes baseline: docs/8-supabase-env-import.md (shared panels styling)

---

## Implementation notes (Phase 1 skeleton)

### Proposed file structure

```
src/
  templates/
    registry.ts         # TemplateRegistry and helpers
  components/
    shared/
      ImportPanel.astro
      SummaryControls.astro
      ParsedList.astro
      PreviewPanel.astro
  pages/
    templates/
      [id].astro        # Dynamic route for template pages
```

### Stub interfaces (TypeScript)

// src/templates/registry.ts
export interface TemplateMeta {
  id: string;
  title: string;
  description: string;
  version: string;
  keywords: string[];
  match?: (content: string) => boolean | number;
  urlNormalizer?: (url: string) => string | Error;
  knownKeys: Array<{
    key: string;
    label: string;
    tooltip?: string;
    mask?: boolean;
  }>;
  uiOptions?: {
    showUrlInput?: boolean;
    showPreserveToggle?: boolean;
    showJwtTtlControl?: boolean;
  };
}

export const templates: Record<string, TemplateMeta> = {
  supabase: {
    id: "supabase",
    title: "Supabase .env",
    description: "Generate secure secrets for Supabase self-hosting.",
    version: "1.0.0",
    keywords: ["supabase", "postgres", "jwt"],
    urlNormalizer: (url) => url.replace(
      /^https:\/\/github.com\/(.+?)\/(.+?)\/blob\/(.+?)\/(.+)$/, 
      "https://raw.githubusercontent.com/$1/$2/$3/$4"
    ),
    knownKeys: [
      { key: "POSTGRES_PASSWORD", label: "Postgres Password", mask: true },
      // ...more keys
    ],
    uiOptions: {
      showUrlInput: true,
      showPreserveToggle: true,
      showJwtTtlControl: true,
    }
  },
  // ...other templates
};

export function getTemplateById(id: string): TemplateMeta | undefined {
  return templates[id];
}

// Usage: getTemplateById(params.id) in [id].astro
