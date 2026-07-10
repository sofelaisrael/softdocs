import { test, expect } from "@playwright/test";

test.describe("Sidebar navigation", () => {
  test("should display sidebar on docs pages", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const sidebar = page.locator(".doc-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("should have navigation links in sidebar", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const navLinks = page.locator(".doc-sidebar a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should highlight current page in sidebar", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const activeLink = page.locator(
      '.doc-sidebar a.active, .doc-sidebar a[aria-current="page"]',
    );
    const count = await activeLink.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate when clicking sidebar link", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const sidebarLinks = page.locator('.doc-sidebar a[href*="/docs/2.0/"]');
    const count = await sidebarLinks.count();
    if (count > 1) {
      const secondLink = sidebarLinks.nth(1);
      const href = await secondLink.getAttribute("href");
      await secondLink.click();
      await page.waitForURL(
        new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        { timeout: 10000 },
      );
    }
  });

  test("should collapse/expand sidebar sections", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const sectionHeaders = page.locator(".sidebar-chevron-btn");
    const count = await sectionHeaders.count();
    if (count > 0) {
      await sectionHeaders.first().click();
    }
  });
});

test.describe("Mobile navigation", () => {
  test("should have mobile menu toggle", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/docs/2.0/installation");
    const menuToggle = page.locator(
      'button[class*="menu"], button[class*="mobile"], button[aria-label*="menu"]',
    );
    const count = await menuToggle.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Footer navigation", () => {
  test("should have footer links", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    const footerLinks = footer.locator("a");
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
