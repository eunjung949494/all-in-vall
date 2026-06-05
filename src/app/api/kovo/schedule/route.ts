import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://user-api.kovo.co.kr/mains/games/schedules",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
          "Referer": "https://kovo.co.kr/",
          "Origin": "https://kovo.co.kr",
          "Accept": "application/json, text/plain, */*",
          "x-service-name": "user",
        },
      }
    );

    const text = await res.text();
    return NextResponse.json({ status: res.status, body: text.slice(0, 500) });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
