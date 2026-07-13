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

    const stats = [
        { label: "Vento", value: "250", unit: "km/h" },
        { label: "Sismo", value: "Zona", unit: "Certificada" },
        { label: "Eficiência", value: "A+", unit: "Energy" },
        { label: "Estrutura", value: "Aço", unit: "Naval" },
        { label: "Isolamento", value: "160", unit: "mm Thermal" },
        { label: "Manutenção", value: "Zero", unit: "Exterior" }
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

                {/* Blueprint + Side Info: Wider Blueprint */}
                <div className="relative flex flex-col gap-12 w-full">
                    {/* Blueprint Viewport */}
                    <motion.div
                        style={{ scale, opacity }}
                        className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#070808] border border-white/[0.05] flex items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-sm"
                    >
                        {/* Corner Tech Info */}
                        <div className="absolute top-4 md:top-8 left-6 md:left-10 z-30 flex items-center gap-3">
                            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-aldurr-honey shadow-[0_0_15px_rgba(198,156,109,0.8)]" />
                            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-aldurr-text-body/40 uppercase">System_X-Ray_Scan_v4.0</span>
                        </div>

                        {/* Scanning Line — full-height layer translated on the GPU (no per-frame layout) */}
                        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                            <motion.div
                                animate={{ y: ["0%", "100%", "0%"] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                style={{ willChange: "transform" }}
                                className="absolute inset-0"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-aldurr-honey/30 shadow-[0_0_30px_rgba(198,156,109,0.4)]" />
                            </motion.div>
                        </div>

                        {/* Blueprint Image */}
                        <div className="relative w-full h-full md:h-[95%] p-4 md:p-0 flex items-center justify-center transition-transform duration-500">
                            <motion.div
                                initial={{ filter: 'brightness(0.3) contrast(1.2)' }}
                                whileInView={{ filter: 'brightness(1.1) contrast(1.1)' }}
                                transition={{ duration: 2.5 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src="/images/trapezoidal-engineering-blueprint.avif"
                                    alt="Al Durr Engineering Skeleton"
                                    fill
                                    className="object-contain object-center drop-shadow-[0_0_120px_rgba(198,156,109,0.15)] grayscale transition-all duration-1000"
                                />
                            </motion.div>
                        </div>

                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-aldurr-honey/5 blur-[150px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                    </motion.div>

                    {/* Technical Floating Indicators (Minimalist) */}
                    <div className="relative md:absolute mt-4 md:mt-0 top-auto md:top-1/2 md:-translate-y-1/2 right-auto md:right-8 z-30 grid grid-cols-2 md:flex md:flex-col gap-6 md:gap-3 lg:gap-4 text-left md:text-right bg-black/40 md:bg-black/60 p-6 md:p-5 lg:p-6 lg:py-8 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full md:w-auto">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="group flex flex-col items-start md:items-end cursor-default"
                            >
                                <span className="text-[8px] md:text-[8px] lg:text-[10px] text-aldurr-honey font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] drop-shadow-[0_0_10px_rgba(198,156,109,0.3)] opacity-70 group-hover:opacity-100 transition-opacity mb-0.5 whitespace-nowrap">{stat.label}</span>
                                <div className="flex items-baseline gap-1 md:gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xl md:text-lg lg:text-xl font-bold tracking-tighter text-white">{stat.value}</span>
                                    <span className="text-[8px] md:text-[8px] lg:text-[10px] text-white/50 uppercase tracking-widest whitespace-nowrap">{stat.unit}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Technical Breakdown */}
                <div className="grid md:grid-cols-3 gap-8 mt-12 md:mt-20 pt-8 md:pt-10">
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
