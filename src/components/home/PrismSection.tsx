"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PrismSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-aldurr-void border-t border-white/5">
            <div className="absolute inset-0 bg-aldurr-honey/5 pointer-events-none" />
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-aldurr-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <div className="order-2 md:order-1 space-y-10 pl-4 md:pl-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-aldurr-accent"></span>
                            {t.prism.subtitle}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9] tracking-tight font-display">
                            {t.prism.title}
                        </h2>
                        <p className="text-lg md:text-xl text-aldurr-text-body/80 max-w-lg leading-relaxed font-light">
                            {t.prism.description}
                        </p>
                    </motion.div>

                    <div className="space-y-8 pt-8 border-l border-white/5 pl-8">
                        {[t.prism.feature1, t.prism.feature2, t.prism.feature3].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group cursor-default"
                            >
                                <h3 className="text-2xl font-light tracking-wide text-aldurr-text-heading group-hover:text-aldurr-accent transition-colors duration-500">
                                    {feature}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Visual Content */}
                <motion.div
                    style={{ y, scale, opacity }}
                    className="order-1 md:order-2 relative h-[500px] md:h-[800px] w-full flex items-center justify-center"
                >
                    <div className="relative w-full h-full">
                        {/* Main Image — new A-frame house with structural frame */}
                        <Image
                            src="/prism-house-new.png"
                            alt="Al Durr A-Frame Model with Structural Frame"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain drop-shadow-2xl z-10"
                            priority
                        />

                        {/* Ambient glow behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-aldurr-accent/15 to-transparent blur-3xl -z-10" />

                        {/* SVG Overlay — geometric lines IN FRONT of the image (z-20) */}
                        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-30 mix-blend-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.line
                                x1="50" y1="5" x2="50" y2="95"
                                stroke="#C69C6D"
                                strokeWidth="0.15"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M18,92 L40,8 L60,8 L82,92 Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.15"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            />
                            <motion.line
                                x1="18" y1="92" x2="82" y2="92"
                                stroke="#C69C6D"
                                strokeWidth="0.1"
                                strokeDasharray="1 2"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.2, ease: "easeInOut", delay: 1.2 }}
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Background Texture - Using CSS radial gradient instead of missing image */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent bg-[length:4px_4px]" />
        </section>
    );
}
