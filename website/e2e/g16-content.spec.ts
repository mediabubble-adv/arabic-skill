import { test, expect } from "@playwright/test";

test.describe("G16 — frozen audit snapshot and footer SSOT", () => {
  test("about page shows G16 audit summary", async ({ page }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: /ملخص التدقيق \(G16 — frozen\)/ }),
    ).toBeVisible();
    await expect(page.getByText("Snapshot date: 2026-07-04")).toBeVisible();
    await expect(page.getByText("Overall: 17/18")).toBeVisible();
    await expect(page.getByText("Legacy register:")).toBeVisible();
    await expect(page.getByText("AI-likelihood:")).toBeVisible();
    await expect(page.getByText("Brand ledger:")).toBeVisible();
    for (const pageName of [
      "home",
      "install",
      "features",
      "commands",
      "tutorials",
      "examples",
      "about",
      "docs",
    ]) {
      await expect(page.getByRole("cell", { name: pageName })).toBeVisible();
    }
  });

  test("global footer matches website/content/footer.md fragments", async ({
    page,
  }) => {
    await page.goto("/install");
    const footer = page.locator("footer");
    await expect(footer.getByText("اتبنى بـ")).toBeVisible();
    await expect(footer.locator('code[dir="ltr"]')).toHaveText("/arabic");
    await expect(footer.getByRole("link", { name: "إزاي اتبنى؟" })).toHaveAttribute(
      "href",
      "/about",
    );
    await expect(footer.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
      "href",
      "https://github.com/mediabubble-adv/arabic-skill",
    );
    await expect(footer.getByRole("link", { name: "الوثائق" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });

  test("positioning lock مش مجرد ترجمة on home hero", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("مش مجرد ترجمة.")).toBeVisible();
  });
});
