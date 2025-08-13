import { expect, test } from "@playwright/test";

test.describe("Story 1.2: Minimalist User Interface", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have the correct page title and SEO metadata", async ({
    page,
  }) => {
    // Check page title
    await expect(page).toHaveTitle(
      "Generate Secrets - Instant Secure Credential Generator",
    );

    // Check meta description
    const description = await page.getAttribute(
      'meta[name="description"]',
      "content",
    );
    expect(description).toContain(
      "blazing fast, minimalist, and privacy-first web tool",
    );

    // Check Open Graph metadata
    const ogTitle = await page.getAttribute(
      'meta[property="og:title"]',
      "content",
    );
    expect(ogTitle).toBe(
      "Generate Secrets - Instant Secure Credential Generator",
    );

    const ogDescription = await page.getAttribute(
      'meta[property="og:description"]',
      "content",
    );
    expect(ogDescription).toContain(
      "blazing fast, minimalist, and privacy-first web tool",
    );
  });

  test("should display the main heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Secret Generation Tool",
    });
    await expect(heading).toBeVisible();
  });

  test("should have Generate and Copy buttons", async ({ page }) => {
    // Check Generate button
    const generateButton = page.getByRole("button", { name: "Generate" });
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toHaveAttribute(
      "aria-label",
      "Generate new secrets",
    );

    // Check Copy button
    const copyButton = page.getByRole("button", { name: "Copy" });
    await expect(copyButton).toBeVisible();
    await expect(copyButton).toHaveAttribute(
      "aria-label",
      "Copy all secrets to clipboard",
    );
  });

  test("should have a placeholder area for secrets", async ({ page }) => {
    const secretsHeading = page.getByRole("heading", {
      name: "Generated Secrets",
    });
    await expect(secretsHeading).toBeVisible();

    const placeholderText = page.getByText(
      'Click "Generate" to create your secure credentials',
    );
    await expect(placeholderText).toBeVisible();
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    // Check that the page has a main landmark
    const main = page.getByRole("main");
    await expect(main).toBeVisible();

    // Check that buttons are accessible
    const generateButton = page.getByRole("button", { name: "Generate" });
    await expect(generateButton).toBeVisible();

    const copyButton = page.getByRole("button", { name: "Copy" });
    await expect(copyButton).toBeVisible();
  });

  test("should have error message placeholder (hidden by default)", async ({
    page,
  }) => {
    // Check that the error message element exists in the DOM
    const errorMessage = page.getByText("Error: Something went wrong");
    await expect(errorMessage).toBeAttached(); // Element exists in DOM

    // Check that it's hidden by default (using the 'hidden' class)
    const errorContainer = page.locator('[role="alert"]').first();
    const classes = await errorContainer.getAttribute("class");
    expect(classes).toContain("hidden");
  });

  test("should be responsive", async ({ page }) => {
    // Test on desktop size
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check that the main container is properly sized
    const mainContainer = page.locator("main > div").first();
    await expect(mainContainer).toBeVisible();

    // Test on mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that the layout still works on mobile
    await expect(mainContainer).toBeVisible();
  });
});
