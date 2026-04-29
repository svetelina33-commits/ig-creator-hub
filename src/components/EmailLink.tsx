"use client";

import { useState, type ReactNode } from "react";

type Props = {
  email: string;
  className?: string;
  children?: ReactNode;
  /* Subject line for the mailto: handover. Optional — most callers
     leave it blank so the desk receives a plain note. */
  subject?: string;
};

/**
 * Mailto link with a clipboard fallback. Clicking still opens the
 * user's mail client (default browser behaviour), but the address is
 * also copied to the clipboard so a reader without a configured mail
 * client always walks away with something paste-ready. The link text
 * briefly flips to "Copied · email" so the click registers visibly.
 */
export function EmailLink({ email, className = "", children, subject }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    try {
      navigator.clipboard?.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — mailto: still fires */
    }
  };

  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      data-copied={copied || undefined}
    >
      {copied ? `Copied · ${email}` : (children ?? email)}
    </a>
  );
}
