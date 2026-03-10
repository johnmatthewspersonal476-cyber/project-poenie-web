import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Scale } from "lucide-react";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Poenie — South African Legal AI",
  description: "AI-powered search across South African legal documents, judgments, statutes, and gazettes.",
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-[hsl(220,60%,15%)] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Scale className="h-6 w-6 text-[hsl(43,74%,49%)]" />
          <span>Project Poenie</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link href="/search" className="hover:text-[hsl(43,74%,49%)] transition-colors">Search</Link>
          <Link href="/browse" className="hover:text-[hsl(43,74%,49%)] transition-colors">Browse</Link>
          <Link href="/corpus" className="hover:text-[hsl(43,74%,49%)] transition-colors">Corpus</Link>
          <Link href="/about" className="hover:text-[hsl(43,74%,49%)] transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-[hsl(220,60%,12%)] text-white/60 py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-sm">
        <p>© 2026 Project Poenie — Freedom Technologies</p>
        <p className="mt-1">South African Legal AI Research Platform</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
