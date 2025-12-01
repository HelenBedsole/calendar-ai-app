// app/page.tsx
"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorText =
          data?.error ?? "Something went wrong talking to the assistant.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ ${errorText}` },
        ]);
      } else {
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.reply ?? "Done.",
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Network error: ${error?.message ?? "Unknown error"}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  if (status === "loading") {
    return <div className="text-lg">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 shadow-xl border border-slate-800 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold text-center">
          AI Google Calendar Assistant
        </h1>
        <p className="text-sm text-slate-300 text-center">
          Sign in with Google so the assistant can read and update your
          calendar on your behalf.
        </p>
        <button
          onClick={() => signIn("google")}
          className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 shadow-xl border border-slate-800 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">AI Calendar Assistant</h1>
          <p className="text-xs text-slate-400">
            Logged in as {session.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-xs rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800"
        >
          Sign out
        </button>
      </header>

      <div className="flex-1 min-h-[250px] max-h-[420px] overflow-y-auto rounded-xl bg-slate-950/40 border border-slate-800 p-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-slate-400">
            Try: <span className="font-mono">“Add a meeting on Friday from 6–7pm”</span>{" "}
            or <span className="font-mono">“What’s on my calendar tomorrow?”</span>
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${
                m.role === "user"
                  ? "bg-blue-500/90 text-white"
                  : "bg-slate-800 text-slate-50"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isSending) handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask me to add/update/delete events in your Google Calendar…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending}
          className="px-4 py-2 rounded-xl bg-blue-500 text-sm font-medium text-white disabled:opacity-60 hover:bg-blue-400 transition"
        >
          {isSending ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}

