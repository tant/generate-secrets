# Phase 2 — Supabase .env Import & Preset: Product Requirements Document (PRD)

## 1. Overview
This phase introduces a Supabase-specific template that allows users to import, generate, and manage secrets for Supabase projects using the official `.env.example` file. The goal is to streamline onboarding and secret management for Supabase self-hosters and teams.

## 2. Goals
- Support importing and generating secrets for Supabase projects via the official `.env.example` file, with drag-and-drop or GitHub URL input.
- Ensure a secure, user-friendly, and privacy-first workflow for handling environment variables.

## 3. User Stories
- As a user, I want to import a Supabase `.env.example` file by drag-and-drop or pasting a GitHub URL, so I can quickly set up my environment.
- As a user, I want the app to automatically detect, generate, and validate all key secret variables required by Supabase.
- As a user, I want to preview, re-roll, copy, and download the generated `.env` file, preserving comments and order.
- As a user, I want to be warned about duplicate or weak variables, and receive guidance if the file is malformed or missing critical variables.
- As a user, I want to keep unknown variables untouched and have the option to overwrite or keep existing values.

## 4. Functional Requirements
- Import `.env.example` via drag-and-drop or GitHub URL (with blob→raw rewrite).
- Parse and display all variables, preserving order, comments, and unknowns.
- Automatically generate strong secrets for key variables:
  - POSTGRES_PASSWORD
  - JWT_SECRET (must be at least 32 chars, HS256 verifiable)
  - ANON_KEY
  - SERVICE_ROLE_KEY
  - DASHBOARD_PASSWORD
  - SECRET_KEY_BASE
  - VAULT_ENC_KEY
  - LOGFLARE_PUBLIC_ACCESS_TOKEN
  - LOGFLARE_PRIVATE_ACCESS_TOKEN
  - POOLER_TENANT_ID
  - SMTP_PASS (if present)
- Allow per-field re-roll for secrets.
- Show status for each variable (generated/valid/missing/weak/duplicate).
  - **Weak Variable Criteria:** Define specific criteria for "weakness" (e.g., password length, entropy, common patterns, JWT_SECRET length/complexity).
- Option to overwrite or keep existing values.
- Export `.env` file with correct formatting, preserving comments, order, and blank lines.
- Copy/download output matches preview exactly.
- No data is sent externally except for fetching the file from GitHub.
- UI must be accessible (keyboard, ARIA roles).
- **Error Handling & User Guidance:** Provide clear, actionable error messages and guidance for malformed input files, missing critical Supabase variables, or other import failures. This should leverage the error handling foundation from Phase 1.

## 5. UI/UX Considerations
- **Variable Status Display:** Clearly indicate the status of each variable (generated, valid, missing, weak, duplicate) using visual cues (e.g., color coding, icons, badges).
- **Warning & Guidance Presentation:** Warnings for weak variables, duplicates, or malformed files should be prominent but non-intrusive, providing clear guidance to the user.
- **Consistency with Phase 1:** Maintain the established UI/UX patterns and component styles from Phase 1 (e.g., shared panels, tooltips, badges) to ensure a cohesive user experience.

## 6. Non-Functional Requirements
- All processing is client-side; no telemetry or data sent to third parties.
- Fast, responsive UI with clear feedback for all actions.
- Comprehensive E2E and unit tests for import, generation, copy, download, and validation flows.

## 7. Acceptance Criteria
- Successful import via drag-and-drop or GitHub URL (with blob→raw rewrite).
- All key secret variables are generated and validated correctly.
- JWT_SECRET is at least 32 chars and can be used for HS256 verification.
- Unknown variables are untouched; duplicates are warned.
- Copy/download output matches preview exactly, with no data leaks.
- User-friendly UI, keyboard accessible, ARIA roles, and good test coverage.

## 8. Deliverables
- `/templates/supabase` page (alias `/supabase`), with SEO metadata and Beta badge.
- UI for importing `.env`, displaying variable list and status.
- Secret generation logic for required fields (Web Crypto).
- Export, copy, and download features.
- Warnings and guidance for malformed or incomplete files.
- E2E and unit tests.

## 9. Out of Scope
- Support for non-Supabase templates in this phase.
- Server-side processing or storage of secrets.

## 10. References
- [Supabase .env.example](https://github.com/supabase/supabase/blob/master/docker/.env.example)
- [Phase 2 in ROADMAP.md](../ROADMAP.md)
