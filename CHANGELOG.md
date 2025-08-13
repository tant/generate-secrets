# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

