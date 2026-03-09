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

    const scale = useTransform(scrollYProgress, [0, 0.4], [0.98, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    const technicalNodes = [
        { label: "Estrutura Primária", detail: "Aço Naval S355 JR", delay: 0.1 },
        { label: "Revestimento Eterno", detail: t.engineering.feature3, delay: 0.15 },
        { label: "Isolamento Térmico", detail: t.engineering.feature1, delay: 0.2 },
        { label: "Versatilidade Interior", detail: t.engineering.feature2, delay: 0.25 },
        { label: "Resiliência Sísmica", detail: "Eurocode 8 Cert.", delay: 0.3 },
    ];

    return (
        <section ref={containerRef} className="relative py-12 md:py-20 bg-aldurr-stone text-aldurr-text-body overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-aldurr-void to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-aldurr-void to-transparent pointer-events-none z-10" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header - fully centered */}
                <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-2"
                    >
                        <span className="text-aldurr-accent text-xs font-bold tracking-[0.5em] uppercase block mb-6 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-aldurr-accent/30"></span>
                            {t.engineering.subtitle}
                            <span className="w-12 h-[1px] bg-aldurr-accent/30"></span>
                        </span>
                        <h2 className="text-7xl md:text-[120px] font-bold leading-[0.85] tracking-tighter text-center font-display">
                            {t.engineering.title.split(' ')[0]} <br />
                            <span className="text-transparent font-outline-2">{t.engineering.title.split(' ').slice(1).join(' ')}</span>
                        </h2>
                    </motion.div>
                    <p className="text-aldurr-text-body/40 text-sm md:text-lg font-light leading-relaxed max-w-lg text-center">
                        {t.engineering.description}
                    </p>
                </div>

                {/* Blueprint + Side Info: 2-column on desktop */}
                <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
                    {/* Blueprint Viewport */}
                    <motion.div
                        style={{ scale, opacity }}
                        className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#0A0C0B] border border-white/[0.05] rounded-sm flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]"
                    >
                        {/* Corner Tech Info */}
                        <div className="absolute top-4 md:top-6 left-6 md:left-8 z-30 flex items-center gap-3">
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-aldurr-honey animate-pulse" />
                            <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-aldurr-text-body/40 uppercase">System_X-Ray_Scan_v3.1</span>
                        </div>

                        {/* Scanning Line */}
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aldurr-honey/40 to-transparent z-20 pointer-events-none shadow-[0_0_20px_rgba(198,156,109,0.3)]"
                        />

                        {/* Blueprint Image — clean, no overlapping labels */}
                        <div className="relative w-full h-[90%] md:h-[85%] max-w-4xl px-4 flex items-center justify-center">
                            <motion.div
                                initial={{ filter: 'brightness(0.5) contrast(1.2)' }}
                                whileInView={{ filter: 'brightness(1.1) contrast(1.1)' }}
                                transition={{ duration: 2 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src="/images/trapezoidal-engineering-blueprint.png"
                                    alt="Al Durr Engineering Skeleton"
                                    fill
                                    className="object-contain drop-shadow-[0_0_100px_rgba(198,156,109,0.1)] grayscale transition-all duration-700 scale-110 md:scale-100"
                                />
                            </motion.div>
                        </div>

                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/3 blur-[120px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
                    </motion.div>

                    {/* Right column: Technical callouts as clean list */}
                    <div className="flex flex-col gap-3 pt-2">
                        {technicalNodes.map((node, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: node.delay, duration: 0.6 }}
                                className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded-sm hover:border-aldurr-honey/30 transition-colors group"
                            >
                                <div className="relative mt-1 shrink-0">
                                    <div className="w-2 h-2 bg-aldurr-honey shadow-[0_0_10px_rgba(198,156,109,0.8)]" />
                                    <div className="absolute inset-0 bg-aldurr-honey/40 animate-ping" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-aldurr-text-body uppercase block group-hover:text-white transition-colors">{node.label}</span>
                                    <span className="text-[11px] text-aldurr-honey/70 font-mono tracking-tight">{node.detail}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-8 md:mt-12">
                    {[
                        { label: "Vento", value: "250", unit: "km/h" },
                        { label: "Sismo", value: "Zona", unit: "Certificada" },
                        { label: "Eficiência", value: "A+", unit: "Energy" },
                        { label: "Estrutura", value: "Aço", unit: "Naval" },
                        { label: "Isolamento", value: "160", unit: "mm Thermal" },
                        { label: "Manutenção", value: "Zero", unit: "Exterior" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="bg-white/[0.03] border border-white/5 rounded-sm p-6 flex flex-col items-center justify-center text-center"
                        >
                            <span className="text-[9px] text-aldurr-honey/60 uppercase tracking-widest mb-1">{stat.label}</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                                <span className="text-[10px] text-aldurr-text-body/40">{stat.unit}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Breakdown */}
                <div className="grid md:grid-cols-3 gap-8 mt-16 md:mt-24 pt-16 md:pt-24 border-t border-white/5">
                    {[
                        {
                            title: "Proteção Térmica",
                            text: "Combinação de Lã de Rocha de 100mm e EPS de 60mm de alta densidade, garantindo conforto térmico absoluto tanto no Verão como no Inverno com eficiência A+."
                        },
                        {
                            title: "Física Estrutural",
                            text: "Chassis em aço S355 com tratamento naval, projetado para suportar ventos de 250km/h e sismos de elevada magnitude (Eurocode 8)."
                        },
                        {
                            title: "Acabamentos Eternos",
                            text: "Fachadas ventiladas em zinco ou materiais de compósito de alta performance que requerem manutenção zero por décadas."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="space-y-4"
                        >
                            <h4 className="text-aldurr-honey text-[10px] font-bold tracking-[0.2em] uppercase">{item.title}</h4>
                            <p className="text-aldurr-text-body/60 text-sm font-light leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
