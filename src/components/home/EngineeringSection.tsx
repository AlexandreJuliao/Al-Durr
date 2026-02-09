"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function EngineeringSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="relative py-32 bg-aldurr-stone text-white overflow-hidden">
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-4 relative z-10 w-full">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6 inline-flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-aldurr-accent/50"></span>
                            {t.engineering.subtitle}
                            <span className="w-12 h-[1px] bg-aldurr-accent/50"></span>
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
                            {t.engineering.title}
                        </h2>
                    </motion.div>
                </div>

                {/* Main Interactive Display */}
                <motion.div
                    style={{ scale, opacity }}
                    className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[700px] bg-aldurr-surface/20 backdrop-blur-sm rounded-none border border-white/5 overflow-hidden group"
                >
                    {/* Scanner Line - Slower, more elegant */}
                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aldurr-accent/50 to-transparent z-30 shadow-[0_0_15px_rgba(198,156,109,0.3)] opacity-50"
                    />

                    {/* X-Ray Image */}
                    <div className="absolute inset-0 p-4 md:p-12 flex items-center justify-center">
                        <Image
                            src="/structure-detail.jpg"
                            alt="Engineering X-Ray"
                            fill
                            sizes="(max-width: 768px) 100vw, 80vw"
                            className="object-contain p-4 md:p-16 opacity-80 mix-blend-screen grayscale contrast-125"
                        />
                    </div>

                    {/* Hotspots - Gold Rings */}
                    <Hotspot top="70%" left="25%" label={t.engineering.feature1} delay={0.5} />
                    <Hotspot top="30%" right="30%" label={t.engineering.feature2} delay={0.7} />
                    <Hotspot top="50%" left="50%" label="Isolamento Acústico" delay={0.9} />

                </motion.div>

                {/* Features Grid (Bento Style) */}
                <div className="grid md:grid-cols-3 gap-6 mt-24">
                    {[t.engineering.feature1, t.engineering.feature2, t.engineering.feature3].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                            viewport={{ once: true }}
                            className="p-8 border border-white/5 bg-aldurr-surface/30 hover:bg-aldurr-surface/50 transition-all duration-500 group"
                        >
                            <div className="text-aldurr-accent mb-4 opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                            <h3 className="text-xl font-light text-white mb-2 tracking-wide">{feature}</h3>
                            <div className="w-0 group-hover:w-full h-[1px] bg-aldurr-accent transition-all duration-700 mt-4 opacity-30" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Hotspot({ top, left, right, label, delay }: { top: string, left?: string, right?: string, label: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            className="absolute z-20"
            style={{ top, left, right }}
        >
            <div className="relative group cursor-pointer">
                <div className="w-3 h-3 bg-aldurr-accent rounded-full relative z-10" />
                <div className="w-3 h-3 bg-aldurr-accent rounded-full absolute inset-0 animate-ping opacity-50" />
                <div className="absolute inset-0 -m-8 border border-aldurr-accent/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />

                {/* Tooltip Line & Text */}
                <div className="absolute top-1/2 left-full ml-4 md:ml-8 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    <div className="w-4 md:w-8 h-[1px] bg-aldurr-accent/50 mr-4" />
                    <span className="text-xs font-bold tracking-widest uppercase text-white bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/10">{label}</span>
                </div>
            </div>
        </motion.div>
    );
}
