import { expect, test } from "@playwright/test";

test.describe("Phase 1: Parsed List Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/templates/supabase");
  });

  test("should display parsed keys with proper formatting", async ({ page }) => {
    const envContent = `# Database settings
POSTGRES_PASSWORD=supersecretpassword
# JWT configuration
JWT_SECRET=jwt_secret_value # inline comment
EMPTY_KEY=
SPECIAL_CHARS=!@#$%^&*()`;

    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait for React components to update
    await page.waitForTimeout(1000);

    // Check that the preview shows the content
    const textarea = page.getByLabel(".env preview");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveValue(envContent);
  });

  test("should preserve blank lines", async ({ page }) => {
    const envContent = `KEY1=value1

KEY2=value2`;

    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait for React components to update
    await page.waitForTimeout(1000);

    // The blank line should be preserved in the preview
    const textarea = page.getByLabel(".env preview");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveValue(envContent);
  });

  test("should handle malformed lines", async ({ page }) => {
    const envContent = `KEY1=value1
not_a_valid_line
KEY2=value2
=missing_key`;

    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait for React components to update
    await page.waitForTimeout(1000);

    // Malformed lines should still be preserved
    const textarea = page.getByLabel(".env preview");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveValue(envContent);
  });
});