import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrolling from "@/components/SmoothScrolling";

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
        <LanguageProvider>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </LanguageProvider>
      </body>
    </html>
  );
}
