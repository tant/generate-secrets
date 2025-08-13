# Project Roadmap

A concise, living plan for upcoming releases. For detailed architecture and specs, see:
- docs/9-template-architecture-and-roadmap.md
- docs/8-supabase-env-import.md



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

## Phase 2 — Supabase .env Import & Preset

Goal
- Support importing and generating secrets for Supabase projects via the official `.env.example` file, with drag-and-drop or GitHub URL input.
- https://github.com/supabase/supabase/blob/master/docker/.env.example

Description
- Allow users to import Supabase's `.env.example` (drag & drop or paste GitHub URL).
- Automatically detect, generate, and validate key secret variables (POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY, DASHBOARD_PASSWORD, SECRET_KEY_BASE, VAULT_ENC_KEY, LOGFLARE_PUBLIC_ACCESS_TOKEN, LOGFLARE_PRIVATE_ACCESS_TOKEN, POOLER_TENANT_ID, SMTP_PASS, etc.).
- Preserve order, comments, and unknown variables.
- Enable per-field re-roll, preview, copy, and download of the result.
- Warn about duplicate or weak variables.
- No data is sent externally except for fetching the file from GitHub (if used).

Deliverables
- `/templates/supabase` page (alias `/supabase`), with SEO metadata and Beta badge.
- UI for importing `.env` (drag-and-drop or URL), displaying variable list and status (generated/valid/missing).
- Strong secret generation logic for required fields (using Web Crypto).
- JWT_SECRET validation (length, HS256 verifiable).
- Option to overwrite or keep existing variables.
- Export `.env` file with correct formatting, preserving comments, order, and blank lines.
- Warnings and guidance if the file is malformed or missing critical variables.
- E2E tests: import, generate, copy, download, and validation.

Acceptance criteria
- Successful import via drag-and-drop or GitHub URL (with blob→raw rewrite).
- Secret variables are generated correctly and JWT can be verified.
- Unknown variables are untouched; duplicates are warned.
- Copy/download output matches preview exactly, with no data leaks.
- User-friendly UI, keyboard accessible, ARIA roles, and good test coverage.

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
