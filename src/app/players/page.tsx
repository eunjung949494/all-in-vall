"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";
import { mockPlayers } from "@/lib/players";

const positions = ["전체", "아웃사이드 히터", "미들 블로커", "세터", "리베로", "반대 스파이커"];

function WorldCup({ onClose, team, players }: { onClose: () => void; team: any; players: typeof mockPlayers }) {
  const [round, setRound] = useState([...players].slice(0, 8));
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
        <img src={result.image} alt={result.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px", display: "block", border: "3px solid " + team.color }} onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.kovo.co.kr/resources/players/bio_default.webp"; }} />
        <p style={{ fontSize: "28px", fontWeight: 900, marginBottom: "4px" }}>{result.name}</p>
        <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "8px" }}>{result.team} · {result.position}</p>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "24px" }}>#{result.number}</p>
        <button onClick={onClose} style={{ width: "100%", padding: "12px", fontSize: "13px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}>닫기</button>
      </div>
    );
  }

  const playerA = round[current];
  const playerB = round[current + 1];
  if (!playerA || !playerB) return null;

  return (
    <div style={{ padding: "24px" }}>
      <p style={{ fontSize: "12px", color: "#aaa", textAlign: "center", marginBottom: "4px" }}>{roundName}</p>
      <p style={{ fontSize: "16px", fontWeight: 900, textAlign: "center", marginBottom: "24px" }}>더 좋아하는 선수는?</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {[playerA, playerB].map((player) => (
          <button key={player.id} onClick={() => pick(player)} style={{ backgroundColor: "#fff", border: "2px solid #f0f0f0", borderRadius: "12px", padding: "20px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = team.color; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px " + team.color + "33"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f0"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}>
            <img src={player.image} alt={player.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px", display: "block", border: "2px solid #f0f0f0" }} onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.kovo.co.kr/resources/players/bio_default.webp"; }} />
            <p style={{ fontSize: "16px", fontWeight: 900, marginBottom: "4px" }}>{player.name}</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px" }}>{player.team}</p>
            <p style={{ fontSize: "10px", color: "#bbb" }}>{player.position}</p>
          </button>
        ))}
      </div>
      <p style={{ fontSize: "11px", color: "#ccc", textAlign: "center", marginTop: "16px" }}>{current / 2 + 1} / {round.length / 2} 경기</p>
    </div>
  );
}

export default function Players() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState<number | null>(null);
  const [showWorldCup, setShowWorldCup] = useState(false);
  const [showMyTeamOnly, setShowMyTeamOnly] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) { router.push("/onboarding"); return; }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);
  }, [router]);

  if (!team) return null;

  const filtered = mockPlayers.filter((p) => {
    const posMatch = filter === "전체" || p.position === filter;
    const teamMatch = !showMyTeamOnly || p.teamId === team.id;
    return posMatch && teamMatch;
  });

  const worldCupPlayers = showMyTeamOnly
    ? mockPlayers.filter(p => p.teamId === team.id)
    : mockPlayers.filter(p => ["아웃사이드 히터", "반대 스파이커", "미들 블로커"].includes(p.position)).slice(0, 8);

  return (
    <div style={{ padding: "32px" }}>
      {showWorldCup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", width: "480px", maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: "15px", fontWeight: 900 }}>🏐 선수 이상형 월드컵</p>
              <button onClick={() => setShowWorldCup(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#aaa" }}>✕</button>
            </div>
            <WorldCup onClose={() => setShowWorldCup(false)} team={team} players={worldCupPlayers} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 900 }}>선수</h2>
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 시즌 선수단</p>
        </div>
        <button onClick={() => setShowWorldCup(true)} style={{ padding: "10px 20px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}>
          🏆 이상형 월드컵
        </button>
      </div>

      {/* 필터 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={() => setShowMyTeamOnly(!showMyTeamOnly)} style={{ padding: "6px 14px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "20px", backgroundColor: showMyTeamOnly ? team.color : "#f0f0f0", color: showMyTeamOnly ? team.textColor : "#999", cursor: "pointer" }}>
          {team.shortName} 선수만
        </button>
        <div style={{ width: "1px", height: "20px", backgroundColor: "#eee" }} />
        {positions.map((p) => (
          <button key={p} onClick={() => setFilter(p)} style={{ padding: "6px 14px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "20px", backgroundColor: filter === p ? "#333" : "#f0f0f0", color: filter === p ? "#fff" : "#999", cursor: "pointer" }}>
            {p}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: "#bbb", marginBottom: "16px" }}>총 {filtered.length}명</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
        {filtered.map((player) => (
          <div key={player.id} onClick={() => setSelected(selected === player.id ? null : player.id)} style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: selected === player.id ? "2px solid " + team.color : "2px solid transparent", textAlign: "center" }}>
            <img src={player.image} alt={player.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 10px", display: "block", border: "2px solid #f0f0f0" }} onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.kovo.co.kr/resources/players/bio_default.webp"; }} />
            <p style={{ fontSize: "14px", fontWeight: 800, marginBottom: "3px" }}>{player.name}</p>
            <p style={{ fontSize: "10px", color: "#aaa", marginBottom: "2px" }}>#{player.number} · {player.position}</p>
            <p style={{ fontSize: "10px", color: "#bbb" }}>{player.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
