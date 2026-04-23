import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Onest,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { GlobalChrome } from "@/components/GlobalChrome";
import { MagneticAttach } from "@/components/MagneticAttach";
import { CardInteractive } from "@/components/CardInteractive";

/* Display: Bricolage Grotesque — geometric grotesque with width + optical
   sizing axes. Architectural, characterful, a different category from
   the classical serifs we were using. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

/* Italic accent: Cormorant Garamond (italic only) — classical italic
   against geometric grotesque is a premium editorial contrast. */
const cormorant = Cormorant_Garamond({
  variable: "--font-italic",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

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
      lang="en"
      className={`${bricolage.variable} ${cormorant.variable} ${onest.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <MagneticAttach />
        <CardInteractive />
        {children}
        <GlobalChrome />
      </body>
    </html>
  );
}
