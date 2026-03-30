// src/components/ui/moving-border.jsx
import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export function Button({ borderRadius = "1.75rem", children, className, containerClassName, borderClassName, duration, ...otherProps }) {
    return (
        <button
            className={cn("bg-transparent relative text-xl p-[1px] overflow-hidden", containerClassName)}
            style={{ borderRadius }}
            {...otherProps}
        >
            <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
                <MovingBorder duration={duration} rx="30%" ry="30%">
                    {/* Halo gold */}
                    <div className={cn("h-20 w-20 opacity-[0.8] bg-[radial-gradient(#b91c1c_40%,transparent_60%)]", borderClassName)} />
                </MovingBorder>
            </div>

            <div
                className={cn("relative backdrop-blur-xl flex items-center justify-center w-full h-full text-sm antialiased px-4 py-2", className)}
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                {children}
            </div>
        </button>
    );
}
export function MovingBorder({ children, duration = 2000, rx, ry, ...otherProps }) {
    const pathRef = useRef(null);
    const progress = useMotionValue(0);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength();
        // Vérification que le path existe et n'est pas vide
        if (!length || length === 0) return;

        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
    });

    const x = useTransform(progress, (val) => {
        try {
            return pathRef.current?.getPointAtLength(val)?.x ?? 0;
        } catch {
            return 0;
        }
    });

    const y = useTransform(progress, (val) => {
        try {
            return pathRef.current?.getPointAtLength(val)?.y ?? 0;
        } catch {
            return 0;
        }
    });

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
                width="100%"
                height="100%"
                {...otherProps}
            >
                <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
            </svg>
            <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
                {children}
            </motion.div>
        </>
    );
}