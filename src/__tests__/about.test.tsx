import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import AboutPage from "@/app/about/page";

afterEach(cleanup);

describe("About Page", () => {
  it("renders page title", () => {
    render(<AboutPage />);
    expect(screen.getAllByText("About Project Poenie").length).toBeGreaterThanOrEqual(1);
  });

  it("renders pipeline steps", () => {
    render(<AboutPage />);
    expect(screen.getAllByText("Scrape").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Extract").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Embed").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Store").length).toBeGreaterThanOrEqual(1);
  });

  it("renders tech stack", () => {
    render(<AboutPage />);
    expect(screen.getAllByText("Qdrant").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("FastAPI").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Trooper GPU").length).toBeGreaterThanOrEqual(1);
  });

  it("renders data licensing section", () => {
    render(<AboutPage />);
    expect(screen.getAllByText("Data & Licensing").length).toBeGreaterThanOrEqual(1);
  });

  it("describes RAG pipeline", () => {
    render(<AboutPage />);
    expect(screen.getAllByText(/Retrieval-Augmented Generation/).length).toBeGreaterThanOrEqual(1);
  });
});
