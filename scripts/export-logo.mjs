import sharp from "sharp";
import { mkdir } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

const sealSvg = (px) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}">
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
  <rect width="${px}" height="${px}" rx="${px * 0.222}" ry="${px * 0.222}" fill="url(#bg)"/>
  <rect width="${px}" height="${px}" rx="${px * 0.222}" ry="${px * 0.222}" fill="url(#glow)"/>
  <rect x="${px * 0.033}" y="${px * 0.033}" width="${px * 0.933}" height="${px * 0.933}" rx="${px * 0.189}" ry="${px * 0.189}" fill="none"
        stroke="rgba(240,238,246,0.22)" stroke-width="${px * 0.0078}"/>
  <rect x="${px * 0.078}" y="${px * 0.078}" width="${px * 0.844}" height="${px * 0.844}" rx="${px * 0.144}" ry="${px * 0.144}" fill="none"
        stroke="rgba(240,238,246,0.07)" stroke-width="${px * 0.0055}"/>
  <text
    x="${px * 0.433}"
    y="${px * 0.711}"
    text-anchor="middle"
    font-family="'Cormorant Garamond', 'EB Garamond', 'Iowan Old Style', 'Hoefler Text', Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-weight="500"
    font-size="${px * 0.722}"
    fill="#F0EEF6"
  >N</text>
  <circle cx="${px * 0.689}" cy="${px * 0.667}" r="${px * 0.05}" fill="#9b7bff"/>
</svg>`;

// Brand mark only (no card) — transparent background, large N + punctum.
const markSvg = (px) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}">
  <text
    x="${px * 0.46}"
    y="${px * 0.78}"
    text-anchor="middle"
    font-family="'Cormorant Garamond', 'EB Garamond', 'Iowan Old Style', 'Hoefler Text', Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-weight="500"
    font-size="${px * 0.95}"
    fill="#F0EEF6"
  >N</text>
  <circle cx="${px * 0.74}" cy="${px * 0.72}" r="${px * 0.06}" fill="#9b7bff"/>
</svg>`;

// Nameplate — wide format, "Nexus" italic + "CLUB" small caps.
const namePlateSvg = (w, h) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <text
    x="${w * 0.04}"
    y="${h * 0.72}"
    text-anchor="start"
    font-family="'Cormorant Garamond', 'EB Garamond', 'Iowan Old Style', 'Hoefler Text', Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-weight="500"
    font-size="${h * 0.78}"
    fill="#F0EEF6"
  >Nexus</text>
  <text
    x="${w * 0.61}"
    y="${h * 0.65}"
    text-anchor="start"
    font-family="ui-monospace, 'SF Mono', Menlo, monospace"
    font-weight="500"
    font-size="${h * 0.21}"
    letter-spacing="${h * 0.05}"
    fill="rgba(215, 212, 226, 0.8)"
  >CLUB</text>
</svg>`;
};

const outDir = join(homedir(), "Downloads", "nexus-club-logo");
await mkdir(outDir, { recursive: true });

const exports = [
  { name: "nexus-seal-512.png",        svg: sealSvg(512),  size: { w: 512,  h: 512  } },
  { name: "nexus-seal-1024.png",       svg: sealSvg(1024), size: { w: 1024, h: 1024 } },
  { name: "nexus-seal-2048.png",       svg: sealSvg(2048), size: { w: 2048, h: 2048 } },
  { name: "nexus-mark-512-transparent.png",  svg: markSvg(512),  size: { w: 512,  h: 512  } },
  { name: "nexus-mark-2048-transparent.png", svg: markSvg(2048), size: { w: 2048, h: 2048 } },
  { name: "nexus-nameplate-1600x400.png", svg: namePlateSvg(1600, 400), size: { w: 1600, h: 400 } },
];

for (const e of exports) {
  const out = join(outDir, e.name);
  await sharp(Buffer.from(e.svg))
    .resize(e.size.w, e.size.h)
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log("wrote", out);
}

console.log("\nFolder:", outDir);
