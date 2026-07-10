import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("should not render search trigger without Algolia credentials", async ({
    page,
  }) => {
    await page.goto("/docs/2.0/installation", { timeout: 60000 });
    // Search component returns null when no appId is configured
    const searchTrigger = page.locator(".search-trigger");
    const count = await searchTrigger.count();
    expect(count).toBe(0);
  });
});
