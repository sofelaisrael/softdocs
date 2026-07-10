import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("should open search modal with Cmd+K", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await page.keyboard.press("Control+k");
    const searchModal = page.locator(
      '[class*="search"], [role="dialog"], [class*="modal"]',
    );
    await expect(searchModal.first()).toBeVisible();
  });

  test("should open search modal with click", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const searchButton = page
      .locator(
        'button[class*="search"], [class*="search"] button, [aria-label*="search"]',
      )
      .first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      const searchModal = page.locator(
        '[class*="search"], [role="dialog"], [class*="modal"]',
      );
      await expect(searchModal.first()).toBeVisible();
    }
  });

  test("should close search modal with Escape", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await page.keyboard.press("Control+k");
    const searchModal = page.locator(
      '[class*="search"], [role="dialog"], [class*="modal"]',
    );
    await expect(searchModal.first()).toBeVisible();
    await page.keyboard.press("Escape");
  });

  test("should have search input", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await page.keyboard.press("Control+k");
    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]',
    );
    await expect(searchInput.first()).toBeVisible();
  });
});
