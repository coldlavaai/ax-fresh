import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
              {/* Cold Lava Demo Tracking */}
        <meta name="cl-job" content="AXF-001" />
        <Script id="cl-tracking" strategy="afterInteractive">
          {`(function(){
            var job = document.querySelector('meta[name="cl-job"]');
            var jobNum = job ? job.content : window.location.hostname.split('.')[0];
            var img = new Image();
            img.src = 'https://track.coldlava.ai/pixel/' + encodeURIComponent(jobNum) + '?t=' + Date.now() + '&r=' + encodeURIComponent(document.referrer);
          })();`}
        </Script>
      </body>
    </html>
  );
}
