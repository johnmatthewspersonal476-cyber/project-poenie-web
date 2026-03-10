"use client";

import { Users, MessageSquare, FileText, Clock, Plus } from "lucide-react";

const team = [
  { name: "You", role: "Lead Attorney", status: "online", initials: "CB" },
  { name: "Naledi M.", role: "Associate", status: "online", initials: "NM" },
  { name: "Johan v.d.B.", role: "Candidate Attorney", status: "away", initials: "JB" },
  { name: "Thandi K.", role: "Paralegal", status: "offline", initials: "TK" },
];

const activity = [
  { user: "Naledi M.", action: "commented on Mthembu Trading brief", time: "20 min ago" },
  { user: "Johan v.d.B.", action: "uploaded revised NDA draft", time: "1 hour ago" },
  { user: "You", action: "shared research on Section 9 equality", time: "3 hours ago" },
  { user: "Thandi K.", action: "completed case law summary", time: "Yesterday" },
];

const statusDot: Record<string, string> = { online: "bg-emerald-400", away: "bg-[#d4a574]", offline: "bg-neutral-600" };

export default function CollaboratePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Team</h1>
          <p className="text-neutral-500 text-sm">Collaborate with your team on legal matters</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#d4a574] hover:bg-[#c4955a] text-black text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team members */}
        <div className="lg:col-span-1 animate-fade-in-up-delay-1">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Team Members</h2>
          <div className="space-y-2">
            {team.map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-xs text-neutral-400 font-medium">{m.initials}</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0a] ${statusDot[m.status]}`} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{m.name}</p>
                  <p className="text-neutral-600 text-xs">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="lg:col-span-2 animate-fade-in-up-delay-2">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-[#d4a574]/40 mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-300"><span className="text-white font-medium">{a.user}</span> {a.action}</p>
                  <p className="text-xs text-neutral-600 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
