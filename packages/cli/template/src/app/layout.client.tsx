"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
