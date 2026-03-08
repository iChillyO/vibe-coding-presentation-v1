"use client";

import { motion } from "framer-motion";
import React from "react";

interface Motion3DProps {
    side: "left" | "right";
    children?: React.ReactNode;
    delay?: number;
    className?: string;
    depth?: boolean; // New prop for enhanced 3D
}

export const Motion3D: React.FC<Motion3DProps> = ({
    side,
    children,
    delay = 0,
    className = "",
    depth = true
}) => {
    // In RTL, we might want to flip the fly-in directions but let's stick to literal left/right for now
    const initialX = side === "left" ? -400 : 400;
    const initialRotateY = side === "left" ? -45 : 45;
    const initialRotateX = depth ? (side === "left" ? 10 : -10) : 0;

    return (
        <motion.div
            initial={{
                x: initialX,
                rotateY: initialRotateY,
                rotateX: initialRotateX,
                scale: 0.7,
                opacity: 0,
                filter: "blur(20px)"
            }}
            whileInView={{
                x: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)"
            }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
                type: "spring",
                stiffness: 120, // Strict range
                damping: 20,    // Strict range
                delay,
                duration: 1.2,
                filter: { type: "tween", duration: 0.8, ease: "linear" }
            }}
            className={`perspective-2000 mobile-no-transform ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const ContentReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children,
    delay = 0,
    className = ""
}) => (
    <motion.div
        initial={{ y: 40, opacity: 0, filter: "blur(15px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
            duration: 1,
            delay,
            ease: [0.22, 1, 0.36, 1],
            filter: { type: "tween", duration: 0.5, ease: "linear" } // strictly linear to prevent overshoot
        }}
        viewport={{ once: false }}
        className={`mobile-no-transform ${className}`}
    >
        {children}
    </motion.div>
);
