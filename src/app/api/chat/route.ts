import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `너는 배구 전문 AI 어시스턴트야. 배구 입문자도 쉽게 이해할 수 있도록 친절하고 쉽게 설명해줘. 
                배구 룰, 포지션, 용어, 선수, 경기 등에 관한 질문에 답해줘.
                한국어로 대답하고, 너무 길지 않게 핵심만 설명해줘.
                
                사용자 질문: ${message}`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "죄송해요, 다시 질문해주세요.";

  return NextResponse.json({ text });
}
