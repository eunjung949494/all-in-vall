export type Team = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  textColor: string;
  gender: "여자" | "남자";
  emblem: string;
};

export const teams: Team[] = [
  // 여자부
  { id: "gs", name: "GS칼텍스 서울 KIXX", shortName: "GS칼텍스", color: "#003087", textColor: "#ffffff", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/kixx.svg" },
  { id: "heungkuk", name: "흥국생명 핑크스파이더스", shortName: "흥국생명", color: "#E8006A", textColor: "#ffffff", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/pinkspiders.svg" },
  { id: "hyundai", name: "현대건설 힐스테이트", shortName: "현대건설", color: "#FF6B00", textColor: "#ffffff", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/hillstate.svg" },
  { id: "ibk", name: "IBK기업은행 알토스", shortName: "IBK기업은행", color: "#CC0000", textColor: "#ffffff", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/altos.svg" },
  { id: "jeongkwanjang", name: "정관장 레드스파크스", shortName: "정관장", color: "#8B0000", textColor: "#FFD700", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/redsparks.svg" },
  { id: "kepco", name: "한국도로공사 하이패스", shortName: "도로공사", color: "#0052A5", textColor: "#FFD700", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/hipass.svg" },
  { id: "pepper", name: "페퍼저축은행 AI 페퍼스", shortName: "페퍼저축은행", color: "#6B21A8", textColor: "#ffffff", gender: "여자", emblem: "https://cdn.kovo.co.kr/emblems/peppers.svg" },
  // 남자부
  { id: "kalairlines", name: "대한항공 점보스", shortName: "대한항공", color: "#003087", textColor: "#ffffff", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/jumbos.svg" },
  { id: "hyundaicapital", name: "현대캐피탈 스카이워커스", shortName: "현대캐피탈", color: "#FF6600", textColor: "#ffffff", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/skywalkers.svg" },
  { id: "ok", name: "OK금융그룹 읏맨", shortName: "OK금융그룹", color: "#CC0000", textColor: "#ffffff", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/okman.svg" },
  { id: "samsung", name: "삼성화재 블루팡스", shortName: "삼성화재", color: "#1428A0", textColor: "#ffffff", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/bluepangs.svg" },
  { id: "woori", name: "우리카드 우리WON", shortName: "우리카드", color: "#003DA5", textColor: "#ffffff", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/wooriwon.svg" },
  { id: "kepco_m", name: "한국전력 빅스톰", shortName: "한국전력", color: "#00A650", textColor: "#ffffff", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/bigstorm.svg" },
  { id: "kb", name: "KB손해보험 스타즈", shortName: "KB손해보험", color: "#FFCD00", textColor: "#000000", gender: "남자", emblem: "https://cdn.kovo.co.kr/emblems/stars.svg" },
];
