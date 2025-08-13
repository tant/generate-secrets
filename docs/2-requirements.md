# 2. Requirements

## Functional Requirements
* **FR1:** The system must generate a set of values for a predefined list of labels upon a single user action (clicking "Generate").
* **FR2:** The list of generated labels must include: `username`, `password`, `postgres username`, `postgres password`, `postgres db name`, `jwtsecret 32 hex`, `jwtsecret 32 base64`, `ANON_KEY`, `SECRET_KEY_BASE`, and `SERVICE_ROLE_KEY`.
* **FR3:** The system must provide a single action (clicking "Copy") to copy all generated values to the user's clipboard.
* **FR4:** The system must display an explanation (tooltip/pop-up) about a label's properties when a user interacts with the `?` icon next to it.

* **FR5:** The user interface must be accessible (tab navigation, aria-labels for buttons, keyboard navigation for tooltips, etc.).
* **FR6:** The main page must include essential SEO metadata (title, description, Open Graph tags, etc.).
* **FR7:** Analytics (e.g., Google Analytics, Plausible, etc.) should be integrated to track basic usage (if required by the product owner).
* **FR8:** There must be a manual test checklist and automated test coverage for core features.

## Non-Functional Requirements
* **NFR1:** The application must be a single-page web application that operates entirely on the client-side.
* **NFR2:** The application must not have a backend server for its core functionality.
* **NFR3:** The application must not store, transmit, or process any user-generated data to ensure absolute privacy.
* **NFR4:** The user interface must be responsive and function correctly on both desktop and mobile web browsers.
* **NFR5:** The time from a user clicking "Generate" to the values being displayed must be less than 500ms.

* **NFR6:** The codebase must follow consistent style and quality standards (Prettier, ESLint configured and enforced).
* **NFR7:** The application must be compatible with major browsers (Chrome, Firefox, Safari).
* **NFR8:** The application must meet accessibility standards (WCAG AA compliance).
* **NFR9:** No secret values may be logged or stored in any way.
* **NFR10:** Documentation must be provided for setup, usage, and rollback procedures.