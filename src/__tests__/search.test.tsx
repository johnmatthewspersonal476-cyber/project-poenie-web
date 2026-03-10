import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(""),
}));
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import SearchPage from "@/app/search/page";

afterEach(cleanup);

describe("Search Page", () => {
  it("renders the search heading", () => {
    render(<SearchPage />);
    expect(screen.getAllByText("Legal Search").length).toBeGreaterThanOrEqual(1);
  });

  it("renders search input", () => {
    render(<SearchPage />);
    expect(screen.getAllByPlaceholderText(/Search judgments/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders filter dropdowns", () => {
    render(<SearchPage />);
    expect(screen.getAllByDisplayValue("All Courts").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByDisplayValue("All Years").length).toBeGreaterThanOrEqual(1);
    // No topics filter in current UI
  });

  it("shows empty state before searching", () => {
    render(<SearchPage />);
    expect(screen.getAllByText("Enter a query to search South African legal documents").length).toBeGreaterThanOrEqual(1);
  });
});
