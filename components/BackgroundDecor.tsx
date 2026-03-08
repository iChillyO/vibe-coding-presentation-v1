"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Ring, TriangleOutline, WireframeCube, FloatingPanel, FloatingShape, Square, PlusSign } from "./BackgroundShapes";

interface BackgroundDecorProps {
    activeSection?: number;
}

export const BackgroundDecor: React.FC<BackgroundDecorProps> = ({ activeSection = 0 }) => {
    const [stars, setStars] = React.useState<{ top: string; left: string; duration: number }[]>([]);

    React.useEffect(() => {
        setStars([...Array(15)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 8 + 5
        })));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {/* GLOBAL WHITE SHAPES */}
            <FloatingShape parallaxY={-150} className="top-[15%] left-[15%] opacity-[0.03]">
                <Square size={40} color="border-white" />
            </FloatingShape>
            <FloatingShape parallaxY={100} className="bottom-[25%] right-[20%] opacity-[0.03]">
                <PlusSign size={30} color="text-white" />
            </FloatingShape>
            <FloatingShape parallaxY={-200} className="top-[60%] left-[5%] opacity-[0.02]">
                <Ring size={150} color="border-white" />
            </FloatingShape>
            <FloatingShape parallaxY={180} className="top-[40%] right-[35%] opacity-[0.02]">
                <PlusSign size={20} color="text-white" />
            </FloatingShape>

            {/* GLOBAL ATMOSPHERIC ELEMENTS */}
            <motion.div
                animate={{ x: [0, 50, -30, 0], y: [0, -80, 40, 0] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="bg-orb w-[800px] h-[800px] bg-lapis/20 top-[-20%] right-[-10%]"
            />
            <motion.div
                animate={{ x: [0, -40, 60, 0], y: [0, 100, -50, 0] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="bg-orb w-[700px] h-[700px] bg-neon-purple/20 bottom-[-20%] left-[-10%]"
            />

            {/* SECTION-SPECIFIC PARALLAX COMPOSITIONS */}

            {/* 1. HERO - Large ethereal ring and floating fragments */}
            <AnimatePresence>
                {activeSection === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <FloatingShape parallaxY={-200} className="top-[20%] right-[10%]">
                            <Ring size={500} />
                        </FloatingShape>
                        <FloatingShape parallaxY={150} className="bottom-[15%] left-[5%]">
                            <TriangleOutline size={150} />
                        </FloatingShape>
                        <FloatingShape parallaxY={-50} className="top-[40%] left-[20%]">
                            <WireframeCube size={80} color="border-neon-purple/20" />
                        </FloatingShape>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. MECHANISM / HOW IT WORKS - Structured geometry */}
            <AnimatePresence>
                {(activeSection >= 1 && activeSection <= 2) && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <FloatingShape parallaxY={-100} className="top-[10%] left-[10%]">
                            <WireframeCube size={200} />
                        </FloatingShape>
                        <FloatingShape parallaxY={200} className="bottom-[20%] right-[5%]">
                            <Ring size={400} color="border-neon-cyan/10" />
                        </FloatingShape>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lapis/10 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. TOOLS - Grid fragments and techy rings */}
            <AnimatePresence>
                {(activeSection >= 3 && activeSection <= 5) && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <FloatingShape parallaxY={-150} className="top-[30%] right-[15%]">
                            <FloatingPanel width={300} height={400} className="rotate-12" />
                        </FloatingShape>
                        <FloatingShape parallaxY={120} className="bottom-[10%] left-[10%]">
                            <div className="flex gap-4">
                                <Ring size={100} />
                                <Ring size={80} />
                                <Ring size={60} />
                            </div>
                        </FloatingShape>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. FUNDAMENTALS - Grounded, slower motion */}
            <AnimatePresence>
                {activeSection === 7 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <FloatingShape parallaxY={-50} className="top-[20%] left-1/2 -translate-x-1/2">
                            <Ring size={1200} color="border-white/2" />
                        </FloatingShape>
                        <FloatingShape parallaxY={80} className="bottom-[5%] left-[20%] grayscale opacity-10">
                            <WireframeCube size={300} />
                        </FloatingShape>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. Q&A / CLOSING - Ethereal particles */}
            <AnimatePresence>
                {activeSection >= 8 && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <FloatingShape parallaxY={-300} className="top-[10%] left-[30%]">
                            <TriangleOutline size={200} color="rgba(34, 211, 238, 0.1)" />
                        </FloatingShape>
                        <div className="absolute inset-0 bg-radial-gradient from-lapis/5 to-transparent opacity-30" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Particles/Dots - Global */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.1, scale: 0.5 }}
                    animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -30, 0] }}
                    transition={{ duration: star.duration, repeat: Infinity }}
                    className="absolute bg-white rounded-full w-[1px] h-[1px]"
                    style={{
                        top: star.top,
                        left: star.left,
                    }}
                />
            ))}
        </div>
    );
};
