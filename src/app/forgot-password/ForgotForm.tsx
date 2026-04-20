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
      <div className="glass rounded-2xl p-6">
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
    <form onSubmit={submit} className="glass rounded-2xl p-6 space-y-5">
      <label className="block">
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@your-domain.com"
          className="nc-input mt-2 w-full text-[15px]"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full text-[12px] tracking-wide disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send reset link"}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
