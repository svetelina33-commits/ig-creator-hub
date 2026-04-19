"use client";

import { useState } from "react";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="hairline-top hairline-bottom py-8">
        <p className="font-serif-italic text-2xl text-forest">
          If that address is on file, a reset note is on its way.
        </p>
        <p className="mt-3 text-[14px] text-ink-muted">
          Check your inbox (and the spam folder). The link is valid for 60 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <label className="block group">
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">Email</span>
        <div className="mt-2 relative">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@your-domain.com"
            className="w-full border-0 border-b border-hairline-strong bg-transparent pb-2 text-xl font-serif-display text-ink placeholder:text-ink-faint focus:border-forest focus:outline-none"
          />
          <span className="absolute -bottom-px left-0 h-[2px] w-0 bg-forest transition-all duration-300 group-focus-within:w-full" />
        </div>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-3 bg-ink text-paper px-6 py-3 text-[13px] small-caps tracking-[0.2em] hover:bg-forest disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send reset link"}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
