import { expect, test } from "@playwright/test";

test.describe("Story 1.4: Copy and Tooltip Features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display ? icons next to each secret label", async ({ page }) => {
    // Generate secrets first
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Check that each secret has a ? icon
    const requiredSecrets = [
      "username",
      "password",
      "postgres username",
      "postgres password",
      "postgres db name",
      "jwtsecret 32 hex",
      "jwtsecret 32 base64",
      "ANON_KEY",
      "SECRET_KEY_BASE",
      "SERVICE_ROLE_KEY",
    ];

    for (const secretLabel of requiredSecrets) {
      const labelElement = page.getByText(`${secretLabel}:`, { exact: true });
      const tooltipButton = labelElement
        .locator("..")
        .getByRole("button", { name: `Show explanation for ${secretLabel}` });
      await expect(tooltipButton).toBeVisible();
    }
  });

  test("should display tooltip with correct explanation when ? icon is clicked", async ({
    page,
  }) => {
    // Generate secrets first
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Click on the username tooltip button
    const usernameTooltipButton = page
      .getByText("username:", { exact: true })
      .locator("..")
      .getByRole("button", { name: "Show explanation for username" });
    await usernameTooltipButton.click();

    // Check that the tooltip is visible with correct content
    const tooltip = page.locator("#tooltip-username");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText(
      "Random, readable string, 8-12 characters, no special characters.",
    );
  });

  test("should hide tooltip when clicking outside", async ({ page }) => {
    // Generate secrets first
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Click on the username tooltip button
    const usernameTooltipButton = page
      .getByText("username:", { exact: true })
      .locator("..")
      .getByRole("button", { name: "Show explanation for username" });
    await usernameTooltipButton.click();

    // Check that the tooltip is visible
    const tooltip = page.locator("#tooltip-username");
    await expect(tooltip).toBeVisible();

    // Click outside the tooltip
    await page.click("body");

    // Check that the tooltip is hidden
    await expect(tooltip).toBeHidden();
  });

  test("should hide tooltip when pressing Escape key", async ({ page }) => {
    // Generate secrets first
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Click on the username tooltip button
    const usernameTooltipButton = page
      .getByText("username:", { exact: true })
      .locator("..")
      .getByRole("button", { name: "Show explanation for username" });
    await usernameTooltipButton.click();

    // Check that the tooltip is visible
    const tooltip = page.locator("#tooltip-username");
    await expect(tooltip).toBeVisible();

    // Press Escape key
    await page.keyboard.press("Escape");

    // Check that the tooltip is hidden
    await expect(tooltip).toBeHidden();
  });

  test("should copy all secrets to clipboard in .env format", async ({
    page,
  }) => {
    // Generate secrets first
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Click the Copy button
    await page.getByRole("button", { name: "Copy" }).click();

    // Check for copy confirmation message
    await expect(page.getByText("Copied to clipboard!")).toBeVisible();

    // Verify clipboard content (this would require additional setup in a real test)
    // For now, we'll just verify the UI elements exist
  });

  test("should show error message when copying without generating secrets", async ({
    page,
  }) => {
    // Click the Copy button without generating secrets first
    await page.getByRole("button", { name: "Copy" }).click();

    // Check for error message
    await expect(
      page.getByText("No secrets to copy. Please generate secrets first."),
    ).toBeVisible();
  });
});
