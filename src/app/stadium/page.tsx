"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const stadiums = [
  { id: 1, name: "서울 장충체육관", team: "GS칼텍스 / 흥국생명", address: "서울 중구 장충단로 59", subway: "3호선 동대입구역 1번 출구 도보 5분", bus: "420, 421, 407", parking: "장충체육관 주차장 (유료, 200면)", tip: "주차 공간이 협소해요. 대중교통 이용을 추천해요.", lat: 37.5596, lng: 127.0067 },
  { id: 2, name: "수원체육관", team: "현대건설", address: "경기 수원시 장안구 경수대로 893", subway: "1호선 수원역 → 버스 환승 15분", bus: "11, 13, 36", parking: "수원체육관 주차장 (무료, 500면)", tip: "주차 공간이 넉넉해요. 차 가져오셔도 돼요.", lat: 37.2756, lng: 127.0122 },
  { id: 3, name: "인천삼산월드체육관", team: "IBK기업은행", address: "인천 부평구 삼산동 454-1", subway: "7호선 굴포천역 2번 출구 도보 10분", bus: "6, 11, 23", parking: "삼산월드체육관 주차장 (유료, 300면)", tip: "경기 후 부평 먹자골목 추천해요.", lat: 37.5082, lng: 126.7223 },
  { id: 4, name: "대전충무체육관", team: "정관장", address: "대전 중구 대종로 373", subway: "1호선 중앙로역 도보 10분", bus: "101, 102, 301", parking: "충무체육관 주차장 (유료, 150면)", tip: "대전 성심당 근처예요. 경기 전후로 들러봐요!", lat: 36.3254, lng: 127.4262 },
  { id: 5, name: "화성종합경기타운", team: "한국도로공사", address: "경기 화성시 향남읍 발안로 246", subway: "없음 (자가용 추천)", bus: "화성 시내버스", parking: "화성종합경기타운 주차장 (무료, 1000면)", tip: "대중교통이 불편해요. 차를 가져오시는 걸 추천해요.", lat: 37.1823, lng: 126.9762 },
  { id: 6, name: "김천실내체육관", team: "페퍼저축은행 (원정)", address: "경북 김천시 운동장길 5", subway: "없음 (KTX 김천구미역 이용)", bus: "김천 시내버스", parking: "김천실내체육관 주차장 (무료, 300면)", tip: "KTX 김천구미역에서 택시로 15분 거리예요.", lat: 36.1398, lng: 128.1136 },
  { id: 7, name: "광주페퍼스타디움", team: "페퍼저축은행", address: "광주 북구 무등로 440", subway: "없음", bus: "518, 419", parking: "페퍼스타디움 주차장 (무료, 400면)", tip: "광주 충장로 먹거리 거리가 근처예요.", lat: 35.1667, lng: 126.9022 },
];

export default function Stadium() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [selected, setSelected] = useState(null);

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

            {/* 헤더 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 800 }}>{stadium.name}</p>
                <p style={{ fontSize: "11px", color: "#aaa", marginTop: "3px" }}>{stadium.team}</p>
              </div>
              <span style={{ fontSize: "18px" }}>📍</span>
            </div>

            {/* 상세 정보 */}
            {selected === stadium.id && (
              <div style={{ marginTop: "16px", borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
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

                {/* 꿀팁 */}
                <div style={{ backgroundColor: team.color + "11", borderRadius: "8px", padding: "10px 14px", borderLeft: "3px solid " + team.color }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: team.color, marginBottom: "4px" }}>💡 꿀팁</p>
                  <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.5 }}>{stadium.tip}</p>
                </div>

                {/* 지도 버튼 */}
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
