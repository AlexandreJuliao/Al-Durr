"use client";
import React, { useRef } from "react";

export default function HeroAnimation() {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={triggerRef} className="relative h-screen w-full bg-aldurr-void text-white overflow-hidden selection:bg-aldurr-honey/30">

            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-aldurr-void">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="a-frame-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M50 0 L100 100 L0 100 Z" fill="none" stroke="#C69C6D" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#a-frame-grid)" />
                    </svg>
                </div>

                <div className="absolute inset-0 z-0 bg-aldurr-void">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover md:object-center object-[70%_center] opacity-85 md:opacity-90 mix-blend-normal scale-110 origin-top brightness-[0.85] contrast-[1.05]"
                    >
                        <source src="/videos/hero-background.webm" type="video/webm" />
                    </video>
                    
                    {/* Minimal Framing Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-aldurr-void/90 via-aldurr-void/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-aldurr-void via-transparent to-transparent z-10 opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-aldurr-void to-transparent z-10" />
                </div>

                <div className="absolute inset-0 z-40 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 h-full pointer-events-none">
                    {/* Mobile: Top Half (Text) | Desktop: Left Side */}
                    <div className="relative flex flex-col items-start md:items-center justify-start md:justify-center pt-36 md:pt-24 h-[75vh] md:h-full z-50 pointer-events-auto">
                        <div className="relative w-full max-w-[20rem] md:max-w-[28rem] lg:max-w-md text-left bg-aldurr-void/90 backdrop-blur-xl p-8 rounded-sm border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden group">

                            {/* Inner Shimmer Effect */}
                            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2.5s] pointer-events-none" />

                            <div className="flex flex-col gap-6 lg:gap-12 relative z-10">
                                {/* Major Highlights */}
                                <div className="flex flex-row items-center justify-between gap-4 lg:gap-8">
                                    <div className="flex-1 group flex flex-col cursor-default">
                                        <div className="flex items-baseline gap-1 lg:gap-2 mb-0.5 lg:mb-2">
                                            <span className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gold-metallic bg-clip-text text-transparent drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] tracking-tighter leading-none">
                                                4
                                            </span>
                                            <span className="text-xs md:text-sm lg:text-xl text-white/40 font-light tracking-tight">Meses</span>
                                        </div>
                                        <span className="text-[7px] md:text-[8px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] text-aldurr-green uppercase whitespace-nowrap">
                                            Entrega Total
                                        </span>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="w-[1px] h-12 lg:h-16 bg-white/10 self-center" />

                                    <div className="flex-1 group flex flex-col items-end cursor-default">
                                        <div className="flex items-baseline gap-1 mb-0.5 lg:mb-2">
                                            <span className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gold-metallic bg-clip-text text-transparent drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] tracking-tighter leading-none">
                                                149K
                                            </span>
                                            <span className="text-xs md:text-sm lg:text-xl text-white/40 font-light tracking-tight">€</span>
                                        </div>
                                        <span className="text-[7px] md:text-[8px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] text-aldurr-honey uppercase whitespace-nowrap">
                                            Investimento
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-white/5" />

                                <div className="flex flex-col gap-4 md:gap-5">
                                    {[
                                        { text: "Bio-Estrutura • Carbono Negativo" },
                                        { text: "Performance A++ • Isolamento" },
                                        { text: "Arquitetura Modular Sustentável" }
                                    ].map((item, i) => (
                                        <div key={i} className="group flex items-center gap-4 md:gap-5 text-white/60 font-light hover:text-white transition-all duration-300 cursor-default">
                                            <div className="w-1 h-1 rounded-none bg-aldurr-honey/30 group-hover:bg-aldurr-honey group-hover:scale-[2] transition-all duration-500 shadow-[0_0_10px_rgba(198,156,109,0)] group-hover:shadow-[0_0_10px_rgba(198,156,109,0.5)] flex-shrink-0" />
                                            <span className="tracking-wide text-[10px] md:text-sm leading-none uppercase truncate">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative mt-2 group w-full">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-aldurr-honey to-aldurr-honey-light rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-700" />
                                    <button className="relative flex items-center justify-between gap-4 md:gap-6 pl-6 md:pl-8 pr-2 py-2 bg-aldurr-void/90 border border-white/10 rounded-sm hover:bg-aldurr-void transition-all duration-300 group w-full">
                                        <span className="flex flex-col items-start mr-2 md:mr-4 text-left">
                                            <span className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.2em] mb-0.5 font-bold">Inicie o seu Legado</span>
                                            <span className="text-[10px] md:text-sm text-white font-medium tracking-widest whitespace-nowrap">Solicitar Estudo Exclusivo</span>
                                        </span>
                                        <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gold-metallic text-aldurr-void rounded-none flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-45 transition-all duration-500 shadow-xl">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
