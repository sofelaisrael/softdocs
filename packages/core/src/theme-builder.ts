import type { SoftDocsConfig } from "./config";

interface ThemeColors {
  accent: string;
  accentHover: string;
  accentSoft: string;
  accentBorder: string;
  paper: string;
  paperElev: string;
  paperSoft: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  sand: string;
  line: string;
  lineSoft: string;
  pine: string;
}

interface ThemeShadows {
  card: string;
  cardHover: string;
  lift: string;
}

interface ThemeRadii {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

interface ThemeSpacing {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
}

const defaultLight: ThemeColors = {
  accent: "#d85a2b",
  accentHover: "#bb4a20",
  accentSoft: "#fdf0e9",
  accentBorder: "#f0cebe",
  paper: "#fcfbf7",
  paperElev: "#ffffff",
  paperSoft: "#f7f4ee",
  ink: "#1c1b1a",
  inkSoft: "#57534e",
  inkFaint: "#7c756b",
  sand: "#ece8e0",
  line: "#e4e0d7",
  lineSoft: "#f1ede5",
  pine: "#2d5a4a",
};

const defaultDark: ThemeColors = {
  accent: "#ff9066",
  accentHover: "#ffa07a",
  accentSoft: "#2b1a12",
  accentBorder: "#5a2a16",
  paper: "#161514",
  paperElev: "#1e1c1b",
  paperSoft: "#23211f",
  ink: "#e9e5de",
  inkSoft: "#a9a29a",
  inkFaint: "#7a746b",
  sand: "#2a2725",
  line: "#2a2725",
  lineSoft: "#2a2725",
  pine: "#5a9a7a",
};

const defaultShadows: Record<"light" | "dark", ThemeShadows> = {
  light: {
    card: "0 1px 2px rgba(28,27,26,0.05), 0 4px 16px rgba(28,27,26,0.04)",
    cardHover: "0 4px 20px rgba(28,27,26,0.08), 0 1px 3px rgba(28,27,26,0.06)",
    lift: "0 12px 40px rgba(198, 82, 35, 0.13)",
  },
  dark: {
    card: "0 1px 3px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.15)",
    cardHover: "0 4px 20px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
    lift: "0 12px 40px rgba(255, 144, 102, 0.1)",
  },
};

const defaultRadii: ThemeRadii = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "18px",
  full: "9999px",
};

const defaultSpacing: ThemeSpacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
};

function generateColorVars(colors: ThemeColors): string {
  return Object.entries(colors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
}

function generateShadowVars(shadows: ThemeShadows): string {
  return Object.entries(shadows)
    .map(([key, value]) => `  --shadow-${key}: ${value};`)
    .join("\n");
}

function generateRadiusVars(radii: ThemeRadii): string {
  return Object.entries(radii)
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join("\n");
}

function generateSpacingVars(spacing: ThemeSpacing): string {
  return Object.entries(spacing)
    .map(([key, value]) => `  --space-${key}: ${value};`)
    .join("\n");
}

export function buildThemeVars(config: SoftDocsConfig): string {
  const accent = config.theme?.accent ?? defaultLight.accent;

  // Derive accent variations from base accent color
  const lightColors: ThemeColors = {
    ...defaultLight,
    accent,
    accentHover: config.theme?.accentHover ?? defaultLight.accentHover,
    accentSoft: config.theme?.accentSoft ?? defaultLight.accentSoft,
    accentBorder: config.theme?.accentBorder ?? defaultLight.accentBorder,
  };

  const darkColors: ThemeColors = {
    ...defaultDark,
    accent: config.theme?.dark?.accent ?? defaultDark.accent,
    accentHover: config.theme?.dark?.accentHover ?? defaultDark.accentHover,
    accentSoft: config.theme?.dark?.accentSoft ?? defaultDark.accentSoft,
    accentBorder: config.theme?.dark?.accentBorder ?? defaultDark.accentBorder,
  };

  const lightShadows = config.theme?.shadows ?? defaultShadows.light;
  const darkShadows = config.theme?.dark?.shadows ?? defaultShadows.dark;

  return `
:root {
${generateColorVars(lightColors)}
${generateShadowVars(lightShadows as ThemeShadows)}
${generateRadiusVars(defaultRadii)}
${generateSpacingVars(defaultSpacing)}
  --font-body: var(--font-sans), system-ui, -apple-system, sans-serif;
}

[data-theme="dark"] {
${generateColorVars(darkColors)}
${generateShadowVars(darkShadows as ThemeShadows)}
}
`;
}
