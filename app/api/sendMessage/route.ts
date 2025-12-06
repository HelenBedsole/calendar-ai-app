// app/api/sendMessage/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  // Get the session with Google access token
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // FIX: NextAuth stores the access token here
  const accessToken = (session as any).accessToken;

  console.log("GOOGLE ACCESS TOKEN:", accessToken);

  if (!accessToken) {
    return NextResponse.json(
      { error: "No Google access token found in session" },
      { status: 500 }
    );
  }

  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }

  try {
    const webhookURL = process.env.N8N_WEBHOOK_URL!;
    const n8nRes = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        googleAccessToken: accessToken,
        user: {
          email: session.user?.email,
          name: session.user?.name,
        },
      }),
    });

    if (!n8nRes.ok) {
      const txt = await n8nRes.text();
      console.error("n8n error:", txt);
      return NextResponse.json(
        { error: "n8n webhook failed", details: txt },
        { status: 500 }
      );
    }

    const data = await n8nRes.json().catch(() => ({}));

    return NextResponse.json({
      reply: data.reply ?? "Done.",
      raw: data,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}

