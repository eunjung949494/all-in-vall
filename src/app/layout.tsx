import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALL IN VALL",
  description: "배구 팬을 위한 AI 기반 올인원 웹서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: "#f5f5f5", fontFamily: "Pretendard, -apple-system, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh", maxWidth: "1200px", margin: "0 auto", backgroundColor: "#fff", boxShadow: "0 0 40px rgba(0,0,0,0.08)" }}>
          
          {/* 사이드바 */}
          <aside style={{ width: "220px", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
            
            {/* 로고 */}
            <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #f0f0f0" }}>
              <h1 style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "2px", color: "#000" }}>ALL IN VALL</h1>
              <p style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>배구 정보, 한 곳에서</p>
            </div>

            {/* 구단 배지 - 클라이언트 컴포넌트에서 처리 */}
            <div id="team-badge" style={{ margin: "14px 16px 0" }} />

            {/* 네비게이션 */}
            <nav style={{ padding: "12px 12px", flex: 1 }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#ccc", letterSpacing: "1px", padding: "0 8px", marginBottom: "6px" }}>MENU</p>
              {[
                { href: "/", label: "홈", icon: "🏠" },
                { href: "/games", label: "경기", icon: "🏐" },
                { href: "/players", label: "선수", icon: "⭐" },
                { href: "/stadium", label: "경기장", icon: "📍" },
                { href: "/chat", label: "챗봇", icon: "💬" },
              ].map((item) => (
                <a key={item.href} href={item.href} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#999",
                  textDecoration: "none",
                  marginBottom: "2px",
                  borderRadius: "8px",
                }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* 메인 콘텐츠 */}
          <main style={{ flex: 1, backgroundColor: "#fafafa", minHeight: "100vh" }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
