import type { Metadata } from "next";
import { Inter, Almarai } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const almarai = Almarai({
    subsets: ["arabic"],
    weight: ["300", "400", "700", "800"],
    variable: "--font-almarai"
});

export const metadata: Metadata = {
    title: "Vibe Coding: Directing, Not Typing",
    description: "A cinematic presentation about the future of coding with AI.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" className={`${inter.variable} ${almarai.variable}`} suppressHydrationWarning>
            <body className="antialiased selection:bg-neon-cyan selection:text-black">
                {children}
            </body>
        </html>
    );
}
