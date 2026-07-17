import type { Metadata } from "next";
import { buildThemeVars } from "@versio/core";
import config from "@/versio.config";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { BackToTop } from "@/components/BackToTop";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Versio - Versioned Documentation, beautifully simple",
  description:
    "Turn Markdown into beautiful, searchable documentation sites with first-class versioning.",
};

const themeVars = buildThemeVars(config);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html:not([data-theme]) body { visibility: hidden; }
          html[data-theme] body { visibility: visible; }
        `,
          }}
        />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
        <BackToTop />
      </body>
    </html>
  );
}
