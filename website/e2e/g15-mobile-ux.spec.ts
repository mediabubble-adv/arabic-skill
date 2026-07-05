import { test, expect } from "@playwright/test";

test.describe("G15 — mobile interactive components (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test("copy-to-clipboard on /install shows تم النسخ", async ({ page }) => {
    await page.goto("/install");
    const copyButton = page.getByRole("button", { name: "نسخ" }).first();
    await copyButton.click();
    await expect(copyButton).toHaveText("تم النسخ");
  });

  test("tool tabs on /install switch commands", async ({ page }) => {
    await page.goto("/install");
    const toolsSection = page.locator("section").filter({
      has: page.getByRole("heading", { name: "أدوات التثبيت" }),
    });
    await expect(toolsSection.getByRole("tablist")).toBeVisible();
    const commandBlock = toolsSection.locator("pre");
    await expect(commandBlock).toContainText("cursor");
    await toolsSection.getByRole("tab", { name: "Claude" }).click();
    await expect(commandBlock).toContainText("claude");
    await toolsSection.getByRole("tab", { name: "Codex" }).click();
    await expect(commandBlock).toContainText("codex");
  });

  test("FAQ accordion on /install expands and collapses", async ({ page }) => {
    await page.goto("/install");
    const question = page.getByRole("button", {
      name: "هل المهارة مجانية؟",
    });
    const answer = page.getByText("آه — مفتوحة المصدر على GitHub");
    await expect(answer).toBeVisible();
    await question.click();
    await expect(answer).not.toBeVisible();
    await question.click();
    await expect(answer).toBeVisible();
  });

  test("before/after toggle on /examples", async ({ page }) => {
    await page.goto("/examples");
    const card = page.locator(".card").first();
    await expect(card.getByText(/اكتشف تطبيقنا/)).toBeVisible();
    await card.getByRole("button", { name: "بعد" }).click();
    await expect(card.getByText(/عايز تلعب جيم/)).toBeVisible();
    await card.getByRole("button", { name: "قبل" }).click();
    await expect(card.getByText(/اكتشف تطبيقنا/)).toBeVisible();
  });

  test("sticky install bar on / appears after mobile scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("ثبّت في دقيقة")).toHaveCount(0);
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    const stickyBar = page.locator(".fixed.bottom-0");
    await expect(stickyBar.getByText("ثبّت في دقيقة")).toBeVisible();
    await expect(
      stickyBar.getByRole("link", { name: "ثبّت المهارة" }),
    ).toHaveAttribute("href", "/install");
  });
});
