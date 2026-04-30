import type { Block } from "@/lib/help-articles";

/* Renders the structured Block[] of a help article.
   Stays plain on purpose — articles are reference material, not hero copy. */
export function HelpArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[15.5px] leading-[1.75] text-ink-soft font-serif-book">
      {blocks.map((block, i) => (
        <BlockRender key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRender({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h":
      return (
        <h2 className="font-serif-display text-[22px] sm:text-[26px] text-ink leading-[1.25] tracking-tight pt-3 mt-2">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
              <span aria-hidden className="text-violet/60 text-[10px] mt-[7px]">
                ●
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
              <span className="font-mono-numeric text-[11px] tracking-[0.18em] text-violet/65 w-7 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const tone = block.tone ?? "ink";
      const palette = {
        gold: {
          bg: "rgba(125,90,255,0.06)",
          border: "rgba(125,90,255,0.28)",
          text: "rgb(231 206 148 / 0.95)",
          dot: "bg-violet",
          dotShadow: "0 0 6px rgba(125,90,255,0.55)",
        },
        ink: {
          bg: "rgba(255,255,255,0.025)",
          border: "rgba(255,255,255,0.12)",
          text: "rgb(215 212 226 / 0.95)",
          dot: "bg-ink-soft",
          dotShadow: "0 0 6px rgba(215,212,226,0.4)",
        },
        vermillion: {
          bg: "rgba(255,94,103,0.06)",
          border: "rgba(255,94,103,0.32)",
          text: "rgb(255 134 140 / 0.95)",
          dot: "bg-vermillion",
          dotShadow: "0 0 6px rgba(255,94,103,0.55)",
        },
      }[tone];

      return (
        <aside
          className="rounded-xl px-5 py-4 my-3 flex items-start gap-4"
          style={{ background: palette.bg, boxShadow: `inset 0 0 0 1px ${palette.border}` }}
        >
          <span
            aria-hidden
            className={`mt-[9px] block w-1.5 h-1.5 rounded-full ${palette.dot} shrink-0`}
            style={{ boxShadow: palette.dotShadow }}
          />
          <p
            className="text-[14px] leading-[1.65] m-0"
            style={{ color: palette.text }}
          >
            {block.text}
          </p>
        </aside>
      );
    }
    case "code":
      return (
        <code className="block font-mono-numeric text-[12.5px] text-violet/85 px-3 py-2 rounded-md break-all"
          style={{
            background: "rgba(125,90,255,0.05)",
            boxShadow: "inset 0 0 0 1px rgba(125,90,255,0.2)",
          }}
        >
          {block.text}
        </code>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-violet/40 pl-5 italic text-ink-muted">
          {block.text}
          {block.cite && (
            <cite className="block mt-2 not-italic small-caps text-[10px] tracking-[0.28em] text-ink-faint">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}
