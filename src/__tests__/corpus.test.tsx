import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

import CorpusPage from "@/app/corpus/page";

afterEach(cleanup);

describe("Corpus Page", () => {
  it("renders page title", () => {
    render(<CorpusPage />);
    expect(screen.getAllByText("Corpus Overview").length).toBeGreaterThanOrEqual(1);
  });

  it("renders summary cards", () => {
    render(<CorpusPage />);
    expect(screen.getAllByText("Data Sources").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Total Documents").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Total Data Size").length).toBeGreaterThanOrEqual(1);
  });

  it("renders all data sources", () => {
    render(<CorpusPage />);
    expect(screen.getAllByText("SAFLII Judgments").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Government Gazettes").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/PMG/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("SARS").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/SAHRC/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/SALRC/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/AGSA/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Public Protector").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("De Rebus").length).toBeGreaterThanOrEqual(1);
  });

  it("renders overall ingestion progress", () => {
    render(<CorpusPage />);
    expect(screen.getAllByText("Overall Ingestion Progress").length).toBeGreaterThanOrEqual(1);
  });

  it("shows correct source count", () => {
    render(<CorpusPage />);
    expect(screen.getAllByText("9").length).toBeGreaterThanOrEqual(1);
  });
});
