import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import Home from "@/app/page";

afterEach(cleanup);

describe("Home Page", () => {
  it("renders the hero title", () => {
    render(<Home />);
    expect(screen.getAllByText("Project Poenie").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the search input", () => {
    render(<Home />);
    expect(screen.getAllByPlaceholderText(/Search South African law/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders all stat cards", () => {
    render(<Home />);
    expect(screen.getAllByText("ConCourt Judgments").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("SAFLII Judgments").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Government Gazettes").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Data Sources").length).toBeGreaterThanOrEqual(1);
  });

  it("renders stat values", () => {
    render(<Home />);
    expect(screen.getAllByText("63").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("95,000+").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("64,292").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("9+").length).toBeGreaterThanOrEqual(1);
  });

  it("renders courts section", () => {
    render(<Home />);
    expect(screen.getAllByText("Courts Covered").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Constitutional Court").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the search button", () => {
    render(<Home />);
    expect(screen.getAllByRole("button", { name: /search/i }).length).toBeGreaterThanOrEqual(1);
  });
});
