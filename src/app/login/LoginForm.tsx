"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not sign in.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@your-domain.com" />
      <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
      {error && (
        <p className="text-sm text-vermillion" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full text-[12px] tracking-wide disabled:opacity-60"
      >
        {loading && <span className="nc-spinner" aria-hidden />}
        {loading ? "Signing in…" : "Enter"}
        {!loading && <span aria-hidden>→</span>}
      </button>
    </form>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: "email" | "password";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="nc-input mt-2 w-full text-[15px]"
      />
    </label>
  );
}
