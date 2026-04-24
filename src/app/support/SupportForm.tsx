"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

type PickedFile = {
  file: File;
  key: string;
};

type UploadedAttachment = {
  url: string;
  pathname: string;
  name: string;
  contentType: string;
  size: number;
};

const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "application/pdf",
  "text/plain",
]);

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function fileRejectionReason(file: File): string | null {
  if (file.size > MAX_BYTES) return `over 10 MB`;
  if (!ALLOWED_CONTENT_TYPES.has(file.type)) return `type not allowed`;
  return null;
}

export default function SupportForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [result, setResult] = useState<
    { kind: "ok"; id: string } | { kind: "err"; message: string } | null
  >(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    setFileError(null);
    const next = [...files];
    for (const f of Array.from(incoming)) {
      if (next.length >= MAX_FILES) {
        setFileError(`up to ${MAX_FILES} files per message`);
        break;
      }
      const why = fileRejectionReason(f);
      if (why) {
        setFileError(`${f.name} — ${why}`);
        continue;
      }
      next.push({ file: f, key: `${f.name}-${f.size}-${f.lastModified}` });
    }
    setFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(key: string) {
    setFiles((prev) => prev.filter((p) => p.key !== key));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const uploaded: UploadedAttachment[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadingIdx(i);
        const f = files[i].file;
        const blob = await upload(f.name, f, {
          access: "public",
          handleUploadUrl: "/api/support/blob-upload",
          contentType: f.type,
        });
        uploaded.push({
          url: blob.url,
          pathname: blob.pathname,
          name: f.name,
          contentType: f.type,
          size: f.size,
        });
      }
      setUploadingIdx(null);

      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          body: body.trim(),
          attachments: uploaded,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ kind: "ok", id: data.id });
        setSubject("");
        setBody("");
        setFiles([]);
        router.refresh();
      } else {
        setResult({
          kind: "err",
          message:
            data.error === "invalid_input"
              ? "Subject must be 3+ characters; message 10+ characters."
              : data.error ?? "send_failed",
        });
      }
    } catch (err) {
      setResult({
        kind: "err",
        message: err instanceof Error ? err.message : "network_error",
      });
    } finally {
      setSending(false);
      setUploadingIdx(null);
    }
  }

  const canSubmit =
    !sending && subject.trim().length >= 3 && body.trim().length >= 10;

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="small-caps text-[11px] tracking-[0.22em] text-ink-muted">
        New message to the desk
      </div>

      <label className="block">
        <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
          Subject
        </span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Payout hasn't arrived"
          required
          minLength={3}
          maxLength={160}
          className="nc-input mt-2 w-full"
          disabled={sending}
        />
      </label>

      <label className="block">
        <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
          Message
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell us what's going on. Dates, campaign IDs, screenshots-in-text — all help us resolve it faster."
          required
          minLength={10}
          maxLength={8000}
          rows={8}
          className="nc-input mt-2 w-full resize-y leading-[1.6]"
          disabled={sending}
        />
        <div className="mt-1.5 font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint text-right">
          {body.length.toString().padStart(4, "0")} / 8000
        </div>
      </label>

      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
            Attachments
          </span>
          <span className="font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint">
            {files.length} / {MAX_FILES} · max 10 MB each
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,text/plain"
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
          disabled={sending || files.length >= MAX_FILES}
        />

        <div className="mt-2 rounded-xl border border-dashed border-white/15 bg-white/[0.015] px-4 py-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-[12.5px] text-ink-muted leading-relaxed">
              <span className="font-serif-italic text-ink-soft">Attach</span> images (jpg,
              png, webp, heic), pdf, or plain text.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={sending || files.length >= MAX_FILES}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 transition small-caps text-[10px] tracking-[0.22em] text-ink-soft disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span aria-hidden className="text-[12px] leading-none">+</span>
              Choose file
            </button>
          </div>

          {files.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {files.map((p, i) => {
                const isImg = p.file.type.startsWith("image/");
                const uploading = uploadingIdx === i;
                return (
                  <li
                    key={p.key}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] pl-2 pr-1.5 py-1.5"
                  >
                    <span
                      className="small-caps text-[9px] tracking-[0.22em] text-ink-faint w-8 text-center"
                      aria-hidden
                    >
                      {isImg ? "IMG" : p.file.type === "application/pdf" ? "PDF" : "TXT"}
                    </span>
                    <span className="flex-1 min-w-0 text-[13px] text-ink-soft truncate">
                      {p.file.name}
                    </span>
                    <span className="font-mono-numeric text-[10px] text-ink-faint shrink-0">
                      {formatBytes(p.file.size)}
                    </span>
                    {uploading ? (
                      <span className="small-caps text-[9px] tracking-[0.22em] text-forest shrink-0 px-2">
                        uploading…
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeFile(p.key)}
                        disabled={sending}
                        aria-label={`Remove ${p.file.name}`}
                        className="w-6 h-6 rounded-full text-ink-faint hover:text-vermillion hover:bg-white/[0.04] transition text-[14px] leading-none disabled:opacity-40"
                      >
                        ×
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {fileError && (
            <p className="mt-2 small-caps text-[10px] tracking-[0.22em] text-vermillion">
              ● {fileError}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap pt-1">
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending
            ? uploadingIdx !== null
              ? `Uploading ${uploadingIdx + 1} / ${files.length}…`
              : "Sending…"
            : "Send to the desk"}
          {!sending && <span aria-hidden>→</span>}
        </button>
        {result?.kind === "ok" && (
          <span className="small-caps text-[10px] tracking-[0.22em] text-forest">
            ● sent · thread {result.id.slice(0, 10)}
          </span>
        )}
        {result?.kind === "err" && (
          <span className="small-caps text-[10px] tracking-[0.22em] text-vermillion">
            failed · {result.message}
          </span>
        )}
      </div>
    </form>
  );
}
