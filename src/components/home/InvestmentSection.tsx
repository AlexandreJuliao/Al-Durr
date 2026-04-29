"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function InvestmentSection() {
    const { t } = useLanguage();

    const features = [
        {
            title: t.investment.feature1Title,
            desc: t.investment.feature1Desc,
            icon: <TrendingUp className="w-5 h-5" />
        },
        {
            title: t.investment.feature2Title,
            desc: t.investment.feature2Desc,
            icon: <ShieldCheck className="w-5 h-5" />
        },
        {
            title: t.investment.feature3Title,
            desc: t.investment.feature3Desc,
            icon: <Zap className="w-5 h-5" />
        },
        {
            title: t.investment.feature4Title,
            desc: t.investment.feature4Desc,
            icon: <Clock className="w-5 h-5" />
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-aldurr-void relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aldurr-honey/5 rounded-full blur-[120px] -mr-64 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aldurr-honey/5 rounded-full blur-[120px] -ml-64 -mb-32" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Perspective Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-aldurr-honey text-xs font-bold tracking-[0.5em] uppercase block mb-6">
                            {t.investment.subtitle}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9] font-display">
                            Ativo de <br />
                            <span className="text-transparent font-outline-2 stroke-aldurr-honey">Valor Absoluto.</span>
                        </h2>
                        <p className="text-white/40 text-lg font-light leading-relaxed max-w-lg mb-12">
                            {t.investment.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-white/[0.04] backdrop-blur-md border border-white/5 rounded-sm hover:border-aldurr-honey/30 transition-all duration-300 group shadow-lg"
                                >
                                    <div className="w-10 h-10 bg-aldurr-honey/10 flex items-center justify-center text-aldurr-honey mb-4 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-white font-bold mb-2 tracking-tight">{feature.title}</h4>
                                    <p className="text-white/40 text-sm font-light leading-snug">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Asset (ROI Card) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-aldurr-canvas/20 backdrop-blur-2xl border border-white/10 p-12 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-aldurr-honey/20 blur-[60px]" />

                            <div>
                                <span className="text-aldurr-honey text-xs font-bold tracking-widest uppercase mb-4 block">Projeção de Retorno</span>
                                <h3 className="text-6xl font-bold text-white tracking-tighter italic font-display">24% ARR</h3>
                                <p className="text-white/40 text-sm mt-4 max-w-xs font-light">Performance imobiliária baseada em modelos de exploração turística de alto rendimento.</p>
                            </div>

                            {/* Hero Image - A-Frame Night — Trapezoid shape */}
                            <div
                                className="relative flex-1 my-6 min-h-[200px] overflow-hidden"
                                style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}
                            >
                                <Image
                                    src="/investment-aframe-night-new.avif"
                                    alt="A-Frame property investment at night"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    className="object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                                <div className="absolute bottom-4 right-5 text-[9px] text-aldurr-honey/60 font-mono tracking-widest uppercase">Alto Rendimento</div>
                            </div>

                            <div className="mt-4 space-y-4">
                                <div className="h-[1px] w-full bg-white/10" />
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Manutenção</span>
                                        <span className="text-white font-bold tracking-tighter text-2xl group-hover:text-aldurr-honey transition-colors">ZERO</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Durabilidade</span>
                                        <span className="text-white font-bold tracking-tighter text-2xl">+100 Anos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
