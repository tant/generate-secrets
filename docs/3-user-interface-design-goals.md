# 3. User Interface Design Goals

## Overall UX Vision
Minimalist, intuitive, and extremely fast. Users should not need to learn how to use it. Everything must be clear at first glance. The experience is focused on a single action: generate and copy.

## Key Interaction Paradigms
The system operates on a "click-and-get" model. There are no forms and no input fields. The primary interactions are buttons and explanatory tooltips when needed.

## Core Screens and Views
There is only one single screen. There are no other pages or views. This screen contains all necessary elements:
* "Generate" and "Copy" buttons.
* A list of generated labels and values.
* `?` icons for displaying explanations.

## Accessibility
* **Goal:** WCAG AA. Ensure good color contrast, full keyboard usability, and screen reader-accessible tooltips.

## Branding
* **Requirements:** The interface uses daisyUI for all UI components and icons, ensuring a clean, modern, and consistent look. Theme is easily customizable (default: cyberpunk). Color palette and accessibility are handled by daisyUI presets.

## Target Device and Platforms
* **Goal:** Web Responsive. The interface must display well on all screen sizes, from mobile phones to desktops.