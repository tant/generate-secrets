
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-08-13

### Added
- Foundation for multiple .env templates: new architecture supports many templates cleanly and privately
- Template Registry and shared UI panels (import, summary/controls, parsed list, preview)
- New routes: `/templates/[id]` with friendly aliases (e.g., `/supabase`)
- Minimal home page with header navigation and CTA to templates
- Client-only GitHub URL import (with blob→raw normalization), 256 KB size guard
- i18n-friendly microcopy and accessibility improvements
- Testing scaffolding for templates (unit, component, E2E)
- Core parser (lossless, preserves comments/order/CRLF) and renderer
- Crypto-based generators (Web Crypto): bytes/hex/base64url/password/uuid/JWT HS256
- Shared UI components wired to the registry
- Basic navigation (Home, Templates, Privacy) with active state

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- All secret generation and parsing remains client-side
- No sensitive data is logged or transmitted

---

## [0.1.0] - 2025-08-13

### Added
- MVP release of the Generate Secrets tool
- Client-side secret generation for developers
- Minimalist UI with Generate and Copy buttons
- Support for various secret types:
  - Username/password pairs
  - PostgreSQL credentials
  - JWT secrets (hex and base64)
  - Supabase-style keys (ANON_KEY, SERVICE_ROLE_KEY, SECRET_KEY_BASE)
- Copy to clipboard functionality for all secrets in `.env` format
- Tooltips explaining each secret type
- Fully responsive design with daisyUI components
- Unit tests with Vitest
- End-to-end tests with Playwright
- Deployment to Vercel

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- All secret generation happens client-side with no data storage
- No sensitive data is logged or transmitted

