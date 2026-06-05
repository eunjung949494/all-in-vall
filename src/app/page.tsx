"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const levels = ["입문자", "좀 알아요", "찐팬"];

export default function Home() {
  const router = useRouter();
  const [level, setLevel] = useState(0);
  const [team, setTeam] = useState<typeof teams[0] | null>(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) {
      router.push("/onboarding");
      return;
    }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);
  }, [router]);

  if (!team) return null;

  return (
    <div style={{ padding: "32px" }}>

      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#000" }}>홈</h2>
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 V리그 시즌</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ padding: "6px 14px", backgroundColor: team.color, borderRadius: "6px", cursor: "pointer" }}
            onClick={() => { localStorage.removeItem("team"); router.push("/onboarding"); }}>
            <p style={{ fontSize: "12px", fontWeight: 800, color: team.textColor }}>{team.shortName}</p>
            <p style={{ fontSize: "9px", color: team.textColor, opacity: 0.7 }}>변경하기</p>
          </div>
        </div>
      </div>

      {/* 레벨 선택 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {levels.map((l, i) => (
          <button
            key={l}
            onClick={() => setLevel(i)}
            style={{
              padding: "8px 20px",
              fontSize: "12px",
              fontWeight: 700,
              border: "none",
              borderRadius: "20px",
              backgroundColor: level === i ? team.color : "#f0f0f0",
              color: level === i ? team.textColor : "#999",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* 2단 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

        {/* 오늘의 경기 */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>
            오늘의 경기
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#555" }}>GS칼텍스</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: team.color, marginTop: "4px" }}>3</p>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 900, color: "#eee", padding: "0 8px" }}>:</div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#555" }}>흥국생명</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: "#ddd", marginTop: "4px" }}>1</p>
            </div>
          </div>
          <p style={{ fontSize: "10px", color: "#bbb", textAlign: "center", margin: "8px 0 12px" }}>2026.06.05 · 서울 장충체육관</p>
          <button style={{
            width: "100%",
            padding: "10px",
            fontSize: "12px",
            fontWeight: 700,
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          }}>
            AI 경기 요약 보기 →
          </button>
        </div>

        {/* 티켓 예매 */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>
            🎟 티켓 예매
          </p>
          {[
            { team: "GS칼텍스 홈경기", place: "서울 장충체육관", gameDate: "06.10", openDate: "06.07 10:00" },
            { team: "현대건설 홈경기", place: "수원체육관", gameDate: "06.12", openDate: "06.09 10:00" },
            { team: "IBK기업은행 홈경기", place: "인천삼산월드체육관", gameDate: "06.14", openDate: "06.11 10:00" },
          ].map((t, i) => (
            <div key={t.team} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < 2 ? "1px solid #f5f5f5" : "none",
            }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700 }}>{t.team}</p>
                <p style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>{t.gameDate} · {t.place}</p>
              </div>
              <span style={{
                padding: "3px 10px",
                backgroundColor: team.color,
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 800,
                color: team.textColor,
              }}>OPEN</span>
            </div>
          ))}
        </div>

      </div>

      {/* 빠른 메뉴 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
        {[
          { label: "경기 일정", icon: "🏐", href: "/games" },
          { label: "선수 기록", icon: "⭐", href: "/players" },
          { label: "경기장 가이드", icon: "📍", href: "/stadium" },
          { label: "AI 챗봇", icon: "💬", href: "/chat" },
        ].map((item) => (
          <a key={item.label} href={item.href} style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <p style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#333" }}>{item.label}</p>
          </a>
        ))}
      </div>

    </div>
  );
}
