import { expect, test } from "@playwright/test";

test.describe("Phase 1: Template Page Navigation", () => {
  test("should navigate to template page from home", async ({ page }) => {
    await page.goto("/");
    
    // Find and click the Templates link in the header
    const templatesLink = page.getByRole("link", { name: "Templates" });
    await expect(templatesLink).toBeVisible();
    await templatesLink.click();
    
    // Should be on the Supabase template page
    await expect(page).toHaveURL("/templates/supabase");
    await expect(page.getByRole("heading", { name: "Supabase .env" })).toBeVisible();
  });
});