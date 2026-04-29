"use client";
import React from "react";
import Link from "next/link";

export default function LandServiceSection() {
    return (
        <section className="bg-aldurr-void py-24 relative overflow-hidden text-aldurr-text-body border-t border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-aldurr-honey/5 rounded-full blur-[120px] -ml-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-aldurr-honey/5 rounded-full blur-[120px] -mr-48 -mb-48 pointer-events-none" />
            </div>
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="relative h-[400px] w-full bg-aldurr-canvas/20 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Abstract Map visual or Land visual */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-aldurr-honey/50 flex items-center justify-center bg-aldurr-honey/10 backdrop-blur-md shadow-[0_0_30px_rgba(198,156,109,0.2)]">
                            <div className="w-2 h-2 bg-aldurr-honey rounded-full animate-ping" />
                        </div>
                    </div>
                </div>

                <div>
                    <span className="text-aldurr-honey text-[10px] font-bold tracking-[0.4em] uppercase block mb-6">
                        Serviço Premium
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-aldurr-text-body tracking-tight leading-[0.9] font-display">
                        Não tem terreno?<br />
                        <span className="text-transparent font-outline-2">Nós encontramos.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-aldurr-text-muted font-light leading-relaxed mb-6">
                        Sabemos que encontrar o local perfeito para um A-Frame é um desafio.
                        A inclinação, a exposição solar e o acesso são cruciais.
                    </p>
                    <p className="text-lg md:text-xl text-aldurr-text-muted font-light leading-relaxed mb-10">
                        Temos uma rede de parceiros imobiliários e terrenos exclusivos já validados pela nossa equipa de arquitetura.
                    </p>

                    <div className="space-y-4 mb-10 border-l border-aldurr-honey/20 pl-6">
                        <div className="flex items-center gap-4 text-aldurr-text-muted font-light group">
                            <span className="w-1.5 h-1.5 bg-aldurr-honey/50 rounded-full group-hover:bg-aldurr-honey transition-colors" />
                            Análise de viabilidade construtiva incluída
                        </div>
                        <div className="flex items-center gap-4 text-aldurr-text-muted font-light group">
                            <span className="w-1.5 h-1.5 bg-aldurr-honey/50 rounded-full group-hover:bg-aldurr-honey transition-colors" />
                            Terrenos com privacidade e ligação à natureza
                        </div>
                    </div>

                    <Link href="/contactos#contact-form">
                        <button className="px-10 py-4 border border-aldurr-honey/40 bg-aldurr-honey/10 text-aldurr-text-body text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-aldurr-honey hover:text-aldurr-void hover:shadow-[0_0_20px_rgba(198,156,109,0.4)] transition-all duration-500 rounded-sm">
                            Pedir Lista
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
