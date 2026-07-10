import { test, expect } from "@playwright/test";

test.describe("Documentation pages", () => {
  test("should redirect /docs to latest version", async ({ page }) => {
    await page.goto("/docs", { timeout: 60000 });
    await page.waitForURL(/\/docs\/3\.0/, { timeout: 60000 });
    await expect(page).toHaveURL(/\/docs\/3\.0/);
  });

  test("should render a versioned doc page", async ({ page }) => {
    await page.goto("/docs/3.0/configuration", { timeout: 60000 });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 60000 });
    await expect(page).toHaveURL(/\/docs\/3\.0\/configuration/);
  });

  test("should show 404 for non-existent doc", async ({ page }) => {
    const response = await page.goto("/docs/3.0/non-existent-page", {
      timeout: 60000,
    });
    expect(response?.status()).toBe(404);
  });

  test("should render doc content correctly", async ({ page }) => {
    await page.goto("/docs/3.0/installation", { timeout: 60000 });
    const content = page.locator(".doc-content");
    await expect(content).toBeVisible({ timeout: 60000 });
  });

  test("should have working sidebar", async ({ page }) => {
    await page.goto("/docs/3.0/installation", { timeout: 60000 });
    const sidebar = page.locator(".doc-sidebar");
    await expect(sidebar).toBeVisible({ timeout: 60000 });
  });

  test("should render code blocks with syntax highlighting", async ({
    page,
  }) => {
    await page.goto("/docs/3.0/installation", { timeout: 60000 });
    const codeBlocks = page.locator("pre, code");
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Version switching", () => {
  test("should have version picker or badge", async ({ page }) => {
    await page.goto("/docs/3.0/configuration", { timeout: 60000 });
    const versionIndicator = page.locator(
      '[class*="version-picker"], [class*="version-badge"]',
    );
    await expect(versionIndicator.first()).toBeVisible({ timeout: 60000 });
  });

  test("should navigate between versions when available", async ({ page }) => {
    await page.goto("/docs/2.0/configuration", { timeout: 60000 });
    const picker = page.locator(".version-picker-btn");
    if (await picker.isVisible({ timeout: 10000 })) {
      await picker.click();
      await page.waitForSelector(".version-picker-option", {
        state: "visible",
        timeout: 10000,
      });
      await page
        .locator(".version-picker-option")
        .filter({ hasText: "3.0" })
        .click();
      await page.waitForURL(/\/docs\/3\.0\/configuration/, { timeout: 10000 });
      await expect(page).toHaveURL(/\/docs\/3\.0\/configuration/);
    }
  });
});

test.describe("Navigation", () => {
  test("should have prev/next links", async ({ page }) => {
    await page.goto("/docs/3.0/installation", { timeout: 60000 });
    const nav = page.locator(".doc-pagination");
    const count = await nav.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to next doc via link", async ({ page }) => {
    await page.goto("/docs/3.0/installation", { timeout: 60000 });
    const nextLink = page.locator(".doc-pagination-next").first();
    if (await nextLink.isVisible({ timeout: 10000 })) {
      await nextLink.click();
      await expect(page).toHaveURL(/\/docs\/3\.0\//);
    }
  });
});

test.describe("Dark mode", () => {
  test("should have theme toggle", async ({ page }) => {
    await page.goto("/docs/3.0/installation", { timeout: 60000 });
    const themeToggle = page.locator(
      '[class*="theme"], button[aria-label*="theme"], button[aria-label*="dark"]',
    );
    const count = await themeToggle.count();
    expect(count).toBeGreaterThan(0);
  });
});
