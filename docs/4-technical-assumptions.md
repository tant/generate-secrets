# 4. Technical Assumptions

## Repository Structure
* **Choice:** Monorepo (Single Repository).
* **Rationale:** The project is small and self-contained, consisting of a single frontend application.

## Service Architecture
* **Choice:** Client-Side Application / Static Site.
* **Rationale:** Fully aligns with requirements. No server is needed, ensuring user privacy and zero operational cost.

## Testing Requirements
* **Choice:** Unit Tests and End-to-End (E2E) Tests using Playwright (headless mode).
* **Rationale:** Unit tests will ensure the generation logic is correct. Playwright will automate user interaction testing across multiple browsers (Chrome, Firefox, WebKit) to ensure consistent UI functionality. Playwright tests will cover all main user flows (generate, copy, tooltip, accessibility, etc.) and will be integrated into the CI/CD pipeline to ensure quality on every deployment.

## Additional Technical Assumptions and Requests
* **Language:** TypeScript.
* **Framework:** Astro.
* **UI Component & Icon Library:** daisyUI (for all UI components and icons, fully integrated with Tailwind CSS v4, no separate icon library needed).
* **Build Tool:** Astro (uses Vite internally).
* **Hosting:** Vercel.