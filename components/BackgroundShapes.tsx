"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

// --- REUSABLE SHAPE COMPONENTS ---

export const Ring: React.FC<{ size?: number; color?: string; className?: string }> = ({
    size = 300,
    color = "border-lapis/20",
    className = ""
}) => (
    <motion.div
        style={{ width: size, height: size }}
        className={`rounded-full border ${color} ${className}`}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />
);

export const TriangleOutline: React.FC<{ size?: number; color?: string; className?: string }> = ({
    size = 100,
    color = "rgba(168, 85, 247, 0.2)",
    className = ""
}) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
        <path
            d="M50 5 L95 85 L5 85 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
        />
    </motion.svg>
);

export const WireframeCube: React.FC<{ size?: number; color?: string; className?: string }> = ({
    size = 150,
    color = "border-lapis/10",
    className = ""
}) => (
    <motion.div
        style={{ width: size, height: size }}
        className={`relative perspective-1000 ${className}`}
        animate={{ rotateY: [0, 360], rotateX: [0, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
        <div className={`absolute inset-0 border ${color} bg-white/1 translate-z-[75px]`} />
        <div className={`absolute inset-0 border ${color} bg-white/1 -translate-z-[75px]`} />
        <div className={`absolute inset-0 border ${color} bg-white/1 rotate-y-90 translate-x-[75px]`} />
        <div className={`absolute inset-0 border ${color} bg-white/1 -rotate-y-90 -translate-x-[75px]`} />
    </motion.div>
);

export const FloatingPanel: React.FC<{ width?: number; height?: number; className?: string }> = ({
    width = 200,
    height = 300,
    className = ""
}) => (
    <motion.div
        style={{ width, height }}
        className={`glass-panel border-white/5 opacity-40 bg-white/1 ${className}`}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
);

export const Square: React.FC<{ size?: number; color?: string; className?: string }> = ({
    size = 50,
    color = "border-white/20",
    className = ""
}) => (
    <motion.div
        style={{ width: size, height: size }}
        className={`border ${color} ${className}`}
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
);

export const PlusSign: React.FC<{ size?: number; color?: string; className?: string }> = ({
    size = 20,
    color = "text-white/20",
    className = ""
}) => (
    <motion.div
        style={{ width: size, height: size }}
        className={`relative ${color} ${className}`}
        animate={{ rotate: [0, 90], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-current" />
    </motion.div>
);

// --- SCROLL-REACTIVE COMPONENT ---

export const FloatingShape: React.FC<{
    children: React.ReactNode;
    parallaxY?: number;
    className?: string;
    depth?: "back" | "mid" | "front"
}> = ({ children, parallaxY = 100, className = "", depth = "back" }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, parallaxY]);

    const opacity = depth === "back" ? 0.05 : depth === "mid" ? 0.1 : 0.15;

    return (
        <motion.div style={{ y, opacity }} className={`absolute pointer-events-none ${className}`}>
            {children}
        </motion.div>
    );
};
