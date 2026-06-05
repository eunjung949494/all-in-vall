"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { teams } from "@/lib/teams";

const suggestions = [
  "리베로가 뭐예요?",
  "배구 포지션 설명해줘",
  "세트 스코어가 뭐야?",
  "서브 종류 알려줘",
  "배구 룰 간단히 설명해줘",
];

export default function Chat() {
  const router = useRouter();
  const [team, setTeam] = useState<typeof teams[0] | null>(null);
  const [messages, setMessages] = useState([
    { role: "bot", text: "안녕하세요! 배구에 대해 궁금한 게 있으면 뭐든 물어보세요 🏐" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) { router.push("/onboarding"); return; }
    const found = teams.find((t) => t.id === savedTeam);
    if (found) setTeam(found);
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "오류가 발생했어요. 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!team) return null;

  return (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 900 }}>AI 챗봇</h2>
        <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>배구 입문자를 위한 AI 가이드</p>
      </div>

      {/* 추천 질문 */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {suggestions.map((s) => (
          <button key={s} onClick={() => sendMessage(s)} style={{ padding: "6px 14px", fontSize: "11px", fontWeight: 600, border: "1px solid #f0f0f0", borderRadius: "20px", backgroundColor: "#fff", color: "#555", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {s}
          </button>
        ))}
      </div>

      {/* 메시지 목록 */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "bot" && (
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: team.color, display: "flex", alignItems: "center", justifyContent: "center", marginRight: "8px", flexShrink: 0 }}>
                <span style={{ fontSize: "14px" }}>🏐</span>
              </div>
            )}
            <div style={{
              maxWidth: "70%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              backgroundColor: msg.role === "user" ? team.color : "#fff",
              color: msg.role === "user" ? team.textColor : "#333",
              fontSize: "13px",
              lineHeight: 1.6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: team.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "14px" }}>🏐</span>
            </div>
            <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: "13px", color: "#aaa" }}>답변 생성 중...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div style={{ display: "flex", gap: "8px", backgroundColor: "#fff", borderRadius: "12px", padding: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="배구에 대해 물어보세요..."
          style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", padding: "8px 12px", fontFamily: "Pretendard, sans-serif" }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{ padding: "8px 20px", fontSize: "13px", fontWeight: 700, border: "none", borderRadius: "8px", backgroundColor: input.trim() ? team.color : "#f0f0f0", color: input.trim() ? team.textColor : "#ccc", cursor: input.trim() ? "pointer" : "not-allowed" }}
        >
          전송
        </button>
      </div>
    </div>
  );
}
