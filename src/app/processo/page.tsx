"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandServiceSection from "@/components/home/LandServiceSection";
import { motion } from "framer-motion";

const steps = [
    { step: "01", title: "Design & Terreno", desc: "Análise do terreno e adaptação do projeto à topografia e exposição solar ideal." },
    { step: "02", title: "Produção Off-site", desc: "A sua casa é construída a 100% em fábrica com controlo de qualidade rigoroso." },
    { step: "03", title: "Transporte", desc: "Logística especializada desde a fábrica até ao local de implantação." },
    { step: "04", title: "Instalação", desc: "Montagem final em menos de 1 semana. Chave na mão." },
];

export default function ProcessoPage() {
    return (
        <main className="bg-aldurr-void min-h-screen relative text-aldurr-text-body">
            <Navbar />

            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-aldurr-honey/5 rounded-full blur-[150px] -ml-48 -mt-48" />
            </div>

            <section className="pt-40 pb-20 text-center container mx-auto px-4 z-10 relative">
                <span className="text-aldurr-honey text-xs font-bold tracking-[0.5em] uppercase block mb-6 flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                    A Jornada
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display">
                    Simplificamos o <span className="text-transparent font-outline-2">Impossível.</span>
                </h1>
            </section>

            {/* Steps Detail */}
            <section className="pb-32 container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="p-8 bg-white/[0.03] border border-white/[0.06] rounded-sm hover:border-aldurr-honey/30 transition-all duration-500 group hover:-translate-y-2"
                        >
                            <span className="text-5xl font-bold text-aldurr-honey/10 group-hover:text-aldurr-honey/20 transition-colors block mb-6 font-display">{item.step}</span>
                            <h3 className="text-xl font-bold text-aldurr-text-heading mb-3 group-hover:text-aldurr-honey transition-colors">{item.title}</h3>
                            <p className="text-aldurr-text-body/50 leading-relaxed font-light text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Modular vs Traditional Comparison */}
            <section className="py-32 bg-aldurr-stone/30 relative z-10 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-4">Eficiência Radical</span>
                        <h2 className="text-4xl md:text-6xl font-bold font-display leading-[0.9]">O Fim da <br /><span className="text-transparent font-outline-2 italic">Construção Lenta.</span></h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                        {/* Traditional */}
                        <div className="bg-aldurr-void p-12 space-y-8">
                            <h4 className="text-xl font-bold text-white/40 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                Construção Tradicional
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { label: "Tempo Médio", val: "18 - 24 Meses", bad: true },
                                    { label: "Imprevistos de Custo", val: "20% a 40% de desvio", bad: true },
                                    { label: "Resíduos", val: "Elevado desperdício em obra", bad: true },
                                    { label: "Controlo", val: "Dependente de condições climatéricas", bad: true }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                                        <span className="text-sm text-white/30 tracking-wide uppercase font-bold text-[10px]">{item.label}</span>
                                        <span className="text-lg text-white/40 line-through decoration-white/20">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Al Durr Modular */}
                        <div className="bg-aldurr-void p-12 space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-aldurr-honey/10 blur-[100px] -mr-32 -mt-32" />
                            <h4 className="text-xl font-bold text-aldurr-honey flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-aldurr-honey" />
                                Al Durr System
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { label: "Tempo Médio", val: "6 Meses (Chave na mão)" },
                                    { label: "Precisão Orçamental", val: "0% de desvio (Preço Fixo)" },
                                    { label: "Eficiência", val: "Resíduo Zero em fábrica" },
                                    { label: "Garantia", val: "Controlo ISO 9001 Industrial" }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-end border-b border-aldurr-honey/20 pb-4">
                                        <span className="text-sm text-aldurr-honey/50 tracking-wide uppercase font-bold text-[10px]">{item.label}</span>
                                        <span className="text-lg text-white font-bold">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Detail: Precision */}
            <section className="py-32 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <div>
                                <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-6">Qualidade Industrial</span>
                                <h3 className="text-4xl md:text-5xl font-bold font-display leading-[1.0]">Tolerância de <span className="text-transparent font-outline-2 italic">Milímetros.</span></h3>
                            </div>
                            
                            <p className="text-aldurr-text-body/60 text-lg font-light leading-relaxed">
                                Em obra tradicional, as margens de erro contam-se em centímetros. No sistema Al Durr, a precisão da maquinaria CNC garante que cada painel de CLT encaixa perfeitamente, eliminando pontes térmicas e infiltrações antes mesmo de chegarem ao terreno.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <p className="text-2xl font-bold text-white italic">90%</p>
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Executado em Fábrica</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl font-bold text-white italic">Zero</p>
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Atrasos Climatéricos</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative py-12">
                            <div className="absolute inset-0 bg-aldurr-honey/5 blur-[80px] rounded-full" />
                            <div className="relative grid grid-cols-2 gap-4">
                                <div className="h-[250px] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between">
                                    <span className="text-xs text-aldurr-honey font-bold tracking-widest uppercase italic">Fase 1</span>
                                    <h5 className="text-sm font-bold text-white uppercase tracking-widest">Corte Robótico <br />de Precisão</h5>
                                </div>
                                <div className="h-[250px] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between translate-y-8">
                                    <span className="text-xs text-aldurr-honey font-bold tracking-widest uppercase italic">Fase 2</span>
                                    <h5 className="text-sm font-bold text-white uppercase tracking-widest">Montagem de <br />Células 3D</h5>
                                </div>
                                <div className="h-[250px] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between">
                                    <span className="text-xs text-aldurr-honey font-bold tracking-widest uppercase italic">Fase 3</span>
                                    <h5 className="text-sm font-bold text-white uppercase tracking-widest">Acabamentos <br />Interiores</h5>
                                </div>
                                <div className="h-[250px] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between translate-y-8">
                                    <span className="text-xs text-aldurr-honey font-bold tracking-widest uppercase italic">Fase 4</span>
                                    <h5 className="text-sm font-bold text-white uppercase tracking-widest">Logística <br />Especializada</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Land Finding Service */}
            <LandServiceSection />

            <Footer />
        </main>
    );
}
