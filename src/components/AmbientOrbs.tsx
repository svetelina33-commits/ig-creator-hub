export function AmbientOrbs() {
  return (
    <div
      aria-hidden
      /* overflow-x-clip prevents the orbs (top: -10%, bottom: -12%,
         left: -8%, right: -5%) from causing horizontal scroll, while
         letting their blurred tails dissolve into adjacent sections
         vertically. Plain `overflow-hidden` was clipping the cyan
         orb at the hero's bottom edge as a hard horizontal band. */
      className="pointer-events-none absolute inset-0 overflow-x-clip"
      style={{ zIndex: -1 }}
    >
      <span
        className="nc-orb nc-orb--violet nc-orb--orbit-a"
        style={{ top: "-10%", right: "-5%", width: "42%", aspectRatio: "1/1" }}
      />
      <span
        className="nc-orb nc-orb--cyan nc-orb--orbit-b"
        style={{
          bottom: "-12%",
          left: "-8%",
          width: "38%",
          aspectRatio: "1/1",
          animationDelay: "-6s, -4s",
        }}
      />
      <span
        className="nc-orb nc-orb--peach nc-orb--orbit-c"
        style={{
          top: "38%",
          left: "32%",
          width: "22%",
          aspectRatio: "1/1",
          animationDelay: "-12s, -8s",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
