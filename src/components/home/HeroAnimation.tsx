"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function HeroAnimation() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        preload="metadata"
                        poster="/videos/hero-poster.jpg"
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
                                {/* Official Registration & Patent Badge */}
                                <div 
                                    onClick={() => setIsModalOpen(true)}
                                    className="group/badge flex items-center gap-2.5 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-aldurr-honey/30 rounded-none transition-all duration-300 cursor-pointer pointer-events-auto w-full"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aldurr-honey opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-aldurr-honey"></span>
                                    </span>
                                    <span className="text-[9px] md:text-[8px] lg:text-[10px] font-bold tracking-[0.25em] text-white/70 group-hover/badge:text-aldurr-honey transition-colors uppercase select-none">
                                        Design Registado & Patenteado
                                    </span>
                                    <svg className="w-3 h-3 text-white/30 group-hover/badge:text-aldurr-honey ml-auto transform group-hover/badge:translate-x-0.5 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>

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
                                                1.300
                                            </span>
                                            <span className="text-sm md:text-sm lg:text-xl text-white/50 font-light tracking-tight">€/m²</span>
                                        </div>
                                        <span className="text-[10px] md:text-[8px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] text-aldurr-honey uppercase whitespace-nowrap">
                                            Desde · Chave na Mão
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

                                    <Link scroll={false} href="/contactos#contact-form" className="relative mt-4 group w-full block">
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

            {/* Modal de Propriedade Intelectual */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-aldurr-void/90 backdrop-blur-md transition-opacity duration-300 pointer-events-auto"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div 
                        className="relative w-full max-w-lg bg-aldurr-void border border-white/10 rounded-none p-6 md:p-8 shadow-2xl text-left overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Elegant background lines */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0 L100 100 M100 0 L0 100" stroke="#C69C6D" strokeWidth="2" />
                            </svg>
                        </div>

                        {/* Modal Header */}
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                            <div className="w-8 h-8 rounded-none border border-aldurr-honey/40 flex items-center justify-center text-aldurr-honey">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase bg-gold-metallic bg-clip-text text-transparent">
                                    Propriedade Intelectual
                                </h3>
                                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">
                                    Patente de Design Arquitetónico Registada
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="ml-auto w-8 h-8 flex items-center justify-center hover:bg-white/5 border border-transparent hover:border-white/10 rounded-none text-white/50 hover:text-white transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex flex-col gap-6 text-xs md:text-sm text-white/70 font-light leading-relaxed">
                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-white tracking-widest text-[11px] uppercase">
                                    1. Exclusividade do Investimento
                                </h4>
                                <p className="text-white/60">
                                    O design tridimensional, a volumetria e o layout de distribuição funcional da moradia <strong>Al Durr</strong> estão protegidos por registo de design industrial e direitos de autor de arquitetura. Isto garante que a sua moradia seja uma obra de arte exclusiva e irreplicável no mercado.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-white tracking-widest text-[11px] uppercase">
                                    2. Proteção Jurídica Contra Imitações
                                </h4>
                                <p className="text-white/60">
                                    A reprodução, cópia ou imitação não autorizada deste layout ou da sua fachada tridimensional, quer por parte de arquitetos, construtores ou promotores imobiliários, é estritamente proibida nos termos do <strong>Código do Direito de Autor e dos Direitos Conexos</strong> e dos regulamentos de propriedade intelectual. Qualquer violação será alvo de procedimento legal imediato.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-white tracking-widest text-[11px] uppercase">
                                    3. Garantia de Autenticidade
                                </h4>
                                <p className="text-white/60">
                                    Cada obra licenciada do projeto Al Durr recebe uma placa de metal gravada com o número de registo de autenticidade exclusivo, certificando que a engenharia inteligente, a bio-estrutura e os acabamentos premium obedecem estritamente aos padrões patenteados originais.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/20 text-white rounded-none text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                            >
                                Compreendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
