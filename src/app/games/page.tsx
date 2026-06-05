"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const mockGames = [
  { id: 1, date: "2026.06.05", home: "GS칼텍스", away: "흥국생명", homeScore: 3, awayScore: 1, stadium: "서울 장충체육관", done: true },
  { id: 2, date: "2026.06.05", home: "현대건설", away: "IBK기업은행", homeScore: 2, awayScore: 3, stadium: "수원체육관", done: true },
  { id: 3, date: "2026.06.07", home: "정관장", away: "도로공사", homeScore: null, awayScore: null, stadium: "대전충무체육관", done: false },
  { id: 4, date: "2026.06.07", home: "페퍼저축은행", away: "GS칼텍스", homeScore: null, awayScore: null, stadium: "광주페퍼스타디움", done: false },
  { id: 5, date: "2026.06.10", home: "흥국생명", away: "현대건설", homeScore: null, awayScore: null, stadium: "인천삼산월드체육관", done: false },
];

export default function Games() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) { router.push("/onboarding"); return; }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);
  }, [router]);

  if (!team) return null;

  const dates = [...new Set(mockGames.map((g) => g.date))];

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 900 }}>경기</h2>
        <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 V리그 시즌</p>
      </div>

      {dates.map((date) => (
        <div key={date} style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#aaa", marginBottom: "10px", letterSpacing: "1px" }}>{date}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {mockGames.filter((g) => g.date === date).map((game) => (
              <div key={game.id}>
                <div
                  onClick={() => setSelected(selected === game.id ? null : game.id)}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    border: selected === game.id ? `2px solid ${team.color}` : "2px solid transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700 }}>{game.home}</p>
                      {game.done && <p style={{ fontSize: "28px", fontWeight: 900, color: game.homeScore! > game.awayScore! ? team.color : "#ddd", marginTop: "4px" }}>{game.homeScore}</p>}
                    </div>
                    <div style={{ textAlign: "center", padding: "0 12px" }}>
                      {game.done
                        ? <p style={{ fontSize: "18px", fontWeight: 900, color: "#eee" }}>:</p>
                        : <div>
                            <p style={{ fontSize: "11px", fontWeight: 700, color: team.color }}>예정</p>
                            <p style={{ fontSize: "10px", color: "#bbb", marginTop: "2px" }}>19:00</p>
                          </div>
                      }
                    </div>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700 }}>{game.away}</p>
                      {game.done && <p style={{ fontSize: "28px", fontWeight: 900, color: game.awayScore! > game.homeScore! ? team.color : "#ddd", marginTop: "4px" }}>{game.awayScore}</p>}
                    </div>
                  </div>
                  <p style={{ fontSize: "10px", color: "#bbb", textAlign: "center", marginTop: "8px" }}>{game.stadium}</p>
                </div>

                {/* 상세 펼치기 */}
                {selected === game.id && game.done && (
                  <div style={{ backgroundColor: "#f8f8f8", borderRadius: "0 0 12px 12px", padding: "16px 20px", marginTop: "-4px", border: `2px solid ${team.color}`, borderTop: "none" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", marginBottom: "10px", letterSpacing: "1px" }}>AI 경기 요약</p>
                    <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>
                      GS칼텍스가 흥국생명을 3-1로 꺾고 승리했습니다. 1세트를 내줬지만 이후 3세트를 연속으로 가져오며 역전승을 거뒀습니다. 에이스의 활약이 돋보인 경기였습니다.
                    </p>
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <button style={{ flex: 1, padding: "8px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: "#000", color: "#fff", cursor: "pointer" }}>
                        하이라이트 →
                      </button>
                      <button style={{ flex: 1, padding: "8px", fontSize: "11px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}>
                        풀영상 →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
