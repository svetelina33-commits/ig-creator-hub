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
    <form onSubmit={submit} className="space-y-6">
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@your-domain.com"
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
      />
      {error && (
        <p className="text-sm text-vermillion" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-3 bg-ink text-paper px-6 py-3 text-[13px] small-caps tracking-[0.2em] hover:bg-forest disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Enter"}
        <span aria-hidden>→</span>
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
    <label className="block group">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <div className="mt-2 relative">
        <input
          required
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border-0 border-b border-hairline-strong bg-transparent pb-2 text-xl font-serif-display text-ink placeholder:text-ink-faint focus:border-forest focus:outline-none"
        />
        <span className="absolute -bottom-px left-0 h-[2px] w-0 bg-forest transition-all duration-300 group-focus-within:w-full" />
      </div>
    </label>
  );
}
