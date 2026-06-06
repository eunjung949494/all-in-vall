"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const mockPlayers = [
  { id: 1, name: "김연경", team: "흥국생명", position: "아웃사이드 히터", number: 10, stats: { score: 342, attack: 45.2, serve: 28, block: 15 } },
  { id: 2, name: "이재영", team: "흥국생명", position: "아웃사이드 히터", number: 7, stats: { score: 310, attack: 42.1, serve: 31, block: 12 } },
  { id: 3, name: "양효진", team: "현대건설", position: "미들 블로커", number: 13, stats: { score: 198, attack: 51.3, serve: 12, block: 67 } },
  { id: 4, name: "박정아", team: "GS칼텍스", position: "아웃사이드 히터", number: 12, stats: { score: 289, attack: 40.8, serve: 22, block: 9 } },
  { id: 5, name: "강소휘", team: "GS칼텍스", position: "아웃사이드 히터", number: 5, stats: { score: 265, attack: 38.9, serve: 19, block: 8 } },
  { id: 6, name: "오지영", team: "IBK기업은행", position: "세터", number: 6, stats: { score: 42, attack: 28.5, serve: 8, block: 5 } },
  { id: 7, name: "정호영", team: "정관장", position: "리베로", number: 3, stats: { score: 12, attack: 0, serve: 5, block: 0 } },
  { id: 8, name: "배유나", team: "도로공사", position: "반대 스파이커", number: 14, stats: { score: 301, attack: 43.2, serve: 25, block: 18 } },
];

const positions = ["전체", "아웃사이드 히터", "미들 블로커", "세터", "리베로", "반대 스파이커"];

function WorldCup({ onClose, team }: { onClose: () => void; team: any }) {
  const [round, setRound] = useState([...mockPlayers]);
  const [current, setCurrent] = useState(0);
  const [winners, setWinners] = useState<typeof mockPlayers>([]);
  const [result, setResult] = useState<typeof mockPlayers[0] | null>(null);

  const pick = (player: typeof mockPlayers[0]) => {
    const newWinners = [...winners, player];
    const nextCurrent = current + 2;

    if (nextCurrent >= round.length) {
      if (newWinners.length === 1) {
        setResult(newWinners[0]);
      } else {
        setRound(newWinners);
        setCurrent(0);
        setWinners([]);
      }
    } else {
      setCurrent(nextCurrent);
      setWinners(newWinners);
    }
  };

  const roundName = round.length === 8 ? "8강" : round.length === 4 ? "4강" : round.length === 2 ? "결승" : "";

  if (result) {
    return (
      <div style={{ textAlign: "center", padding: "32px" }}>
        <p style={{ fontSize: "40px", marginBottom: "16px" }}>🏆</p>
        <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "8px" }}>나의 최애 선수</p>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: team.color + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <span style={{ fontSize: "24px", fontWeight: 900, color: team.color }}>#{result.number}</span>
        </div>
        <p style={{ fontSize: "28px", fontWeight: 900, marginBottom: "4px" }}>{result.name}</p>
        <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "24px" }}>{result.team} · {result.position}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
          {[
            { label: "득점", value: result.stats.score },
            { label: "공격%", value: result.stats.attack },
            { label: "서브", value: result.stats.serve },
            { label: "블록", value: result.stats.block },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fafafa", borderRadius: "8px", padding: "10px 4px", textAlign: "center" }}>
              <p style={{ fontSize: "16px", fontWeight: 900, color: team.color }}>{s.value}</p>
              <p style={{ fontSize: "9px", color: "#bbb", marginTop: "2px" }}>{s.label}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "12px", fontSize: "13px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}>
          닫기
        </button>
      </div>
    );
  }

  const playerA = round[current];
  const playerB = round[current + 1];

  return (
    <div style={{ padding: "24px" }}>
      <p style={{ fontSize: "12px", color: "#aaa", textAlign: "center", marginBottom: "4px" }}>{roundName}</p>
      <p style={{ fontSize: "16px", fontWeight: 900, textAlign: "center", marginBottom: "24px" }}>
        더 좋아하는 선수는?
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {[playerA, playerB].map((player) => (
          <button
            key={player.id}
            onClick={() => pick(player)}
            style={{ backgroundColor: "#fff", border: "2px solid #f0f0f0", borderRadius: "12px", padding: "20px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = team.color; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${team.color}33`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f0"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: team.color + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <span style={{ fontSize: "20px", fontWeight: 900, color: team.color }}>#{player.number}</span>
            </div>
            <p style={{ fontSize: "16px", fontWeight: 900, marginBottom: "4px" }}>{player.name}</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "12px" }}>{player.team}</p>
            <p style={{ fontSize: "10px", color: "#bbb" }}>{player.position}</p>
          </button>
        ))}
      </div>
      <p style={{ fontSize: "11px", color: "#ccc", textAlign: "center", marginTop: "16px" }}>
        {current / 2 + 1} / {round.length / 2} 경기
      </p>
    </div>
  );
}

export default function Players() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState<number | null>(null);
  const [showWorldCup, setShowWorldCup] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) { router.push("/onboarding"); return; }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);
  }, [router]);

  if (!team) return null;

  const filtered = mockPlayers.filter((p) => filter === "전체" || p.position === filter);

  return (
    <div style={{ padding: "32px" }}>

      {/* 이상형 월드컵 모달 */}
      {showWorldCup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", width: "480px", maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: "15px", fontWeight: 900 }}>🏐 선수 이상형 월드컵</p>
              <button onClick={() => setShowWorldCup(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#aaa" }}>✕</button>
            </div>
            <WorldCup onClose={() => setShowWorldCup(false)} team={team} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 900 }}>선수</h2>
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 시즌 기록</p>
        </div>
        <button
          onClick={() => setShowWorldCup(true)}
          style={{ padding: "10px 20px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}
        >
          🏆 이상형 월드컵
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {positions.map((p) => (
          <button key={p} onClick={() => setFilter(p)} style={{ padding: "6px 14px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "20px", backgroundColor: filter === p ? team.color : "#f0f0f0", color: filter === p ? team.textColor : "#999", cursor: "pointer" }}>
            {p}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
        {filtered.map((player) => (
          <div key={player.id} onClick={() => setSelected(selected === player.id ? null : player.id)} style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: selected === player.id ? "2px solid " + team.color : "2px solid transparent" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: team.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "16px", fontWeight: 900, color: team.color }}>#{player.number}</span>
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 800 }}>{player.name}</p>
                <p style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{player.team} · {player.position}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
              {[
                { label: "득점", value: player.stats.score },
                { label: "공격%", value: player.stats.attack },
                { label: "서브", value: player.stats.serve },
                { label: "블록", value: player.stats.block },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center", backgroundColor: "#fafafa", borderRadius: "8px", padding: "8px 4px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 900, color: team.color }}>{stat.value}</p>
                  <p style={{ fontSize: "9px", color: "#bbb", marginTop: "2px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
            {selected === player.id && (
              <div style={{ marginTop: "14px", padding: "12px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", marginBottom: "6px", letterSpacing: "1px" }}>AI 선수 분석</p>
                <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.6 }}>
                  {player.name} 선수는 이번 시즌 꾸준한 활약을 보여주고 있습니다. 공격성공률 {player.stats.attack}%로 팀 내 핵심 역할을 담당하며, 서브와 블로킹에서도 안정적인 모습을 보이고 있습니다.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
