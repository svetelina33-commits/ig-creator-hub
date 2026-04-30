import type { Metadata } from "next";
import {
  Newsreader,
  Instrument_Serif,
  Schibsted_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { GlobalChrome } from "@/components/GlobalChrome";
import { MagneticAttach } from "@/components/MagneticAttach";
import { CardInteractive } from "@/components/CardInteractive";
import { ShootingStars } from "@/components/ShootingStars";
import DesktopGate from "@/components/DesktopGate";

/* Display: Newsreader (Production Type, OFL) — editorial serif with an
   optical sizing axis (opsz 6→72). Designed for long-form reading and
   pulls a quietly-authoritative magazine register at display sizes.
   Different category from grotesque-display; reads like a masthead. */
const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

/* Italic accent: Instrument Serif (Instrument Type, OFL) — italic-only
   display serif. Used for the stressed words in display heads
   ("Privacy, plainly.", "from the desk", "in writing") where Cormorant
   sat. Pairs cleanly with Newsreader at headline sizes. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

/* Body: Schibsted Grotesk (Henrik Kubel for Schibsted, OFL) — humanist
   grotesque originally drawn for the Schibsted news group's editorial
   identity. Variable weight 400→900. Reads more characterful than Inter
   or Onest while keeping screen legibility. */
const schibsted = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Mono numerics: JetBrains Mono — kept. Tabular figures and editorial
   register fits the small-caps + roman-numeral framing across the site. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Club — a private network for creators",
  description:
    "A members' club where creators with distinctive voices meet brand campaigns that respect them.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-SG"
      className={`${newsreader.variable} ${instrumentSerif.variable} ${schibsted.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <ShootingStars />
        <MagneticAttach />
        <CardInteractive />
        {children}
        <GlobalChrome />
        <DesktopGate />
      </body>
    </html>
  );
}
