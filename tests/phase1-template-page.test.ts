import { expect, test } from "@playwright/test";

test.describe("Phase 1: Template Page Basic Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/templates/supabase");
  });

  test("should display template page with correct title and description", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { name: "Supabase .env" })).toBeVisible();
    // Use a more specific selector to avoid conflicts
    await expect(page.locator("main p").first()).toContainText("Generate secure secrets for Supabase self-hosting.");
  });

  test("should have import panel elements", async ({ page }) => {
    // Check file input
    const fileInput = page.getByLabel("Import .env file");
    await expect(fileInput).toBeVisible();
    
    // Check URL input form
    const urlInput = page.getByLabel("GitHub .env URL");
    await expect(urlInput).toBeVisible();
  });

  test("should show privacy note", async ({ page }) => {
    const privacyNote = page.getByText("All processing is done in your browser. No data is uploaded.");
    await expect(privacyNote).toBeVisible();
  });
});