"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const levels = ["입문자", "좀 알아요", "찐팬"];

const mockGame = {
  home: "GS칼텍스",
  away: "흥국생명",
  homeScore: 3,
  awayScore: 1,
  date: "2026.06.05",
  stadium: "서울 장충체육관",
  sets: ["25-22", "22-25", "25-19", "25-21"],
  stats: {
    home: { attack: 45.2, serve: 3, block: 8, topScorer: "박정아 21점" },
    away: { attack: 38.1, serve: 2, block: 5, topScorer: "이재영 18점" },
  }
};

export default function Home() {
  const router = useRouter();
  const [level, setLevel] = useState(0);
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) { router.push("/onboarding"); return; }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);
    const savedLevel = localStorage.getItem("level");
    if (savedLevel) setLevel(Number(savedLevel));
  }, [router]);

  const handleLevelChange = (i: number) => {
    setLevel(i);
    localStorage.setItem("level", String(i));
  };

  const handleAISummary = async () => {
    setShowModal(true);
    setLoading(true);
    setSummary("");

    const levelPrompts = [
      `배구를 처음 보는 입문자에게 설명하듯이, 다음 경기 결과를 쉽고 재미있게 스토리텔링으로 설명해줘. 어려운 배구 용어는 쓰지 말고, 마치 친구에게 얘기하듯 친근하게. 3~4문장으로. 경기: ${mockGame.home} ${mockGame.homeScore} - ${mockGame.awayScore} ${mockGame.away}, 세트스코어: ${mockGame.sets.join(", ")}`,
      `배구를 어느 정도 아는 팬에게 설명하듯이, 다음 경기를 세트별 흐름과 주요 선수 중심으로 설명해줘. 세트스코어와 에이스 활약을 포함해서. 4~5문장으로. 경기: ${mockGame.home} ${mockGame.homeScore} - ${mockGame.awayScore} ${mockGame.away}, 세트스코어: ${mockGame.sets.join(", ")}, 홈팀 최다득점: ${mockGame.stats.home.topScorer}, 원정팀 최다득점: ${mockGame.stats.away.topScorer}`,
      `배구 찐팬에게 설명하듯이, 다음 경기를 전술적 관점에서 분석해줘. 세트별 흐름, 공격성공률, 서브/블록 기여, 경기 전환점을 포함해서 전문적으로. 5~6문장으로. 경기: ${mockGame.home} ${mockGame.homeScore} - ${mockGame.awayScore} ${mockGame.away}, 세트스코어: ${mockGame.sets.join(", ")}, 홈팀 공격성공률: ${mockGame.stats.home.attack}%, 서브: ${mockGame.stats.home.serve}, 블록: ${mockGame.stats.home.block}, 원정팀 공격성공률: ${mockGame.stats.away.attack}%, 서브: ${mockGame.stats.away.serve}, 블록: ${mockGame.stats.away.block}`,
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: levelPrompts[level] }),
      });
      const data = await res.json();
      setSummary(data.text);
    } catch {
      setSummary("요약을 불러오지 못했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!team) return null;

  return (
    <div style={{ padding: "32px", fontFamily: "Pretendard, sans-serif" }}>

      {/* AI 요약 모달 */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", width: "480px", maxWidth: "90vw", padding: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 900 }}>AI 경기 요약</p>
                <p style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{levels[level]} 맞춤 분석</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#aaa" }}>✕</button>
            </div>

            <div style={{ backgroundColor: "#fafafa", borderRadius: "10px", padding: "16px", marginBottom: "16px", minHeight: "100px" }}>
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: team.color, animation: "pulse 1s infinite" }} />
                  <p style={{ fontSize: "13px", color: "#aaa" }}>AI가 분석 중이에요...</p>
                </div>
              ) : (
                <p style={{ fontSize: "13px", color: "#333", lineHeight: 1.8 }}>{summary}</p>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {levels.map((l, i) => (
                <button key={l} onClick={() => { handleLevelChange(i); setShowModal(false); setTimeout(() => handleAISummary(), 100); }}
                  style={{ flex: 1, padding: "8px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: level === i ? team.color : "#f0f0f0", color: level === i ? team.textColor : "#999", cursor: "pointer" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 900 }}>홈</h2>
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 V리그 시즌</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", backgroundColor: team.color, borderRadius: "8px", cursor: "pointer" }}
          onClick={() => { localStorage.removeItem("team"); router.push("/onboarding"); }}>
          <img src={team.emblem} alt={team.shortName} style={{ width: "20px", height: "20px", objectFit: "contain", filter: team.darkLogo ? "brightness(0) invert(1)" : "none" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div>
            <p style={{ fontSize: "12px", fontWeight: 800, color: team.textColor }}>{team.shortName}</p>
            <p style={{ fontSize: "9px", color: team.textColor, opacity: 0.7 }}>변경하기</p>
          </div>
        </div>
      </div>

      {/* 레벨 선택 */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>나는 어떤 팬?</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {levels.map((l, i) => (
            <button key={l} onClick={() => handleLevelChange(i)} style={{ padding: "8px 20px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "20px", backgroundColor: level === i ? team.color : "#f0f0f0", color: level === i ? team.textColor : "#999", cursor: "pointer" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* 2단 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

        {/* 오늘의 경기 */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>오늘의 경기</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#555" }}>{mockGame.home}</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: team.color, marginTop: "4px" }}>{mockGame.homeScore}</p>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 900, color: "#eee", padding: "0 8px" }}>:</div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#555" }}>{mockGame.away}</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: "#ddd", marginTop: "4px" }}>{mockGame.awayScore}</p>
            </div>
          </div>

          {/* 레벨별 정보 */}
          {level === 0 && (
            <p style={{ fontSize: "11px", color: "#888", textAlign: "center", margin: "8px 0 12px", lineHeight: 1.5 }}>
              GS칼텍스가 승리했어요! 🎉
            </p>
          )}
          {level === 1 && (
            <div style={{ margin: "8px 0 12px" }}>
              <p style={{ fontSize: "10px", color: "#aaa", textAlign: "center", marginBottom: "6px" }}>세트스코어</p>
              <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                {mockGame.sets.map((s, i) => (
                  <span key={i} style={{ fontSize: "10px", padding: "2px 6px", backgroundColor: "#f5f5f5", borderRadius: "4px", color: "#666" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {level === 2 && (
            <div style={{ margin: "8px 0 12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {[
                  { label: "공격성공률", home: mockGame.stats.home.attack + "%", away: mockGame.stats.away.attack + "%" },
                  { label: "블록", home: mockGame.stats.home.block, away: mockGame.stats.away.block },
                ].map((s) => (
                  <div key={s.label} style={{ backgroundColor: "#fafafa", borderRadius: "6px", padding: "6px", textAlign: "center" }}>
                    <p style={{ fontSize: "9px", color: "#aaa", marginBottom: "3px" }}>{s.label}</p>
                    <p style={{ fontSize: "11px", fontWeight: 700 }}>{s.home} : {s.away}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleAISummary} style={{ width: "100%", padding: "10px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: "#000", color: "#fff", cursor: "pointer" }}>
            AI 경기 요약 보기 →
          </button>
        </div>

        {/* 티켓 예매 */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>🎟 티켓 예매</p>
          {[
            { team: "GS칼텍스 홈경기", place: "서울 장충체육관", gameDate: "06.10", openDate: "06.07 10:00" },
            { team: "현대건설 홈경기", place: "수원체육관", gameDate: "06.12", openDate: "06.09 10:00" },
            { team: "IBK기업은행 홈경기", place: "화성종합경기타운", gameDate: "06.14", openDate: "06.11 10:00" },
          ].map((t, i) => (
            <div key={t.team} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid #f5f5f5" : "none" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700 }}>{t.team}</p>
                <p style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>{t.gameDate} · {t.place}</p>
              </div>
              <span style={{ padding: "3px 10px", backgroundColor: team.color, borderRadius: "4px", fontSize: "10px", fontWeight: 800, color: team.textColor }}>OPEN</span>
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
          <a key={item.label} href={item.href} style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "16px", textAlign: "center", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#333" }}>{item.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
