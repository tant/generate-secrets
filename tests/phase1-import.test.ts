import { expect, test } from "@playwright/test";

test.describe("Phase 1: Import Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/templates/supabase");
  });

  test("should import .env file via file input", async ({ page }) => {
    const envContent = `# Database Configuration
POSTGRES_PASSWORD=supersecretpassword123
JWT_SECRET=jwt_secret_key_here
ANON_KEY=anon_key_value
# End of config`;

    // Create a temporary file and upload it
    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(envContent)
    });

    // Wait a bit for the React components to update
    await page.waitForTimeout(1000);
    
    // Check that the preview shows the content
    const textarea = page.getByLabel(".env preview");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveValue(envContent);
  });

  test("should show error for oversized file", async ({ page }) => {
    // Create a file that's too large (over 256KB)
    const largeContent = "A".repeat(300 * 1024); // 300KB
    
    await page.setInputFiles('input[type="file"]', {
      name: '.env.example',
      mimeType: 'text/plain',
      buffer: Buffer.from(largeContent)
    });
    
    // Wait for error to appear
    await page.waitForTimeout(1000);
    
    // Check for error message
    await expect(page.getByText("File is too large")).toBeVisible();
  });
});