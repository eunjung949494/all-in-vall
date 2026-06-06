import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ text: "API 키가 없어요." });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `너는 배구 입문자를 위한 친절한 AI 가이드야.
          
규칙:
- 마크다운 문법(**, *, #, - 등) 절대 사용하지 마
- 번호 목록은 1. 2. 3. 형식으로만 써
- 어려운 배구 용어는 쉬운 말로 풀어서 설명해
- 짧고 친근하게 답해줘
- 한국어로만 답해줘

질문: ${message}` }] }],
        }),
      }
    );

    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ text: "잠시 후 다시 시도해주세요." });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "다시 질문해주세요.";
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ text: "오류가 발생했어요: " + e.message });
  }
}
