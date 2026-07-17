import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

function loadPublicAppId(): string | undefined {
  for (const file of [".env.local", ".env"]) {
    const p = path.resolve(process.cwd(), file);
    if (fs.existsSync(p)) {
      const match = fs
        .readFileSync(p, "utf-8")
        .match(/NEXT_PUBLIC_ALGOLIA_APP_ID=(.*)/);
      if (match && match[1].trim()) return match[1].trim();
    }
  }
  return undefined;
}

test.describe("Search", () => {
  test("renders search trigger only when Algolia credentials are configured", async ({
    page,
  }) => {
    await page.goto("/docs/2.0/installation", { timeout: 60000 });

    const appId = loadPublicAppId();
    const searchTrigger = page.locator(".search-trigger");
    const count = await searchTrigger.count();

    if (appId) {
      // Credentials present -> search UI should be mounted.
      expect(count).toBe(1);
    } else {
      // No credentials -> Search component returns null.
      expect(count).toBe(0);
    }
  });
});
