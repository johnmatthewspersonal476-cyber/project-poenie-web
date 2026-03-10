import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import BrowsePage from "@/app/browse/page";

afterEach(cleanup);

describe("Browse Page", () => {
  it("renders page title", () => {
    render(<BrowsePage />);
    expect(screen.getAllByText("Browse the Corpus").length).toBeGreaterThanOrEqual(1);
  });

  it("renders tab triggers", () => {
    render(<BrowsePage />);
    expect(screen.getAllByRole("tab").length).toBeGreaterThanOrEqual(3);
  });

  it("renders court data", () => {
    render(<BrowsePage />);
    expect(screen.getAllByText("Constitutional Court").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Supreme Court of Appeal").length).toBeGreaterThanOrEqual(1);
  });

  it("shows court judgment count", () => {
    render(<BrowsePage />);
    expect(screen.getAllByText("63").length).toBeGreaterThanOrEqual(1);
  });

  it("renders description text", () => {
    render(<BrowsePage />);
    expect(screen.getAllByText(/Explore indexed legal documents/).length).toBeGreaterThanOrEqual(1);
  });
});
