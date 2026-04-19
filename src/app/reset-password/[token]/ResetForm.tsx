"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not reset.");
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1200);
  }

  if (done) {
    return (
      <div className="hairline-top hairline-bottom py-8">
        <p className="font-serif-italic text-2xl text-forest">Done. Sending you to sign in…</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <Field
        label="New password"
        value={password}
        onChange={setPassword}
        placeholder="Minimum 8 characters"
      />
      <Field
        label="Confirm new password"
        value={confirm}
        onChange={setConfirm}
        placeholder="Type it again"
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
        {loading ? "Saving…" : "Save new password"}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
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
          type="password"
          minLength={8}
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
