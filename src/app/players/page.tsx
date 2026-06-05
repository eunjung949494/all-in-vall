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
];

const positions = ["전체", "아웃사이드 히터", "미들 블로커", "세터", "리베로", "반대 스파이커"];

export default function Players() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState(null);

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
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 900 }}>선수</h2>
        <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 시즌 기록</p>
      </div>

      {/* 포지션 필터 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {positions.map((p) => (
          <button key={p} onClick={() => setFilter(p)} style={{ padding: "6px 14px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "20px", backgroundColor: filter === p ? team.color : "#f0f0f0", color: filter === p ? team.textColor : "#999", cursor: "pointer" }}>
            {p}
          </button>
        ))}
      </div>

      {/* 선수 목록 */}
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

            {/* 통계 */}
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

            {/* AI 분석 */}
            {selected === player.id && (
              <div style={{ marginTop: "14px", padding: "12px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", marginBottom: "6px", letterSpacing: "1px" }}>AI 선수 분석</p>
                <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.6 }}>
                  {player.name} 선수는 이번 시즌 꾸준한 활약을 보여주고 있습니다. 공격성공률 {player.stats.attack}%로 팀 내 핵심 공격수 역할을 담당하며, 특히 서브와 블로킹에서도 안정적인 모습을 보이고 있습니다.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
