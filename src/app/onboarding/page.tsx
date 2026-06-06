"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

export default function Onboarding() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [gender, setGender] = useState<"여자" | "남자">("여자");

  const filtered = teams.filter((t) => t.gender === gender);
  const selectedTeam = teams.find((t) => t.id === selected);

  const handleConfirm = () => {
    if (!selected) return;
    localStorage.setItem("team", selected);
    router.push("/");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#aaa", letterSpacing: "2px", marginBottom: "8px" }}>ALL IN VALL</p>
          <h1 style={{ fontSize: "28px", fontWeight: 900, lineHeight: 1.3, color: "#000" }}>응원하는 구단을<br />선택해주세요</h1>
          <p style={{ fontSize: "13px", color: "#aaa", marginTop: "8px" }}>구단 컬러로 ALL IN VALL이 꾸며져요</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", backgroundColor: "#f0f0f0", padding: "4px", borderRadius: "10px" }}>
          {(["여자", "남자"] as const).map((g) => (
            <button key={g} onClick={() => { setGender(g); setSelected(null); }} style={{ flex: 1, padding: "10px", fontSize: "13px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: gender === g ? "#fff" : "transparent", color: gender === g ? "#000" : "#aaa", cursor: "pointer", boxShadow: gender === g ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}>
              {g}배구
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {filtered.map((team) => (
            <button key={team.id} onClick={() => setSelected(team.id)} style={{ padding: "16px", border: selected === team.id ? "2px solid " + team.color : "2px solid #f0f0f0", borderRadius: "12px", backgroundColor: selected === team.id ? team.color : "#fff", color: selected === team.id ? team.textColor : "#000", cursor: "pointer", textAlign: "left", transition: "all 0.15s", boxShadow: selected === team.id ? "0 4px 12px " + team.color + "44" : "0 1px 4px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={team.emblem} alt={team.shortName} style={{ width: "36px", height: "36px", objectFit: "contain", filter: selected === team.id ? "brightness(0) invert(1)" : "none" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800 }}>{team.shortName}</p>
                <p style={{ fontSize: "10px", opacity: 0.7, marginTop: "2px" }}>{team.gender}부</p>
              </div>
            </button>
          ))}
        </div>

        <button onClick={handleConfirm} disabled={!selected} style={{ width: "100%", padding: "16px", fontSize: "15px", fontWeight: 800, border: "none", borderRadius: "12px", backgroundColor: selected ? selectedTeam?.color || "#000" : "#f0f0f0", color: selected ? selectedTeam?.textColor || "#fff" : "#ccc", cursor: selected ? "pointer" : "not-allowed", transition: "all 0.15s", boxShadow: selected ? "0 4px 16px " + (selectedTeam?.color || "#000") + "66" : "none" }}>
          {selected ? selectedTeam?.shortName + " 팬으로 시작하기 →" : "구단을 선택해주세요"}
        </button>
      </div>
    </div>
  );
}
