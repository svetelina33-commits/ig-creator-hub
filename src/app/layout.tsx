import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GlobalChrome } from "@/components/GlobalChrome";
import { MagneticAttach } from "@/components/MagneticAttach";
import { CardInteractive } from "@/components/CardInteractive";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrainsMono.variable} antialiased`}
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
