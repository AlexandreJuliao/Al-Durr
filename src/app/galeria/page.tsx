"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function GaleriaPage() {
    return (
        <main className="bg-aldurr-void min-h-screen relative text-aldurr-text-body">
            <Navbar />

            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aldurr-honey/5 rounded-full blur-[150px] -mr-48 -mt-48" />
            </div>

            <section className="pt-40 pb-20 text-center container mx-auto px-4 z-10 relative">
                <span className="text-aldurr-honey text-xs font-bold tracking-[0.5em] uppercase block mb-6 flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                    Portfólio
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display text-white">
                    Galeria <span className="text-transparent font-outline-2 italic">Visual.</span>
                </h1>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    {["Tudo", "Exterior", "Interior", "Detalhes", "Noite"].map((cat, i) => (
                        <button 
                            key={i} 
                            className={`px-8 py-2 text-[10px] uppercase tracking-[0.3em] border rounded-full transition-all duration-300 ${i === 0 ? "bg-white text-black border-white" : "text-white/40 border-white/10 hover:border-aldurr-honey/50 hover:text-white"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 pb-20 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Living Room - Large Feature */}
                    <div className="md:col-span-2 relative h-[300px] md:h-[600px] group border border-white/5 rounded-sm overflow-hidden">
                        <div className="relative w-full h-full">
                            <Image src="/interior-living.png" alt="Living Room Luxury" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                Living Room
                                <div className="w-8 h-[1px] bg-aldurr-honey mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Mezzanine Bedroom */}
                    <div className="relative h-[300px] md:h-[600px] group border border-white/5 rounded-sm overflow-hidden">
                        <div className="relative w-full h-full">
                            <Image src="/interior-bedroom.png" alt="Mezzanine Bedroom" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                Master Suite
                                <div className="w-8 h-[1px] bg-aldurr-honey mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Kitchen */}
                    <div className="relative h-[300px] group border border-white/5 rounded-sm overflow-hidden">
                        <Image src="/interior-kitchen.png" alt="Minimalist Kitchen" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Kitchen</div>
                    </div>

                    {/* Spa Bathroom */}
                    <div className="relative h-[300px] group border border-white/5 rounded-sm overflow-hidden">
                        <Image src="/interior-bathroom.png" alt="Spa Bathroom" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Spa Bath</div>
                    </div>

                    {/* Office */}
                    <div className="relative h-[300px] group border border-white/5 rounded-sm overflow-hidden">
                        <Image src="/interior-office.png" alt="Home Office" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Studio Office</div>
                    </div>

                    {/* Dining Room - Full Width */}
                    <div className="relative h-[300px] md:col-span-3 group border border-white/5 rounded-sm overflow-hidden">
                        <Image src="/interior-dining.png" alt="Dining Area" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Dining Area</div>
                    </div>
                </div>
            </section>

            {/* Tactile Materials Section */}
            <section className="py-32 bg-aldurr-stone/30 relative z-10 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div>
                                <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-6">A Alma da Casa</span>
                                <h2 className="text-4xl md:text-6xl font-bold font-display leading-[1.0]">Materiais & <br /><span className="text-transparent font-outline-2 italic">Texturas.</span></h2>
                            </div>
                            
                            <p className="text-aldurr-text-body/60 text-lg font-light leading-relaxed max-w-xl">
                                A experiência Al Durr é multissensorial. A escolha de materiais não é apenas estética; é uma busca pelo equilíbrio entre a durabilidade industrial e o conforto orgânico.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { material: "Madereira CLT", desc: "Estrutura sustentável com inércia térmica superior e aroma natural envolvente." },
                                    { material: "Vidro de Alta Performance", desc: "Grandes vãos que eliminam a barreira entre o interior e a paisagem." },
                                    { material: "Aço Obsidian", desc: "Detalhes estruturais com acabamento mate, resistentes aos elementos." }
                                ].map((m, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <span className="text-aldurr-honey font-mono text-xs pt-1">0{i+1}</span>
                                        <div>
                                            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">{m.material}</h4>
                                            <p className="text-white/40 text-sm leading-relaxed">{m.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="h-[300px] relative rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image src="/t1-model.jpg" alt="Material 1" fill className="object-cover" />
                                </div>
                                <div className="h-[200px] relative rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image src="/t2-model.jpg" alt="Material 2" fill className="object-cover" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="h-[200px] relative rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image src="/t-multi-model.jpg" alt="Material 3" fill className="object-cover" />
                                </div>
                                <div className="h-[300px] relative rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image src="/interior-living.png" alt="Material 4" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Immersive Quote */}
            <section className="py-40 relative z-10 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-2xl md:text-4xl text-white/40 italic font-light leading-relaxed">
                        "A arquitetura Al Durr não captura apenas a luz; ela captura o <span className="text-aldurr-honey font-bold">sentimento de pertença</span> ao lugar mais sagrado do mundo: o seu lar."
                    </p>
                    <div className="w-20 h-[1px] bg-aldurr-honey/30 mx-auto mt-12" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
