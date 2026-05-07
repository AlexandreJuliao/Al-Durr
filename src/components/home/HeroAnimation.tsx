"use client";
import Link from "next/link";
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
                        preload="auto"
                        className="w-full h-full object-cover md:object-center object-[70%_center] opacity-85 md:opacity-90 mix-blend-normal scale-110 origin-top brightness-[0.85] contrast-[1.05]"
                    >
                        <source src="/videos/hero-background.mp4" type="video/mp4" />
                        <source src="/videos/hero-background.webm" type="video/webm" />
                    </video>
                    
                    {/* Minimal Framing Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-aldurr-void/90 via-aldurr-void/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-aldurr-void via-transparent to-transparent z-10 opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-aldurr-void to-transparent z-10" />
                </div>

                <div className="absolute inset-0 z-40 px-4 md:px-16 flex flex-col md:grid md:grid-cols-2 h-full pointer-events-none">
                    {/* Mobile: Bottom-aligned | Desktop: Left Side */}
                    <div className="relative flex flex-col items-center md:items-center justify-end md:justify-center pb-20 md:pb-0 pt-0 md:pt-24 h-[90dvh] md:h-full z-50 pointer-events-auto">
                        <div className="relative w-full max-w-[24rem] md:max-w-[28rem] lg:max-w-md text-left bg-transparent md:bg-aldurr-canvas/20 md:backdrop-blur-3xl px-2 md:p-8 md:rounded-sm border-transparent md:border md:border-white/10 md:shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden group">

                            {/* Inner Shimmer Effect */}
                            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2.5s] pointer-events-none" />

                            <div className="flex flex-col gap-5 lg:gap-12 relative z-10 w-full px-2">
                                {/* Major Highlights */}
                                <div className="flex flex-row items-center justify-between gap-3 lg:gap-8">
                                    <div className="flex-1 group flex flex-col cursor-default">
                                        <div className="flex items-baseline gap-1.5 lg:gap-2 mb-0.5 lg:mb-2">
                                            <span className="text-6xl md:text-5xl lg:text-7xl font-bold bg-gold-metallic bg-clip-text text-transparent drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] tracking-tighter leading-none">
                                                6
                                            </span>
                                            <span className="text-sm md:text-sm lg:text-xl text-white/50 font-light tracking-tight">Meses</span>
                                        </div>
                                        <span className="text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] text-aldurr-honey uppercase whitespace-nowrap">
                                            Entrega Total
                                        </span>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="w-[1px] h-14 lg:h-16 bg-white/10 self-center" />

                                    <div className="flex-1 group flex flex-col items-end cursor-default">
                                        <div className="flex items-baseline gap-1 mb-0.5 lg:mb-2">
                                            <span className="text-6xl md:text-5xl lg:text-7xl font-bold bg-gold-metallic bg-clip-text text-transparent drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] tracking-tighter leading-none">
                                                149K
                                            </span>
                                            <span className="text-sm md:text-sm lg:text-xl text-white/50 font-light tracking-tight">€</span>
                                        </div>
                                        <span className="text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] text-aldurr-honey uppercase whitespace-nowrap">
                                            Investimento
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-white/5 my-2" />

                                <div className="flex flex-col gap-4 md:gap-5">
                                    {[
                                        { text: "Bio-Estrutura • Carbono Negativo" },
                                        { text: "Performance A++ • Isolamento" },
                                        { text: "Engenharia Inteligente Sustentável" }
                                    ].map((item, i) => (
                                        <div key={i} className="group flex items-center gap-3 md:gap-5 text-white/80 font-light hover:text-white transition-all duration-300 cursor-default">
                                            <div className="w-1.5 h-1.5 rounded-none bg-aldurr-honey/60 group-hover:bg-aldurr-honey group-hover:scale-[1.5] transition-all duration-500 flex-shrink-0" />
                                            <span className="tracking-widest text-[11px] md:text-[11px] lg:text-xs leading-none uppercase truncate">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                    <Link href="/contactos#contact-form" className="relative mt-4 group w-full block">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-aldurr-honey to-aldurr-honey-light rounded-sm blur opacity-10 group-hover:opacity-30 transition duration-700" />
                                        <button className="relative flex items-center justify-between pl-6 md:pl-8 pr-2 py-2 md:py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm hover:bg-white/10 transition-all duration-300 group w-full overflow-hidden">
                                            <span className="flex flex-col items-start mr-2 md:mr-4 text-left">
                                                <span className="text-[10px] md:text-[9px] text-white/50 uppercase tracking-[0.2em] mb-0.5 font-bold">Inicie o seu Legado</span>
                                                <span className="text-xs md:text-sm text-white font-medium tracking-widest whitespace-nowrap uppercase">Solicitar Estudo Exclusivo</span>
                                            </span>
                                            <span className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 bg-gold-metallic text-aldurr-void rounded-[2px] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl self-center">
                                                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
