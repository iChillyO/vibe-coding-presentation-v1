/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0f",
                surface: "rgba(15, 23, 42, 0.7)",
                lapis: {
                    DEFAULT: "#2563eb",
                    light: "#60a5fa",
                },
                neon: {
                    cyan: "#22d3ee",
                    purple: "#a855f7",
                },
                slate: {
                    950: "#0a0a0f",
                    900: "#0f172a",
                },
                text: {
                    primary: "#f8fafc",
                    secondary: "#94a3b8",
                    muted: "#64748b",
                }
            },
            fontFamily: {
                presentation: ["var(--font-almarai)", "Inter", "sans-serif"],
            },
            fontSize: {
                'hero': ['5rem', { lineHeight: '1.2', fontWeight: '900', letterSpacing: '-0.02em' }],
                'section-title': ['3.5rem', { lineHeight: '1.2', fontWeight: '800', letterSpacing: '-0.02em' }],
            },
        },
    },
    plugins: [],
};
