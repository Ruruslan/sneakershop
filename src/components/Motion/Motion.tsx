"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// ─── Fade-in-up on scroll ─────────────────────────────────
interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    className,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}

// ─── Staggered children ───────────────────────────────────
interface StaggerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
}: StaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

// ─── Scale-in ─────────────────────────────────────────────
export function ScaleIn({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}

// ─── Slide-in from direction ──────────────────────────────
export function SlideIn({
    children,
    direction = "left",
    delay = 0,
    className,
}: {
    children: ReactNode;
    direction?: "left" | "right" | "top" | "bottom";
    delay?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const directionMap = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        top: { x: 0, y: -50 },
        bottom: { x: 0, y: 50 },
    };

    const initial = { opacity: 0, ...directionMap[direction] };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={initial}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}
