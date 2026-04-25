import sharp from "sharp";
import { writeFile } from "fs/promises";

// 180x180 — Apple touch icon size. Inline SVG so we control rasterisation.
// Use a system serif font fallback for the italic N (rasterised at build, so
// runtime font-loading isn't an issue). Path-rendered violet dot.
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#13131a"/>
      <stop offset="100%" stop-color="#0a0a10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="rgba(125,90,255,0.22)"/>
      <stop offset="100%" stop-color="rgba(125,90,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="180" height="180" rx="40" ry="40" fill="url(#bg)"/>
  <rect width="180" height="180" rx="40" ry="40" fill="url(#glow)"/>
  <rect x="6" y="6" width="168" height="168" rx="34" ry="34" fill="none"
        stroke="rgba(240,238,246,0.22)" stroke-width="1.4"/>
  <rect x="14" y="14" width="152" height="152" rx="26" ry="26" fill="none"
        stroke="rgba(240,238,246,0.07)" stroke-width="1"/>
  <text
    x="78"
    y="128"
    text-anchor="middle"
    font-family="'Cormorant Garamond', 'EB Garamond', 'Iowan Old Style', 'Hoefler Text', Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-weight="500"
    font-size="130"
    fill="#F0EEF6"
  >N</text>
  <circle cx="124" cy="120" r="9" fill="#9b7bff"/>
</svg>`;

const out = "/Users/yashpanchal/ig-creator-hub/src/app/apple-icon.png";
await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(out);
console.log("wrote", out);
