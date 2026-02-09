"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function InvestmentSection() {
    return (
        <section id="investment" className="relative py-32 bg-aldurr-canvas text-white overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Concept Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                            O Propósito
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Mais que uma Casa.<br />
                            Um <span className="text-aldurr-accent">Ativo de Valor.</span>
                        </h2>
                        <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                            A Al Durr cria lares para a vida. Mas sabemos que a qualidade intemporal é também o melhor refúgio para o seu capital.
                            Uma casa para viver hoje, que valoriza para amanhã.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="pl-6 border-l-2 border-aldurr-accent">
                                <h4 className="text-xl font-bold text-white mb-2">Habitação Própria</h4>
                                <p className="text-sm text-white/50">Eficiência energética A+, zero manutenção exterior e um design que valoriza o terreno instantaneamente.</p>
                            </div>
                            <div className="pl-6 border-l-2 border-white/10 hover:border-aldurr-accent transition-colors duration-300">
                                <h4 className="text-xl font-bold text-white mb-2">Investimento & Turismo</h4>
                                <p className="text-sm text-white/50">ROI estimado de 15-20% ao ano em mercado de turismo rural premium. Instalação rápida = Faturação rápida.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Card / ROI Calculator Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative bg-aldurr-surface p-8 md:p-12 border border-white/5 rounded-none"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                                <path d="M2 17L12 22L22 17" />
                                <path d="M2 12L12 17L22 12" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-light mb-8 text-white">Projeção Simplificada</h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                <span className="text-white/40 text-sm uppercase tracking-wider">Investimento T1</span>
                                <span className="text-2xl font-mono text-white">€149.900</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                <span className="text-white/40 text-sm uppercase tracking-wider">Diária Média (Alta)</span>
                                <span className="text-2xl font-mono text-white">€250</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <span className="text-aldurr-accent text-sm uppercase tracking-widest font-bold">Retorno Estimado</span>
                                <span className="text-4xl font-bold text-aldurr-accent">~3.5 Anos</span>
                            </div>
                        </div>

                        <p className="text-[10px] text-white/20 mt-6">*Valores indicativos baseados em taxas de ocupação de 60%.</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
