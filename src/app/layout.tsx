import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awesome Experiences — Personalised Trips of a Lifetime",
  description:
    "The fastest and easiest way to book personalised trips of a lifetime. AI-powered travel, ATOL protected.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="stylesheet" href="/chat-widget-v4.css" />
      </head>
      <body>
        {children}
        <script src="/chat-widget-v4.js" async></script>
      </body>
    </html>
  );
}
