// Trigger build: 2026-04-10
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrolling from "@/components/SmoothScrolling";
import FloatingCTA from "@/components/ui/FloatingCTA";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Al Durr | A-Frame Intelligent Engineering",
  description: "Design. Rapidez. Eternidade. A sua habitação de engenharia avançada pronta em 6 meses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${cormorant.variable} antialiased bg-aldurr-void text-aldurr-text-heading selection:bg-aldurr-accent selection:text-aldurr-canvas`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8BPXJDE5GW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8BPXJDE5GW');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "whsf4l0yd3");
          `}
        </Script>
        <LanguageProvider>
          <SmoothScrolling>
            {children}
            <FloatingCTA />
          </SmoothScrolling>
        </LanguageProvider>
      </body>
    </html>
  );
}
