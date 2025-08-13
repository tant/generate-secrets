# Project Roadmap

A concise, living plan for upcoming releases. For detailed architecture and specs, see:
- docs/9-template-architecture-and-roadmap.md
- docs/8-supabase-env-import.md

---

## Phase 0 — MVP (Done)
Scope
- Minimal secret generator on the home page (username/password/JWT/etc.).
- Copy-to-clipboard and basic tooltips.

Acceptance (met)
- App loads fast, works offline-ish, and generates secrets locally.
- Copy all works; basic tests pass.

Artifacts
- Current home implementation and tests.

---

## Phase 1 — Foundation for Multiple Templates (Current)
Goal
- Restructure UI/architecture to support many .env templates cleanly and privately.

Key objectives
- Introduce a Template Registry and shared panels (import, summary/controls, parsed list, preview).
- Add a routes pattern: /templates/[id] (with friendly aliases like /supabase).
- Keep home page minimal; add a header nav and CTA to templates.
- Client-only GitHub URL import (blob→raw normalization), 256 KB size guard.
- i18n-friendly microcopy and accessibility baselines.
- Testing scaffolding for templates (unit/component/E2E).

Deliverables
- Core parser (lossless, preserves comments/order/CRLF) and renderer.
- Crypto-based generators (Web Crypto): bytes/hex/base64url/password/uuid/JWT HS256.
- Shared UI components wired to the registry.
- Basic nav (Home, Templates, Privacy) with active state.

Acceptance criteria
- Visiting /templates/[id] loads only the code for that template (no heavy JS on Home).
- Parser round-trips unchanged input; duplicate keys flagged; malformed lines preserved.
- URL import accepts GitHub blob/raw URLs; non-GitHub rejected with guidance; size limits enforced.
- Keyboard navigation and ARIA roles present; key flows test-covered.

Tracking
- Feature branch: feat/templates-foundation
- Release tag: v1.1.0

---

## Phase 2 — Supabase .env Import (Next)
Goal
- Implement the Supabase preset with drag/drop and GitHub URL import.

Spec
- See docs/8-supabase-env-import.md for full user stories, acceptance, wireframes, and tests.

Deliverables
- /templates/supabase page (alias /supabase), SEO metadata, and Beta badge.
- Known secret generation: POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY,
  DASHBOARD_PASSWORD, SECRET_KEY_BASE, VAULT_ENC_KEY, LOGFLARE_PUBLIC/PRIVATE, POOLER_TENANT_ID, SMTP_PASS (if present).
- Preserve order/comments; per-field re-roll; preview + copy/download.

Acceptance criteria
- Import success via drag-drop and GitHub URL (blob→raw rewrite).
- JWT keys verify (HS256) against generated JWT_SECRET with future exp.
- Overwrite toggle respected; unknown keys untouched; duplicates warned.
- Copy .env outputs exact preview; no proxying/network beyond the GitHub fetch.

Tracking
- Feature branch: feat/template-supabase
- Release tag: v1.2.0

---

## Later phases (Candidates)
- Next.js template (/templates/nextjs): NEXTAUTH_SECRET, JWT, etc.
- Docker generic (/templates/docker): common db/cache secrets.
- Prisma/Postgres (/templates/prisma): DATABASE_URL helpers.
- Firebase Admin (/templates/firebase): service account import → env.

---

## Notes
- Privacy-first: all processing client-side, no telemetry by default.
- Keep roadmap lightweight; update per release. Link related issues/PRs inline when created.
