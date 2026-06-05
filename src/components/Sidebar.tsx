"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { teams } from "@/lib/teams";

const navItems = [
  { href: "/", label: "홈", icon: "🏠" },
  { href: "/games", label: "경기", icon: "🏐" },
  { href: "/players", label: "선수", icon: "⭐" },
  { href: "/stadium", label: "경기장", icon: "📍" },
  { href: "/chat", label: "챗봇", icon: "💬" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (savedTeam) {
      const found = teams.find((t) => t.id === savedTeam);
      if (found) setTeam(found);
    }
  }, []);

  return (
    <aside style={{ width: "220px", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", backgroundColor: "#fff" }}>
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #f0f0f0" }}>
        <h1 style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "2px", color: "#000" }}>ALL IN VALL</h1>
        <p style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>배구 정보, 한 곳에서</p>
      </div>

      {team && (
        <div onClick={() => { localStorage.removeItem("team"); router.push("/onboarding"); }} style={{ margin: "14px 16px 0", padding: "10px 14px", backgroundColor: team.color, borderRadius: "10px", cursor: "pointer" }}>
          <p style={{ fontSize: "13px", fontWeight: 800, color: team.textColor }}>{team.shortName}</p>
          <p style={{ fontSize: "10px", color: team.textColor, opacity: 0.7, marginTop: "1px" }}>구단 변경하기 →</p>
        </div>
      )}

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <p style={{ fontSize: "10px", fontWeight: 700, color: "#ccc", letterSpacing: "1px", padding: "0 8px", marginBottom: "6px" }}>MENU</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", fontSize: "13px", fontWeight: isActive ? 800 : 600, color: isActive ? "#000" : "#999", textDecoration: "none", marginBottom: "2px", borderRadius: "8px", backgroundColor: isActive ? "#f5f5f5" : "transparent", borderLeft: isActive && team ? "3px solid " + team.color : "3px solid transparent" }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
              {isActive && <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: team ? team.color : "#000" }} />}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
