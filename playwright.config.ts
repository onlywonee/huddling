import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  use: { channel: "chrome", headless: true },
  webServer: [
    {
      command: "npm run dev -- --hostname 127.0.0.1 --port 3013",
      url: "http://127.0.0.1:3013",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run storybook -- --host 127.0.0.1 --ci --quiet",
      url: "http://127.0.0.1:6006",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
