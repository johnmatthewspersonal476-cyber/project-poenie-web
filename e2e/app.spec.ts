import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("loads with hero title", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Project Poenie");
  });

  test("displays stat cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("63")).toBeVisible();
    await expect(page.getByText("95,000+")).toBeVisible();
    await expect(page.getByText("64,292")).toBeVisible();
    await expect(page.getByText("9+")).toBeVisible();
  });

  test("shows courts section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Courts Covered")).toBeVisible();
    await expect(page.getByText("Constitutional Court").first()).toBeVisible();
  });

  test("search form navigates to search page", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search South African law").fill("equality");
    await page.getByRole("button", { name: /search/i }).click();
    await expect(page).toHaveURL(/\/search\?q=equality/);
  });
});

test.describe("Search Page", () => {
  test("loads with heading and input", async ({ page }) => {
    await page.goto("/search");
    await expect(page.getByText("Legal Search")).toBeVisible();
    await expect(page.getByPlaceholder(/Search judgments/)).toBeVisible();
  });

  test("has filter dropdowns", async ({ page }) => {
    await page.goto("/search");
    await expect(page.locator("select").first()).toBeVisible();
  });

  test("shows empty state text", async ({ page }) => {
    await page.goto("/search");
    await expect(page.getByText("Enter a query to search South African legal documents")).toBeVisible();
  });

  test("search with query parameter loads", async ({ page }) => {
    const response = await page.goto("/search?q=test");
    expect(response?.status()).toBeLessThan(500);
  });
});

test.describe("Browse Page", () => {
  test("loads with tabs", async ({ page }) => {
    await page.goto("/browse");
    await expect(page.getByText("Browse the Corpus")).toBeVisible();
    await expect(page.getByRole("tab", { name: /court/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /topic/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /year/i })).toBeVisible();
  });

  test("court tab shows courts", async ({ page }) => {
    await page.goto("/browse");
    await expect(page.getByText("Constitutional Court").first()).toBeVisible();
    await expect(page.getByText("Supreme Court of Appeal").first()).toBeVisible();
  });

  test("topic tab shows topics", async ({ page }) => {
    await page.goto("/browse");
    await page.getByRole("tab", { name: /topic/i }).click();
    await expect(page.getByText("Constitutional Rights")).toBeVisible();
  });

  test("year tab shows years", async ({ page }) => {
    await page.goto("/browse");
    await page.getByRole("tab", { name: /year/i }).click();
    const body = await page.textContent("body");
    expect(body).toContain("2024");
    expect(body).toContain("1995");
  });
});

test.describe("Corpus Page", () => {
  test("displays overview and sources", async ({ page }) => {
    await page.goto("/corpus");
    await expect(page.getByText("Corpus Overview")).toBeVisible();
    await expect(page.getByText("Total Documents")).toBeVisible();
  });

  test("shows data sources", async ({ page }) => {
    await page.goto("/corpus");
    const body = await page.textContent("body");
    expect(body).toContain("SAFLII");
    expect(body).toContain("Government Gazettes");
    expect(body).toContain("Overall Ingestion Progress");
  });
});

test.describe("About Page", () => {
  test("loads with content", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("About Project Poenie")).toBeVisible();
    const body = await page.textContent("body");
    expect(body).toContain("Pipeline");
    expect(body).toContain("Qdrant");
    expect(body).toContain("FastAPI");
    expect(body).toContain("Scrape");
  });
});

test.describe("No 500 Errors", () => {
  for (const path of ["/", "/search", "/browse", "/corpus", "/about"]) {
    test(`${path} returns no server error`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(500);
    });
  }
});

test.describe("Navigation", () => {
  test("nav links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Search" }).first().click();
    await expect(page).toHaveURL(/\/search/);
    await page.getByRole("link", { name: "Browse" }).first().click();
    await expect(page).toHaveURL(/\/browse/);
  });
});
