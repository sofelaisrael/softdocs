import { test, expect } from "@playwright/test";

test.describe("Documentation pages", () => {
  test("should render the docs landing page", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should render a versioned doc page", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveURL(/\/docs\/2\.0\/installation/);
  });

  test("should show 404 for non-existent doc", async ({ page }) => {
    const response = await page.goto("/docs/2.0/non-existent-page");
    expect(response?.status()).toBe(404);
  });

  test("should redirect unversioned docs to default version", async ({
    page,
  }) => {
    await page.goto("/docs/installation");
    await expect(page).toHaveURL(/\/docs\/2\.0\/installation/);
  });

  test("should render doc content correctly", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const content = page.locator('article, main, [class*="content"]');
    await expect(content).toBeVisible();
  });

  test("should have working sidebar navigation", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const sidebar = page.locator('nav, [class*="sidebar"]');
    await expect(sidebar).toBeVisible();
  });

  test("should render code blocks with syntax highlighting", async ({
    page,
  }) => {
    await page.goto("/docs/2.0/installation");
    const codeBlocks = page.locator("pre, code");
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Version switching", () => {
  test("should have version picker", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const versionPicker = page.locator(
      '[class*="version"], select, [data-version]',
    );
    await expect(versionPicker.first()).toBeVisible();
  });

  test("should navigate between versions", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await page.click('[class*="version"]');
    await page.click("text=3.0");
    await expect(page).toHaveURL(/\/docs\/3\.0\//);
  });
});

test.describe("Navigation", () => {
  test("should have prev/next links", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const nav = page.locator(
      '[class*="adjacent"], [class*="prev"], [class*="next"], nav[class*="doc"]',
    );
    const count = await nav.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to next doc via link", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const nextLink = page.locator('a[href*="/docs/2.0/"]').first();
    if (await nextLink.isVisible()) {
      await nextLink.click();
      await expect(page).toHaveURL(/\/docs\/2\.0\//);
    }
  });
});

test.describe("Dark mode", () => {
  test("should have theme toggle", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const themeToggle = page.locator(
      '[class*="theme"], button[aria-label*="theme"], button[aria-label*="dark"]',
    );
    const count = await themeToggle.count();
    expect(count).toBeGreaterThan(0);
  });
});
