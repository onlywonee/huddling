import { expect, test } from "@playwright/test";

test("375px 초기 화면이 가로로 넘치지 않는다", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://127.0.0.1:3013");
  await expect(page.locator("main")).toBeVisible();
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
});

test("Storybook 버튼과 밝은 모드 토큰이 실제 표시된다", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("http://127.0.0.1:6006/iframe.html?id=setup-button--default&viewMode=story");
  const button = page.getByRole("button", { name: "확인", exact: true });
  await expect(button).toBeVisible();
  await expect(page.locator("#storybook-root")).toHaveAttribute("data-play-verified", "true");
  await expect(button).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(button).toHaveCSS("color", "rgb(23, 23, 23)");
});

test("Storybook 비활성 버튼과 어두운 모드 토큰이 실제 표시된다", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("http://127.0.0.1:6006/iframe.html?id=setup-button--disabled&viewMode=story");
  const button = page.getByRole("button", { name: "확인", exact: true });
  await expect(button).toBeDisabled();
  await expect(page.locator("#storybook-root")).toHaveAttribute("data-play-verified", "true");
  await expect(button).toHaveCSS("background-color", "rgb(10, 10, 10)");
  await expect(button).toHaveCSS("color", "rgb(237, 237, 237)");
});
