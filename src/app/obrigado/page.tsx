"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

export default function ThankYouPage() {
    return (
        <main className="bg-aldurr-void min-h-screen relative text-aldurr-text-body overflow-hidden">
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aldurr-honey/5 rounded-full blur-[180px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-aldurr-honey/5 rounded-full blur-[180px] -ml-96 -mb-96" />
            </div>

            <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 pt-40 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-24 h-24 mb-12 rounded-full border-2 border-aldurr-honey flex items-center justify-center relative"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Check className="w-12 h-12 text-aldurr-honey" strokeWidth={1.5} />
                    </motion.div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border border-aldurr-honey animate-ping opacity-20" />
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-aldurr-honey text-xs font-bold tracking-[0.5em] uppercase block mb-6"
                >
                    Pedido Recebido com Sucesso
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-8 font-display"
                >
                    Obrigado <br />
                    <span className="text-transparent font-outline-2 italic">pela Confiança.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-aldurr-text-body/50 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                >
                    A sua visão agora faz parte do nosso radar. A nossa equipa de engenharia e design irá analisar os seus dados e entrará em contacto num prazo de 24-48 horas.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <Link href="/">
                        <button className="group relative px-10 py-5 bg-white text-aldurr-canvas font-bold text-xs tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:bg-aldurr-honey hover:text-white">
                            <span className="relative z-10">Voltar à Página Inicial</span>
                            <div className="absolute inset-0 bg-gold-metallic translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </Link>
                </motion.div>

                {/* Decorative scanning line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aldurr-honey/20 to-transparent" />
            </section>

            <Footer />
        </main>
    );
}
