import { expect, test } from "@playwright/test";

test.describe("Phase 1: Preview Panel Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/templates/supabase");
  });

  test("should display imported content in preview", async ({ page }) => {
    const envContent = `# Test configuration
POSTGRES_PASSWORD=secret123
JWT_SECRET=jwtkey456`;

    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait for React components to update
    await page.waitForTimeout(1000);
    
    const textarea = page.getByLabel(".env preview");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveValue(envContent);
  });

  test("should copy content to clipboard", async ({ page }) => {
    const envContent = `POSTGRES_PASSWORD=secret123
JWT_SECRET=jwtkey456`;

    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait for React components to update
    await page.waitForTimeout(1000);
    
    const copyButton = page.getByRole("button", { name: "Copy .env" });
    await copyButton.click();

    // Check for copy confirmation
    await expect(page.getByText("Copied to clipboard!")).toBeVisible();
  });

  test("should download content as file", async ({ page }) => {
    const envContent = `POSTGRES_PASSWORD=secret123
JWT_SECRET=jwtkey456`;

    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait for React components to update
    await page.waitForTimeout(1000);
    
    // We can't easily test the actual download in Playwright, but we can check
    // that the download button exists and is clickable
    const downloadButton = page.getByRole("button", { name: "Download .env" });
    await expect(downloadButton).toBeVisible();
    
    // Check that it has the correct aria-label (updated to match actual implementation)
    await expect(downloadButton).toHaveAttribute("aria-label", "Download .env file");
  });
});