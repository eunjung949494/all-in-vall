"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const stadiums = [
  {
    id: 1,
    name: "서울 장충체육관",
    team: "GS칼텍스",
    address: "서울 중구 장충단로 59",
    subway: "3호선 동대입구역 1번 출구 도보 5분",
    bus: "420, 421, 407",
    parking: "장충체육관 주차장 (유료, 협소) — 대중교통 강력 추천",
    tip: "주차 공간이 매우 협소해요. 지하철 이용을 강력히 추천해요. 근처 장충동 족발 골목이 유명해요!",
    lat: 37.5596, lng: 127.0067
  },
  {
    id: 2,
    name: "인천삼산월드체육관",
    team: "흥국생명",
    address: "인천 부평구 체육관로 60",
    subway: "7호선 삼산체육관역 3번 출구 도보 1분",
    bus: "24, 67-1, 87, 1200, 9300",
    parking: "지하 주차장 540면 (유료) — 경기 당일 빨리 차요. 지하철 추천",
    tip: "7호선 삼산체육관역이 체육관 바로 앞이에요. 주차는 경기 시작 2시간 전에 오면 가능해요.",
    lat: 37.5082, lng: 126.7223
  },
  {
    id: 3,
    name: "수원체육관",
    team: "현대건설",
    address: "경기 수원시 장안구 경수대로 893",
    subway: "1호선 수원역 → 버스 환승 약 15분",
    bus: "11, 13, 36, 62",
    parking: "수원체육관 주차장 (무료, 넉넉함)",
    tip: "주차 공간이 넉넉해서 차 가져오셔도 편해요. 수원 통닭거리가 근처예요!",
    lat: 37.2756, lng: 127.0122
  },
  {
    id: 4,
    name: "화성종합경기타운 실내체육관",
    team: "IBK기업은행",
    address: "경기 화성시 향남읍 발안로 246",
    subway: "없음 (자가용 또는 버스 이용)",
    bus: "화성 시내버스 (배차 간격 김)",
    parking: "화성종합경기타운 주차장 (무료, 1000면 이상)",
    tip: "대중교통이 불편해요. 자가용 이용을 추천해요. 주차는 무료이고 넉넉해요.",
    lat: 37.1823, lng: 126.9762
  },
  {
    id: 5,
    name: "대전충무체육관",
    team: "정관장",
    address: "대전 중구 대종로 373",
    subway: "1호선 중앙로역 도보 10분",
    bus: "101, 102, 301, 311",
    parking: "충무체육관 주차장 (유료, 150면)",
    tip: "대전 성심당 본점이 도보 10분 거리예요. 경기 전후로 꼭 들러봐요!",
    lat: 36.3254, lng: 127.4262
  },
  {
    id: 6,
    name: "김천실내체육관",
    team: "한국도로공사",
    address: "경북 김천시 운동장길 5",
    subway: "없음 (KTX 김천구미역 이용 후 택시)",
    bus: "김천 시내버스",
    parking: "김천실내체육관 주차장 (무료, 300면)",
    tip: "KTX 김천구미역에서 택시로 약 15분이에요. 자가용이면 주차 걱정 없어요.",
    lat: 36.1398, lng: 128.1136
  },
  {
    id: 7,
    name: "광주염주체육관",
    team: "페퍼저축은행",
    address: "광주 서구 염주체육관로 47",
    subway: "없음",
    bus: "지원52, 문흥18, 봉선21",
    parking: "염주종합체육관 주차장 (무료, 500면)",
    tip: "광주 상무지구 맛집이 근처에 많아요. 경기 후 상무지구 투어 추천!",
    lat: 35.1588, lng: 126.8652
  },
];

export default function Stadium() {
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

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 900 }}>경기장</h2>
        <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>V리그 여자부 경기장 가이드</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {stadiums.map((stadium) => (
          <div key={stadium.id} onClick={() => setSelected(selected === stadium.id ? null : stadium.id)} style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: selected === stadium.id ? "2px solid " + team.color : "2px solid transparent" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 800 }}>{stadium.name}</p>
                <p style={{ fontSize: "11px", color: "#aaa", marginTop: "3px" }}>{stadium.team}</p>
              </div>
              <span style={{ fontSize: "18px" }}>📍</span>
            </div>

            {selected === stadium.id && (
              <div style={{ marginTop: "16px", borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                  {[
                    { icon: "🚇", label: "지하철", value: stadium.subway },
                    { icon: "🚌", label: "버스", value: stadium.bus },
                    { icon: "🅿️", label: "주차", value: stadium.parking },
                    { icon: "📍", label: "주소", value: stadium.address },
                  ].map((info) => (
                    <div key={info.label} style={{ backgroundColor: "#fafafa", borderRadius: "8px", padding: "10px 12px" }}>
                      <p style={{ fontSize: "10px", color: "#aaa", marginBottom: "4px" }}>{info.icon} {info.label}</p>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "#333", lineHeight: 1.4 }}>{info.value}</p>
                    </div>
                  ))}
                </div>

                <div style={{ backgroundColor: team.color + "11", borderRadius: "8px", padding: "10px 14px", borderLeft: "3px solid " + team.color }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: team.color, marginBottom: "4px" }}>💡 꿀팁</p>
                  <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.5 }}>{stadium.tip}</p>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); window.open("https://map.kakao.com/link/search/" + stadium.name, "_blank"); }}
                  style={{ marginTop: "12px", width: "100%", padding: "10px", fontSize: "12px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: team.color, color: team.textColor, cursor: "pointer" }}>
                  카카오맵에서 보기 →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
