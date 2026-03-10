"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Plus, MessageSquare, Menu, Scale } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const starterConversations: Conversation[] = [
  {
    id: "demo-1",
    title: "Death Penalty in SA",
    messages: [
      { id: "d1", role: "user", content: "Is the death penalty constitutional in South Africa?", timestamp: new Date("2026-03-09T10:00:00") },
      { id: "d2", role: "assistant", content: "The death penalty in South Africa was abolished by the Constitutional Court in **S v Makwanyane 1995 (3) SA 391 (CC)**. The Court held that the right to life is the most fundamental of all human rights, and that capital punishment constitutes cruel, inhuman, and degrading punishment under section 11(2) of the interim Constitution.\n\nThe judgment was unanimous — all eleven justices agreed, though each wrote a separate concurring opinion. Justice Chaskalson, writing the lead judgment, emphasised that the death penalty could not be justified under the limitations clause.\n\nThis remains one of the most significant Constitutional Court decisions and has been cited internationally.", suggestions: ["How does SA's position compare to other African nations?", "What was the political context of the decision?"], timestamp: new Date("2026-03-09T10:00:05") },
    ],
    createdAt: new Date("2026-03-09T10:00:00"),
  },
];

function ChatPageInner() {
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>(starterConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialQueryHandled = useRef(false);

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const messages = activeConv?.messages || [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const newConversation = () => {
    const conv: Conversation = {
      id: crypto.randomUUID(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveConvId(conv.id);
    setSidebarOpen(false);
  };

  const sendMessage = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isStreaming) return;

    let convId = activeConvId;
    if (!convId) {
      const conv: Conversation = {
        id: crypto.randomUUID(),
        title: msg.slice(0, 50) + (msg.length > 50 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
      };
      setConversations((prev) => [conv, ...prev]);
      convId = conv.id;
      setActiveConvId(conv.id);
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: msg, timestamp: new Date() };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        const updated = { ...c, messages: [...c.messages, userMsg] };
        if (c.messages.length === 0) updated.title = msg.slice(0, 50) + (msg.length > 50 ? "..." : "");
        return updated;
      })
    );

    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, conversationId: convId }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let suggestions: string[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === "text") {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                } else if (parsed.type === "suggestions") {
                  suggestions = parsed.content;
                }
              } catch {}
            }
          }
        }
      }

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fullContent,
        suggestions,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, assistantMsg] } : c))
      );
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  }, [input, isStreaming, activeConvId]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !initialQueryHandled.current) {
      initialQueryHandled.current = true;
      sendMessage(q);
    }
  }, [searchParams, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#d4a574] font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-[#d4a574] underline underline-offset-2 hover:text-[#c4955a] transition-colors">$1</a>')
      .replace(/\n\n/g, '</p><p class="mt-3">')
      .replace(/\n/g, "<br />");
    return `<p>${html}</p>`;
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-[#0a0a0a]">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-3 border-b border-white/[0.06]">
          <button onClick={newConversation} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] text-sm text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-colors">
            <Plus className="h-4 w-4" />
            New conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => { setActiveConvId(conv.id); setSidebarOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate ${
                conv.id === activeConvId
                  ? "bg-white/[0.06] text-white"
                  : "text-neutral-500 hover:bg-white/[0.03] hover:text-neutral-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="truncate">{conv.title}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4a574]" />
            Poenie AI
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06]">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-md hover:bg-white/[0.03] text-neutral-500">
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Scale className="h-4 w-4 text-[#d4a574]" strokeWidth={1.5} />
          <span className="text-sm text-neutral-400">AI Legal Assistant</span>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {!activeConvId && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Scale className="h-10 w-10 text-[#d4a574]/40 mb-6" strokeWidth={1.5} />
                <h2 className="text-xl font-semibold text-white mb-2">Ask a Legal Question</h2>
                <p className="text-neutral-500 text-sm max-w-md mb-8">
                  AI-powered analysis of South African law, constitutional cases, and legal principles.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                  {["Is the death penalty legal in South Africa?", "What are the grounds for unfair discrimination?", "Explain the state's duty of care in negligence", "How does the Constitutional Court interpret the Bill of Rights?"].map((q) => (
                    <button key={q} onClick={() => sendMessage(q)} className="text-left px-4 py-3 rounded-xl border border-white/[0.06] text-sm text-neutral-400 hover:bg-white/[0.03] hover:text-neutral-300 hover:border-white/[0.1] transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] lg:max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-white/[0.08] text-neutral-200"
                    : "bg-transparent border-l-2 border-[#d4a574]/60 pl-4 text-neutral-300"
                }`}>
                  <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                      <p className="text-xs text-neutral-600">Suggested follow-ups</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.suggestions.map((s) => (
                          <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full border border-[#d4a574]/20 text-[#d4a574] hover:bg-[#d4a574]/10 transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isStreaming && (
              <div className="flex justify-start">
                <div className="max-w-[85%] lg:max-w-[75%] border-l-2 border-[#d4a574]/60 pl-4">
                  {streamingContent ? (
                    <div className="text-sm leading-relaxed text-neutral-300 typewriter-cursor" dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingContent) }} />
                  ) : (
                    <div className="flex gap-1.5 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4a574]/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4a574]/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4a574]/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-end gap-3 max-w-3xl mx-auto">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a legal question..."
              className="flex-1 min-h-[48px] max-h-32 resize-none bg-white/[0.05] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#d4a574]/30 transition-colors"
              rows={1}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isStreaming}
              className="p-3 rounded-xl bg-[#d4a574] hover:bg-[#c4955a] text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[10px] text-neutral-600 text-center mt-2">
            Poenie AI provides legal information, not legal advice. Consult a qualified attorney.
          </p>
        </div>
      </main>
    </div>
  );
}
export default function ChatPage() { return <Suspense><ChatPageInner /></Suspense>; }
