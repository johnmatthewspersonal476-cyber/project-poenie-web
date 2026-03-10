import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 1,
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:3459",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm start -p 3459",
    port: 3459,
    reuseExistingServer: true,
    timeout: 60000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 720 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 667 } } },
  ],
});
