"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Scale, Menu, X, Search, MessageSquare, BookOpen, FileEdit, FileSearch, Briefcase, Library, Wrench, Users, Command } from "lucide-react";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

const navLinks = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/research", label: "Research", icon: BookOpen },
  { href: "/draft", label: "Draft", icon: FileEdit },
  { href: "/analyze", label: "Analyze", icon: FileSearch },
  { href: "/cases", label: "Cases", icon: Briefcase },
  { href: "/library", label: "Library", icon: Library },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/collaborate", label: "Team", icon: Users },
];

const allPages = [
  { href: "/", label: "Home" },
  ...navLinks,
  { href: "/search", label: "Search" },
  { href: "/browse", label: "Browse" },
  { href: "/corpus", label: "Corpus" },
  { href: "/about", label: "About" },
];

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = allPages.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filtered.length > 0) {
      navigate(filtered[0].href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 bg-[#111111] border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <Search className="h-5 w-5 text-neutral-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages…"
            className="flex-1 bg-transparent text-white placeholder:text-neutral-500 outline-none text-sm"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-500 font-mono">ESC</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-3 text-sm text-neutral-500">No results found.</p>
          )}
          {filtered.map((p) => (
            <button
              key={p.href}
              onClick={() => navigate(p.href)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-400 hover:bg-white/[0.03] hover:text-white transition-colors text-left"
            >
              <span className="text-[#d4a574]">→</span>
              {p.label}
              <span className="ml-auto text-xs text-neutral-600">{p.href}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-white" onClick={() => setOpen(false)}>
            <Scale className="h-5 w-5 text-[#d4a574]" />
            <span className="text-sm tracking-wide">Project Poenie</span>
          </Link>
          <div className="hidden lg:flex items-center gap-0.5 text-[13px]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === l.href
                    ? "text-[#d4a574] bg-white/[0.03]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-500 hover:bg-white/[0.06] hover:text-neutral-300 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] px-1 py-0.5 rounded bg-white/[0.06] font-mono">⌘K</kbd>
            </button>
            <button className="lg:hidden p-2 -mr-2 text-neutral-400" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-white/[0.06] bg-[#0a0a0a]">
            <div className="flex flex-col py-2">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-colors">
                  <l.icon className="h-4 w-4 text-[#d4a574]" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <p className="text-xs text-neutral-500">© 2026 Project Poenie — Freedom Technologies</p>
        <p className="mt-1 text-xs text-neutral-600">South African Legal AI Research Platform</p>
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
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#0a0a0a]`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
