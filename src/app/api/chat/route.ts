import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ text: "API 키가 없어요: " + JSON.stringify(Object.keys(process.env).filter(k => k.includes('GEMINI'))) });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `너는 배구 전문 AI 어시스턴트야. 한국어로 짧게 답해줘. 질문: ${message}` }] }],
        }),
      }
    );

    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ text: "Gemini 에러: " + data.error.message });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답 없음";
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ text: "에러: " + e.message });
  }
}
