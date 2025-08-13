
# Generate Secrets

A blazing fast, minimalist, and privacy-first web tool to instantly generate secure credentials for developers. Built with Astro, React, Tailwind CSS v4, and daisyUI.

---

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
<!-- ![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen) -->

**Live Demo:** [https://generate-secrets.vercel.app](https://generate-secrets.vercel.app) <!-- Update with actual URL if available -->

---

## ✨ Features

- **Instant secret generation**: One click to generate all required secrets for your stack.
- **Modern UI**: Built entirely with daisyUI (UI components & icons, themeable, accessible).
- **Fully client-side**: No backend, no data storage, absolute privacy.
- **Copy to clipboard**: Copy all secrets in `.env` format with a single click.
- **Accessible & responsive**: WCAG AA, works on all devices and browsers.
- **Tested & reliable**: Unit tests (Vitest), E2E tests (Playwright), CI-ready.
- **Open source & MIT licensed**.

---

## 🚀 Quick Start

```sh
pnpm install
pnpm dev
```

Visit [http://localhost:4321](http://localhost:4321) to use the tool.

---

## 🛠️ Tech Stack

- **Astro** (with React integration)
- **TypeScript**
- **Tailwind CSS v4** + **daisyUI** (UI + icon library, theme: cyberpunk)
- **Biome** (all-in-one lint & format, replaces Prettier/ESLint)
- **Vitest** (unit test), **Playwright** (E2E test)
- **Vercel** (deployment)

---

## 🔑 Secret Specification

| Label                | Specification                                                        |
|----------------------|-----------------------------------------------------------------------|
| `username`           | Random, readable string, 8-12 characters, no special characters       |
| `password`           | ≥16 chars, includes upper/lowercase, numbers, special chars           |
| `postgres username`  | `user_` + 12 random alphanumeric                                     |
| `postgres password`  | ≥16 alphanumeric chars                                               |
| `postgres db name`   | `db_` + 12 random lowercase alphanumeric                             |
| `jwtsecret 32 hex`   | 32-char random hex string                                            |
| `jwtsecret 32 base64`| 32-char random, URL-safe base64 string                               |
| `ANON_KEY`           | Long, base64 string (JWT-like)                                       |
| `SECRET_KEY_BASE`    | 128-char random hex string                                           |
| `SERVICE_ROLE_KEY`   | Long, base64 string (JWT-like)                                       |

See [docs/7-secret-specification-table.md](docs/7-secret-specification-table.md) for full details.

---

## 📦 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── docs/
│   └── [project documentation...]
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── ...
```

---

## 🧑‍💻 Development

- **Code style & quality:** Managed by Biome (`pnpm biome check .`)
- **UI components & icons:** All from daisyUI, themeable (default: cyberpunk)
- **Testing:** Run `pnpm test` (Vitest) and E2E with Playwright
- **Deployment:** Vercel (auto-deploy on main branch)

---

## 🧪 Testing

- **Unit tests:**
	- Run: `pnpm test`
	- Framework: Vitest
- **E2E tests:**
	- Run: `pnpm playwright test`
	- Framework: Playwright
- **Lint & Format:**
	- Run: `pnpm biome check .` (check)
	- Run: `pnpm biome format .` (auto-format)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo and create your branch from `main`.
2. Ensure code style passes: `pnpm biome check .`
3. Add/Update tests if needed.
4. Describe your changes clearly in the PR.

---

---

## � Documentation

- [docs/1-goals-and-background-context.md](docs/1-goals-and-background-context.md)
- [docs/2-requirements.md](docs/2-requirements.md)
- [docs/3-user-interface-design-goals.md](docs/3-user-interface-design-goals.md)
- [docs/4-technical-assumptions.md](docs/4-technical-assumptions.md)
- [docs/5-epic-list.md](docs/5-epic-list.md)
- [docs/6-tests.md](docs/6-tests.md)
- [docs/7-secret-specification-table.md](docs/7-secret-specification-table.md)

---

## 👤 Author

Tan Tran  
[me@tantran.dev](mailto:me@tantran.dev)

---

## 📝 License

MIT License © 2025 Tan Tran
