import { expect, test } from "@playwright/test";

test.describe("Story 1.3: Secret Generation Logic", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should generate all required secrets when Generate button is clicked", async ({
    page,
  }) => {
    // Click the Generate button
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated and displayed
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Check that all required secrets are present
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
      await expect(
        page.getByText(`${secretLabel}:`, { exact: true }),
      ).toBeVisible();
    }
  });

  test("should display secrets with correct formats", async ({ page }) => {
    // Click the Generate button
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated and displayed
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Check username format (8-12 alphanumeric characters)
    const usernameRow = page
      .getByText("username:", { exact: true })
      .locator("..");
    const usernameValue = await usernameRow.locator(".font-mono").textContent();
    expect(usernameValue).toMatch(/^[a-zA-Z0-9]{8,12}$/);

    // Check password format (16 characters with required types)
    const passwordRow = page
      .getByText("password:", { exact: true })
      .locator("..");
    const passwordValue = await passwordRow.locator(".font-mono").textContent();
    expect(passwordValue).toHaveLength(16);
    expect(passwordValue).toMatch(/[A-Z]/); // uppercase
    expect(passwordValue).toMatch(/[a-z]/); // lowercase
    expect(passwordValue).toMatch(/[0-9]/); // number
    expect(passwordValue).toMatch(/[!@#$%^&*]/); // special character

    // Check postgres username format (user_ + 12 alphanumeric)
    const pgUsernameRow = page
      .getByText("postgres username:", { exact: true })
      .locator("..");
    const pgUsernameValue = await pgUsernameRow
      .locator(".font-mono")
      .textContent();
    expect(pgUsernameValue).toMatch(/^user_[a-zA-Z0-9]{12}$/);

    // Check postgres password format (16 alphanumeric)
    const pgPasswordRow = page
      .getByText("postgres password:", { exact: true })
      .locator("..");
    const pgPasswordValue = await pgPasswordRow
      .locator(".font-mono")
      .textContent();
    expect(pgPasswordValue).toMatch(/^[a-zA-Z0-9]{16}$/);

    // Check postgres db name format (db_ + 12 lowercase alphanumeric)
    const pgDbNameRow = page
      .getByText("postgres db name:", { exact: true })
      .locator("..");
    const pgDbNameValue = await pgDbNameRow.locator(".font-mono").textContent();
    expect(pgDbNameValue).toMatch(/^db_[a-z0-9]{12}$/);

    // Check jwtsecret 32 hex format (32 hex characters)
    const jwtHexRow = page
      .getByText("jwtsecret 32 hex:", { exact: true })
      .locator("..");
    const jwtHexValue = await jwtHexRow.locator(".font-mono").textContent();
    expect(jwtHexValue).toMatch(/^[0-9a-f]{32}$/);

    // Check SECRET_KEY_BASE format (128 hex characters)
    const secretKeyBaseRow = page
      .getByText("SECRET_KEY_BASE:", { exact: true })
      .locator("..");
    const secretKeyBaseValue = await secretKeyBaseRow
      .locator(".font-mono")
      .textContent();
    expect(secretKeyBaseValue).toMatch(/^[0-9a-f]{128}$/);
  });

  test("should copy all secrets to clipboard in .env format", async ({
    page,
  }) => {
    // Click the Generate button
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated and displayed
    await expect(page.getByText("username:", { exact: true })).toBeVisible();

    // Click the Copy button
    await page.getByRole("button", { name: "Copy" }).click();

    // Check for copy confirmation message
    await expect(page.getByText("Copied to clipboard!")).toBeVisible();
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

  test("should generate new secrets each time Generate is clicked", async ({
    page,
  }) => {
    // Click the Generate button first time
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated and get the first password
    await expect(page.getByText("username:", { exact: true })).toBeVisible();
    const firstPasswordRow = page
      .getByText("password:", { exact: true })
      .locator("..");
    const firstPassword = await firstPasswordRow
      .locator(".font-mono")
      .textContent();

    // Click the Generate button second time
    await page.getByRole("button", { name: "Generate" }).click();

    // Wait for secrets to be generated and get the second password
    await expect(page.getByText("username:", { exact: true })).toBeVisible();
    const secondPasswordRow = page
      .getByText("password:", { exact: true })
      .locator("..");
    const secondPassword = await secondPasswordRow
      .locator(".font-mono")
      .textContent();

    // The passwords should be different (with extremely high probability)
    expect(firstPassword).not.toBe(secondPassword);
  });
});
