"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";
import { mockPlayers } from "@/lib/players";

const positions = ["전체", "아웃사이드 히터", "미들 블로커", "세터", "리베로", "아포짓 스파이커"];

const vbtiQuestions = [
  { q: "경기에서 제일 짜릿한 순간은?", a: "강스파이크가 꽂힐 때", b: "수비로 공을 살려낼 때" },
  { q: "나의 스타일은?", a: "화려하고 공격적으로!", b: "안정적이고 묵묵하게" },
  { q: "팀에서 내 역할은?", a: "앞에서 끌고 가는 리더", b: "뒤에서 받쳐주는 서포터" },
  { q: "좋아하는 경기 흐름은?", a: "처음부터 상대를 압도", b: "극적인 역전 드라마" },
  { q: "배구 볼 때 나는?", a: "득점 장면에만 집중!", b: "수비 장면도 다 챙겨봄" },
];

const vbtiResults = [
  { type: "에이스형", emoji: "⚡", desc: "화려하고 강렬하게! 팀의 득점을 책임지는 공격형 플레이어 스타일이에요. 언제나 앞에서 치고 나가는 것을 즐기는 당신은 에이스 기질이 넘쳐요.", position: "아웃사이드 히터", teamId: "gs", teamName: "GS칼텍스", playerName: "실바" },
  { type: "만능형", emoji: "🌟", desc: "공격도 수비도 완벽하게! 어떤 상황에서도 팀을 위해 헌신하는 올라운더 스타일이에요. 유연하고 적응력이 뛰어난 당신은 어디서든 빛나요.", position: "아포짓 스파이커", teamId: "jeongkwanjang", teamName: "정관장", playerName: "킨켈라" },
  { type: "두뇌형", emoji: "🧠", desc: "냉철하고 전략적으로! 경기 흐름을 읽고 팀을 조율하는 지휘관 스타일이에요. 화려함보다 정확함을 추구하는 당신은 세터 기질이 있어요.", position: "세터", teamId: "gs", teamName: "GS칼텍스", playerName: "최윤영" },
  { type: "철벽형", emoji: "🧱", desc: "묵묵하고 강인하게! 상대의 공격을 막아내는 수비형 플레이어 스타일이에요. 화려하진 않지만 팀이 가장 필요로 하는 존재예요.", position: "미들 블로커", teamId: "heungkuk", teamName: "흥국생명", playerName: "변지수" },
  { type: "수호신형", emoji: "🛡️", desc: "팀의 마지막 보루! 어떤 공도 살려내는 수비 전문가 스타일이에요. 조용하지만 가장 믿음직스러운 존재, 그게 바로 당신이에요.", position: "리베로", teamId: "kepco", teamName: "도로공사", playerName: "한다혜" },
];

function WorldCup({ onClose, team, players }: { onClose: () => void; team: any; players: typeof mockPlayers }) {
  const [round, setRound] = useState([...players].slice(0, 8));
  const [current, setCurrent] = useState(0);
  const [winners, setWinners] = useState<typeof mockPlayers>([]);
  const [result, setResult] = useState<typeof mockPlayers[0] | null>(null);

  const pick = (player: typeof mockPlayers[0]) => {
    const newWinners = [...winners, player];
    const nextCurrent = current + 2;
    if (nextCurrent >= round.length) {
      if (newWinners.length === 1) { setResult(newWinners[0]); }
      else { setRound(newWinners); setCurrent(0); setWinners([]); }
    } else { setCurrent(nextCurrent); setWinners(newWinners); }
  };

  const roundName = round.length === 8 ? "8강" : round.length === 4 ? "4강" : round.length === 2 ? "결승" : "";

  if (result) {
    return (
      <div style={{ textAlign: "center", padding: "32px" }}>
        <p style={{ fontSize: "40px", marginBottom: "16px" }}>🏆</p>
        <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "8px" }}>나의 최애 선수</p>
        <img src={result.image} alt={result.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px", display: "block", border: "3px solid " + team.color }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <p style={{ fontSize: "28px", fontWeight: 900, marginBottom: "4px" }}>{result.name}</p>
        <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "24px" }}>{result.team} · {result.position} · #{result.number}</p>
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = team.color; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f0"; }}>
            <img src={player.image} alt={player.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px", display: "block", border: "2px solid #f0f0f0" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <p style={{ fontSize: "15px", fontWeight: 900, marginBottom: "4px" }}>{player.name}</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px" }}>{player.team}</p>
            <p style={{ fontSize: "10px", color: team.color, fontWeight: 700, marginBottom: "2px" }}>
              {player.stats.score > 0 ? `🔥 시즌 ${player.stats.score}점` : player.stats.block > 0 ? `🧱 블로킹 ${player.stats.block}개` : player.stats.serve > 0 ? `⚡ 서브 ${player.stats.serve}개` : player.position}
            </p>
          </button>
        ))}
      </div>
      <p style={{ fontSize: "11px", color: "#ccc", textAlign: "center", marginTop: "16px" }}>{current / 2 + 1} / {round.length / 2} 경기</p>
    </div>
  );
}

function VBTI({ onClose, team }: { onClose: () => void; team: any }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof vbtiResults[0] | null>(null);

  const handleAnswer = (type: "a" | "b") => {
    const newAnswers = [...answers, type];
    if (step < vbtiQuestions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const aCount = newAnswers.filter(a => a === "a").length;
      if (aCount >= 4) setResult(vbtiResults[0]);
      else if (aCount === 3) setResult(vbtiResults[1]);
      else if (aCount === 2) setResult(vbtiResults[2]);
      else if (aCount === 1) setResult(vbtiResults[3]);
      else setResult(vbtiResults[4]);
    }
  };

  const recommendedPlayer = result ? mockPlayers.find(p => p.name === result.playerName && p.teamId === result.teamId) : null;
  const recommendedTeam = result ? teams.find(t => t.id === result.teamId) : null;

  if (result && recommendedTeam) {
    return (
      <div style={{ padding: "24px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <p style={{ fontSize: "40px", marginBottom: "8px" }}>{result.emoji}</p>
          <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px", letterSpacing: "2px" }}>나의 배구 유형은</p>
          <h3 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>{result.type}</h3>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>{result.desc}</p>
        </div>

        {recommendedPlayer && (
          <div style={{ backgroundColor: "#fafafa", borderRadius: "12px", padding: "16px", marginBottom: "12px", textAlign: "center" }}>
            <p style={{ fontSize: "10px", color: "#aaa", marginBottom: "12px", letterSpacing: "1px" }}>이런 선수 스타일이에요</p>
            <img src={recommendedPlayer.image} alt={recommendedPlayer.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 10px", display: "block", border: "3px solid " + recommendedTeam.color }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <p style={{ fontSize: "16px", fontWeight: 900, marginBottom: "2px" }}>{recommendedPlayer.name}</p>
            <p style={{ fontSize: "11px", color: "#aaa" }}>{recommendedPlayer.team} · {recommendedPlayer.position}</p>
          </div>
        )}

        <div style={{ backgroundColor: recommendedTeam.color, borderRadius: "12px", padding: "14px 16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={recommendedTeam.emblem} alt={recommendedTeam.shortName} style={{ width: "36px", height: "36px", objectFit: "contain", filter: recommendedTeam.darkLogo ? "brightness(0) invert(1)" : "none" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div>
            <p style={{ fontSize: "10px", color: recommendedTeam.textColor, opacity: 0.7 }}>추천 구단</p>
            <p style={{ fontSize: "15px", fontWeight: 900, color: recommendedTeam.textColor }}>{recommendedTeam.name}</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => { onClose(); router.push("/players?team=" + result.teamId); }} style={{ flex: 1, padding: "12px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: recommendedTeam.color, color: recommendedTeam.textColor, cursor: "pointer" }}>
            {result.teamName} 선수단 보러가기 →
          </button>
          <button onClick={() => { setStep(0); setAnswers([]); setResult(null); }} style={{ padding: "12px 16px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: "#f0f0f0", color: "#666", cursor: "pointer" }}>
            다시
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", height: "6px", marginBottom: "24px" }}>
        <div style={{ backgroundColor: team.color, borderRadius: "10px", height: "6px", width: ((step / vbtiQuestions.length) * 100) + "%", transition: "width 0.3s" }} />
      </div>
      <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>{step + 1} / {vbtiQuestions.length}</p>
      <h3 style={{ fontSize: "18px", fontWeight: 900, marginBottom: "24px", lineHeight: 1.4 }}>{vbtiQuestions[step].q}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[{ label: vbtiQuestions[step].a, type: "a" as const }, { label: vbtiQuestions[step].b, type: "b" as const }].map((opt) => (
          <button key={opt.type} onClick={() => handleAnswer(opt.type)} style={{ padding: "18px 20px", fontSize: "14px", fontWeight: 600, border: "2px solid #f0f0f0", borderRadius: "12px", backgroundColor: "#fff", color: "#333", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = team.color; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f0"; }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Players() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState<number | null>(null);
  const [modal, setModal] = useState<"worldcup" | "vbti" | null>(null);
  const [showMyTeamOnly, setShowMyTeamOnly] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) { router.push("/onboarding"); return; }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);

    const params = new URLSearchParams(window.location.search);
    const teamParam = params.get("team");
    if (teamParam) setShowMyTeamOnly(true);
  }, [router]);

  if (!team) return null;

  const filtered = mockPlayers.filter((p) => {
    const posMatch = filter === "전체" || p.position === filter;
    const teamMatch = !showMyTeamOnly || p.teamId === team.id;
    return posMatch && teamMatch;
  });

  const worldCupPlayers = (() => {
    const myTeamPlayers = mockPlayers.filter(p => p.teamId === team.id);
    if (myTeamPlayers.length >= 8) return myTeamPlayers.slice(0, 8);
    // 8명 미만이면 전체에서 채우기
    const others = mockPlayers.filter(p => p.teamId !== team.id).slice(0, 8 - myTeamPlayers.length);
    return [...myTeamPlayers, ...others];
  })();

  return (
    <div style={{ padding: "32px" }}>

      {/* 모달 */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", width: "480px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
              <p style={{ fontSize: "15px", fontWeight: 900 }}>
                {modal === "worldcup" ? "🏆 선수 이상형 월드컵" : "🏐 VBTI — 나의 배구 유형"}
              </p>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#aaa" }}>✕</button>
            </div>
            {modal === "worldcup"
              ? <WorldCup onClose={() => setModal(null)} team={team} players={worldCupPlayers} />
              : <VBTI onClose={() => setModal(null)} team={team} />
            }
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 900 }}>선수</h2>
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>2025-26 시즌 선수단</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setModal("vbti")} style={{ padding: "10px 16px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: "#f0f0f0", color: "#555", cursor: "pointer" }}>
            🏐 VBTI
          </button>
          <button onClick={() => setModal("worldcup")} style={{ padding: "10px 16px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}>
            🏆 이상형 월드컵
          </button>
        </div>
      </div>

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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
        {filtered.map((player) => (
          <div key={player.id} onClick={() => setSelected(selected === player.id ? null : player.id)} style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: selected === player.id ? "2px solid " + team.color : "2px solid transparent", textAlign: "center" }}>
            <img src={player.image} alt={player.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 10px", display: "block", border: "2px solid #f0f0f0" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <p style={{ fontSize: "13px", fontWeight: 800, marginBottom: "3px" }}>{player.name}</p>
            <p style={{ fontSize: "10px", color: "#aaa", marginBottom: "2px" }}>#{player.number} · {player.position}</p>
            <p style={{ fontSize: "10px", color: "#bbb" }}>{player.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
