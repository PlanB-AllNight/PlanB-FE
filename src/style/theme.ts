export const theme = {
    colors: {
        primary: {
            200: "#86E7D4",
            300: "#5EEAD4",
            400: "#0D9488",
            500: "#0F766E",
        },

        background: "#F9FAFB",
        fontPrimary: "#1E1E1E",
        fontSecondary: "#6B7280",
        gray: "#E5E7EB",
    },
    font: {
        family: `'Inter', system-ui, sans-serif`,
    },
} as const;

export type ThemeType = typeof theme;