"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Something went wrong.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block group">
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
          Email address
        </span>
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
      {error && (
        <p className="text-sm text-vermillion" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="group relative inline-flex items-center gap-3 bg-ink text-paper px-6 py-3 text-[13px] small-caps tracking-[0.2em] hover:bg-forest disabled:opacity-60 transition-colors"
      >
        {loading ? "Reserving your seat…" : "Request membership"}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </form>
  );
}
