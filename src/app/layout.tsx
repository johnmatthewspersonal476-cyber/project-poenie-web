"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Scale, Menu, X } from "lucide-react";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const navLinks = [
  { href: "/search", label: "Search" },
  { href: "/browse", label: "Browse" },
  { href: "/corpus", label: "Corpus" },
  { href: "/about", label: "About" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-[hsl(220,60%,15%)] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
          <Scale className="h-6 w-6 text-[hsl(43,74%,49%)]" />
          <span>Project Poenie</span>
        </Link>
        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[hsl(43,74%,49%)] transition-colors">{l.label}</Link>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="sm:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-white/10 bg-[hsl(220,60%,13%)]">
          <div className="flex flex-col py-2">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
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
      <head>
        <title>Project Poenie — South African Legal AI</title>
        <meta name="description" content="AI-powered search across South African legal documents, judgments, statutes, and gazettes." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
