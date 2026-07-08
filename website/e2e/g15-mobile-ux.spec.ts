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

  test("print install section on /install is visible", async ({ page }) => {
    await page.goto("/install");
    await expect(
      page.getByRole("heading", { name: "أدوات بدليل يدوي" }),
    ).toBeVisible();
    await expect(page.getByText("ChatGPT")).toBeVisible();
    await expect(page.getByText("install --target chatgpt")).toBeVisible();
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
    await page.waitForLoadState("networkidle");

    const tablist = page.getByTestId("before-after-tablist");
    const mobileText = page.getByTestId("before-after-tablist-panel");

    await expect(tablist).toBeVisible();
    await expect(tablist.getByRole("tab", { name: /بعد/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(mobileText).toHaveText(/عايز تلعب جيم/);
    await tablist.getByRole("tab", { name: /قبل/ }).click();
    await expect(mobileText).toHaveText(/اكتشف تطبيقنا/);
    await tablist.getByRole("tab", { name: /بعد/ }).click();
    await expect(mobileText).toHaveText(/عايز تلعب جيم/);
  });

  test("sticky install bar on / appears after mobile scroll", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.removeItem("install-bar-dismissed");
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const stickyBar = page.getByTestId("sticky-install-bar");
    await expect(stickyBar).toHaveCount(0);
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect(stickyBar).toBeVisible({ timeout: 5000 });
    const installLink = stickyBar.getByTestId("sticky-install-link");
    await expect(installLink).toBeVisible();
    await expect(installLink).toHaveAttribute("href", /\/install\/?$/);
    await expect(
      stickyBar.getByRole("button", { name: /انسخ\s+أمر\s+التثبيت/ }),
    ).toBeVisible();
  });
});
