"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleGlyph } from "@/components/GoogleGlyph";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
    <div className="space-y-5">
      <a
        href="/api/auth/google/start?scope=basic"
        className="btn-ghost w-full justify-center px-5 py-3 rounded-full text-[13px] gap-3"
      >
        <GoogleGlyph />
        Continue with Google
      </a>

      <div className="flex items-center gap-3 text-[10px] small-caps tracking-[0.3em] text-ink-faint">
        <span className="flex-1 border-t border-white/10" />
        <span>or</span>
        <span className="flex-1 border-t border-white/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@your-domain.com"
        />
        <Field
          label="Choose a password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Minimum 8 characters"
          minLength={8}
        />
        {error && (
          <p className="text-sm text-vermillion" role="alert">
            {error}
          </p>
        )}
        <div className="flex items-center justify-between pt-1 gap-3 flex-wrap">
          <Link
            href="/login"
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
          >
            Already a member? Sign in →
          </Link>
          <button
            type="submit"
            disabled={loading}
            data-magnetic
            className="btn-primary nc-magnetic inline-flex items-center gap-3 px-6 py-3 rounded-full text-[12px] tracking-wide disabled:opacity-60"
          >
            {loading && <span className="nc-spinner" aria-hidden />}
            {loading ? "Reserving your seat…" : "Request membership"}
            {!loading && <span aria-hidden>→</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  minLength,
}: {
  label: string;
  type: "email" | "password";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        required
        type={type}
        value={value}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="nc-input mt-2 w-full text-[16px]"
      />
    </label>
  );
}

