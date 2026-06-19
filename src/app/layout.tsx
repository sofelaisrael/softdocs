import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { buildThemeVars } from "@softdocs/core";
import config from "../../softdocs.config";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftDocs — Documentation platform",
  description: "Turn Markdown into beautiful, searchable documentation sites.",
};

const themeVars = buildThemeVars(config);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
