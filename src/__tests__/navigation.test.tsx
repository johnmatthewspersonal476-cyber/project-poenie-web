import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(""),
}));

import RootLayout from "@/app/layout";

afterEach(cleanup);

describe("Navigation", () => {
  it("renders the navbar brand", () => {
    render(<RootLayout><div>test</div></RootLayout>);
    expect(screen.getAllByText("Project Poenie").length).toBeGreaterThanOrEqual(1);
  });

  it("renders nav links (desktop)", () => {
    render(<RootLayout><div>test</div></RootLayout>);
    expect(screen.getAllByText("Search").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Browse").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Corpus").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
  });

  it("renders footer", () => {
    render(<RootLayout><div>test</div></RootLayout>);
    expect(screen.getAllByText(/Freedom Technologies/).length).toBeGreaterThanOrEqual(1);
  });
});
