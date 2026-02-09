"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandServiceSection from "@/components/home/LandServiceSection";

export default function ProcessoPage() {
    return (
        <main className="bg-aldurr-canvas min-h-screen relative text-white">
            <Navbar />

            <section className="pt-40 pb-20 text-center container mx-auto px-4 z-10 relative">
                <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                    A Jornada
                </span>
                <h1 className="text-5xl md:text-7xl font-bold">
                    Simplificamos o Impossível.
                </h1>
            </section>

            {/* Steps Detail */}
            <section className="pb-32 container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { step: "01", title: "Design & Terreno", desc: "Análise do terreno e adaptação do projeto." },
                        { step: "02", title: "Produção Off-site", desc: "A sua casa é construída a 100% em fábrica." },
                        { step: "03", title: "Transporte", desc: "Logística especializada até ao local." },
                        { step: "04", title: "Instalação", desc: "Montagem final em menos de 1 semana." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 border border-white/5 bg-aldurr-surface/5 hover:border-aldurr-accent/30 transition-colors">
                            <span className="text-4xl font-bold text-white/10 block mb-4">{item.step}</span>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/50">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Land Finding Service - The "Extra Step" requested */}
            <LandServiceSection />

            <Footer />
        </main>
    );
}
