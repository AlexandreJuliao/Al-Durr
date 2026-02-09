"use client";
import React from "react";

export default function LandServiceSection() {
    return (
        <section className="bg-aldurr-earth py-24 relative overflow-hidden text-white border-t border-white/5">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                <div className="relative h-[400px] w-full bg-aldurr-surface overflow-hidden">
                    {/* Abstract Map visual or Land visual */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-aldurr-accent flex items-center justify-center">
                            <div className="w-2 h-2 bg-aldurr-accent rounded-full animate-ping" />
                        </div>
                    </div>
                </div>

                <div>
                    <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-4">
                        Serviço Premium
                    </span>
                    <h2 className="text-4xl font-bold mb-6 text-white">Não tem terreno?<br /> Nós encontramos.</h2>
                    <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
                        Sabemos que encontrar o local perfeito para um A-Frame é um desafio.
                        A inclinação, a exposição solar e o acesso são cruciais.
                    </p>
                    <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
                        Temos uma rede de parceiros imobiliários e terrenos exclusivos já validados pela nossa equipa de arquitetura para receber os modelos Al Durr.
                    </p>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-4 text-white/80">
                            <span className="w-1 h-1 bg-aldurr-accent rounded-full" />
                            Análise de viabilidade construtiva incluída
                        </li>
                        <li className="flex items-center gap-4 text-white/80">
                            <span className="w-1 h-1 bg-aldurr-accent rounded-full" />
                            Terrenos com privacidade e ligação à natureza
                        </li>
                    </ul>

                    <button className="px-8 py-3 bg-white text-aldurr-canvas font-bold text-xs uppercase tracking-[0.2em] hover:bg-aldurr-accent hover:text-white transition-colors">
                        Pedir Lista de Terrenos
                    </button>
                </div>
            </div>
        </section>
    );
}
