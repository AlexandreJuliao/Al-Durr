"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function InteriorSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });


    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="relative py-32 bg-aldurr-void text-aldurr-text-heading overflow-hidden">
            {/* Warm overlay for "Honey" feel */}
            <div className="absolute inset-0 bg-aldurr-honey/5 pointer-events-none" />
            {/* Soft Ambient Light */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-aldurr-accent/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-16 items-center relative z-10">

                {/* Image Composition */}
                <div className="lg:col-span-7 relative group">
                    <motion.div
                        style={{ opacity }}
                        className="relative h-[600px] w-full rounded-sm overflow-hidden border border-white/5"
                    >
                        <motion.div
                            className="relative w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            <Image
                                src="/interior-mezzanine-new.avif"
                                alt="Al Durr Interior"
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Cinematic Vignette - transition to dark ambiance */}
                        <div className="absolute inset-0 bg-gradient-to-t from-aldurr-void via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-r from-aldurr-void/60 via-transparent to-transparent opacity-60" />
                    </motion.div>

                    {/* Glass Detail Card - Floating */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-8 -right-4 md:-right-12 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 max-w-sm hidden md:block shadow-xl rounded-sm"
                    >
                        <div className="w-8 h-[1px] bg-aldurr-accent mb-4" />
                        <p className="font-light italic text-lg leading-relaxed text-aldurr-text-heading font-serif">
                            &quot;A excelência não é um ato, mas um hábito gravado em cada detalhe.&quot;
                        </p>
                    </motion.div>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-5 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-aldurr-accent"></span>
                            {t.interiors.subtitle}
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold leading-none mb-6 font-display">
                            {t.interiors.title}
                        </h2>
                        <p className="text-lg text-aldurr-text-body font-light leading-relaxed">
                            {t.interiors.description}
                        </p>
                    </motion.div>

                    <div className="space-y-6 pt-6 border-t border-white/5">
                        {[t.interiors.feature1, t.interiors.feature2, t.interiors.feature3].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                viewport={{ once: true }}
                                className="flex items-center gap-6 group cursor-default"
                            >
                                <div className="text-aldurr-accent/30 font-serif text-2xl group-hover:text-aldurr-accent transition-colors duration-300">
                                    0{idx + 1}
                                </div>
                                <span className="text-xl font-light text-aldurr-text-body/80 group-hover:text-white group-hover:pl-2 transition-all duration-300">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="px-8 py-4 bg-white/5 border border-white/20 text-aldurr-text-body text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold-metallic hover:text-aldurr-void hover:border-transparent transition-all duration-500 rounded-sm"
                    >
                        Explore Interiors
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
