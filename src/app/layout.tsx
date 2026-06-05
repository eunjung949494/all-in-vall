import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
        <div style={{
          display: "flex",
          minHeight: "100vh",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#fff",
          boxShadow: "0 0 40px rgba(0,0,0,0.08)",
        }}>
          <Sidebar />
          <main style={{ flex: 1, backgroundColor: "#fafafa", minHeight: "100vh" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
