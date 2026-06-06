"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";
import { mockPlayers } from "@/lib/players";

const questions = [
  { q: "경기에서 제일 짜릿한 순간은?", a: "강스파이크가 꽂힐 때", b: "수비로 공을 살려낼 때" },
  { q: "나의 스타일은?", a: "화려하고 공격적으로!", b: "안정적이고 묵묵하게" },
  { q: "팀에서 내 역할은?", a: "앞에서 끌고 가는 리더", b: "뒤에서 받쳐주는 서포터" },
  { q: "좋아하는 경기 흐름은?", a: "처음부터 상대를 압도", b: "극적인 역전 드라마" },
  { q: "배구 볼 때 나는?", a: "득점 장면에만 집중!", b: "수비 장면도 다 챙겨봄" },
];

const results = [
  {
    type: "에이스형",
    emoji: "⚡",
    desc: "화려하고 강렬하게! 팀의 득점을 책임지는 공격형 플레이어 스타일이에요. 언제나 앞에서 치고 나가는 것을 즐기는 당신은 에이스 기질이 넘쳐요.",
    position: "아웃사이드 히터",
    teamId: "gs",
    teamName: "GS칼텍스",
    playerName: "실바",
    condition: (a: number) => a >= 4,
  },
  {
    type: "두뇌형",
    emoji: "🧠",
    desc: "냉철하고 전략적으로! 경기 흐름을 읽고 팀을 조율하는 지휘관 스타일이에요. 화려함보다 정확함을 추구하는 당신은 세터 기질이 있어요.",
    position: "세터",
    teamId: "gs",
    teamName: "GS칼텍스",
    playerName: "최윤영",
    condition: (a: number) => a === 2 || a === 3,
  },
  {
    type: "철벽형",
    emoji: "🧱",
    desc: "묵묵하고 강인하게! 상대의 공격을 막아내는 수비형 플레이어 스타일이에요. 화려하진 않지만 팀이 가장 필요로 하는 존재예요.",
    position: "미들 블로커",
    teamId: "heungkuk",
    teamName: "흥국생명",
    playerName: "변지수",
    condition: (a: number) => a === 1,
  },
  {
    type: "수호신형",
    emoji: "🛡️",
    desc: "팀의 마지막 보루! 어떤 공도 살려내는 수비 전문가 스타일이에요. 조용하지만 가장 믿음직스러운 존재, 그게 바로 당신이에요.",
    position: "리베로",
    teamId: "kepco",
    teamName: "도로공사",
    playerName: "한다혜",
    condition: (a: number) => a === 0,
  },
  {
    type: "만능형",
    emoji: "🌟",
    desc: "공격도 수비도 완벽하게! 어떤 상황에서도 팀을 위해 헌신하는 올라운더 스타일이에요. 유연하고 적응력이 뛰어난 당신은 어디서든 빛나요.",
    position: "반대 스파이커",
    teamId: "jeongkwanjang",
    teamName: "정관장",
    playerName: "킨켈라",
    condition: (a: number) => a === 3,
  },
];

export default function VBTI() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof results[0] | null>(null);

  const handleAnswer = (type: "a" | "b") => {
    const newAnswers = [...answers, type];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const aCount = newAnswers.filter(a => a === "a").length;
      let res;
      if (aCount >= 4) res = results[0];
      else if (aCount === 3) res = results[4];
      else if (aCount === 2) res = results[1];
      else if (aCount === 1) res = results[2];
      else res = results[3];
      setResult(res);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const recommendedPlayer = result
    ? mockPlayers.find(p => p.name === result.playerName && p.teamId === result.teamId)
    : null;

  const recommendedTeam = result
    ? teams.find(t => t.id === result.teamId)
    : null;

  if (result) {
    return (
      <div style={{ padding: "32px", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ fontSize: "48px", marginBottom: "8px" }}>{result.emoji}</p>
          <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "4px", letterSpacing: "2px" }}>나의 배구 유형은</p>
          <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "16px" }}>{result.type}</h2>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.8, marginBottom: "24px" }}>{result.desc}</p>
          <div style={{ display: "inline-block", padding: "6px 16px", backgroundColor: "#f0f0f0", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#666" }}>
            추천 포지션: {result.position}
          </div>
        </div>

        {/* 추천 선수 */}
        {recommendedPlayer && recommendedTeam && (
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "16px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", marginBottom: "16px", letterSpacing: "1px" }}>이런 선수 스타일이에요</p>
            <img src={recommendedPlayer.image} alt={recommendedPlayer.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 12px", display: "block", border: "3px solid " + recommendedTeam.color }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <p style={{ fontSize: "20px", fontWeight: 900, marginBottom: "4px" }}>{recommendedPlayer.name}</p>
            <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "16px" }}>{recommendedPlayer.team} · {recommendedPlayer.position} · #{recommendedPlayer.number}</p>
          </div>
        )}

        {/* 추천 구단 */}
        {recommendedTeam && (
          <div style={{ backgroundColor: recommendedTeam.color, borderRadius: "16px", padding: "20px 24px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
            <img src={recommendedTeam.emblem} alt={recommendedTeam.shortName} style={{ width: "48px", height: "48px", objectFit: "contain", filter: recommendedTeam.darkLogo ? "brightness(0) invert(1)" : "none" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div>
              <p style={{ fontSize: "11px", color: recommendedTeam.textColor, opacity: 0.7, marginBottom: "2px" }}>추천 구단</p>
              <p style={{ fontSize: "18px", fontWeight: 900, color: recommendedTeam.textColor }}>{recommendedTeam.name}</p>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => { router.push("/players?team=" + result.teamId); }} style={{ flex: 1, padding: "14px", fontSize: "13px", fontWeight: 700, border: "none", borderRadius: "10px", backgroundColor: recommendedTeam?.color || "#000", color: recommendedTeam?.textColor || "#fff", cursor: "pointer" }}>
            {result.teamName} 선수단 보러가기 →
          </button>
          <button onClick={reset} style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 700, border: "none", borderRadius: "10px", backgroundColor: "#f0f0f0", color: "#666", cursor: "pointer" }}>
            다시하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "12px", color: "#aaa", letterSpacing: "2px", marginBottom: "8px" }}>VBTI</p>
        <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "4px" }}>나는 어떤 배구 유형?</h2>
        <p style={{ fontSize: "13px", color: "#aaa" }}>5가지 질문으로 알아보는 나의 배구 성향</p>
      </div>

      {/* 진행 바 */}
      <div style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", height: "6px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#000", borderRadius: "10px", height: "6px", width: ((step / questions.length) * 100) + "%" , transition: "width 0.3s" }} />
      </div>

      <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "12px" }}>{step + 1} / {questions.length}</p>
      <h3 style={{ fontSize: "20px", fontWeight: 900, marginBottom: "32px", lineHeight: 1.4 }}>{questions[step].q}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[
          { label: questions[step].a, type: "a" as const },
          { label: questions[step].b, type: "b" as const },
        ].map((opt) => (
          <button key={opt.type} onClick={() => handleAnswer(opt.type)} style={{ padding: "20px 24px", fontSize: "15px", fontWeight: 600, border: "2px solid #f0f0f0", borderRadius: "12px", backgroundColor: "#fff", color: "#333", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#000"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f0"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
