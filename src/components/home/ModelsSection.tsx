"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


const models = [
    {
        id: "t1",
        title: "T1 STUDIO",
        subtitle: "O Refúgio Perfeito",
        price: "149.900",
        area: "45m²",
        desc: "Ideal para turismo rural ou casa de férias compacta. Design otimizado para conforto máximo em área reduzida.",
        features: ["1 Quarto Mezzanine", "1 WC Completo", "Sala + Kitchenette", "Deck Frontal"],
        image: "/t1-model.jpg"
    },
    {
        id: "t2",
        title: "T2 FAMILY",
        subtitle: "Vida em Equilíbrio",
        price: "189.900",
        area: "75m²",
        desc: "A escolha equilibrada para pequenas famílias. Amplas áreas sociais e privacidade nos quartos.",
        features: ["2 Quartos", "1 WC Premium", "Sala Panorâmica", "Área Técnica"],
        image: "/t2-model.jpg"
    },
    {
        id: "custom",
        title: "T-MULTI",
        subtitle: "Sem Limites",
        price: "Sob Consulta",
        area: "75m²+",
        desc: "A modularidade permite expandir o comprimento da casa infinitamente. Crie a sua mansão A-Frame.",
        features: ["Layout Personalizado", "Múltiplas Suites", "Sauna / Ginásio", "Acabamentos Elite"],
        image: "/t-multi-model.jpg"
    }
];

export default function ModelsSection() {

    const [activeModel, setActiveModel] = useState(0);

    return (
        <section id="models" className="relative pt-16 pb-24 text-aldurr-text-body overflow-hidden bg-aldurr-void">
            {/* Background Pattern with Gradient Mask */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Transition Fades */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-aldurr-void to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-aldurr-void to-transparent pointer-events-none z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <span className="text-aldurr-honey text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">
                        A Coleção
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display">
                        Modelos <span className="text-transparent font-outline-2 stroke-aldurr-honey italic">Al Durr</span>
                    </h2>
                    <p className="text-aldurr-text-body/60 max-w-2xl mx-auto font-light">
                        Três configurações base. Infinitas possibilidades de personalização.
                        Escolha a dimensão que serve o seu propósito.
                    </p>
                </motion.div>

                {/* Desktop Tabs / Display */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* List */}
                    <div className="lg:w-1/3 space-y-4">
                        {models.map((model, idx) => (
                            <div
                                key={model.id}
                                onClick={() => setActiveModel(idx)}
                                className={`group p-8 border cursor-pointer transition-all duration-500 relative overflow-hidden bg-aldurr-void ${activeModel === idx
                                    ? "border-aldurr-honey/50 shadow-[0_0_30px_rgba(198,156,109,0.1)]"
                                    : "border-white/10 hover:border-white/30"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-2xl font-bold tracking-wider transition-colors ${activeModel === idx ? "text-aldurr-text-body" : "text-aldurr-text-body/60 group-hover:text-aldurr-text-body"
                                        }`}>{model.title}</h3>
                                    {activeModel === idx && (
                                        <motion.span
                                            layoutId="active-dot"
                                            className="w-2 h-2 bg-aldurr-honey mt-2 drop-shadow-[0_0_8px_rgba(198,156,109,0.8)]"
                                        />
                                    )}
                                </div>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-aldurr-honey mb-4 opacity-90">{model.subtitle}</p>

                                <motion.div
                                    initial={false}
                                    animate={{ height: activeModel === idx ? "auto" : 0, opacity: activeModel === idx ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-sm text-aldurr-text-body/60 font-light leading-relaxed mb-6">
                                        {model.desc}
                                    </p>
                                    <ul className="space-y-3">
                                        {model.features.map((f, i) => (
                                            <li key={i} className="flex items-center text-sm text-aldurr-text-muted font-light">
                                                <span className="w-1.5 h-1.5 bg-aldurr-honey/70 mr-4" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-aldurr-text-body/40 tracking-widest uppercase block mb-1">Desde</span>
                                            <span className="text-2xl font-light text-aldurr-honey">€{model.price}</span>
                                        </div>
                                        <button className="px-6 py-3 bg-white/5 border border-white/20 text-aldurr-text-body text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold-metallic hover:text-aldurr-void hover:border-transparent transition-all duration-500">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Image Display */}
                    <div className="lg:w-2/3 relative min-h-[600px] border border-white/10 rounded-sm overflow-hidden bg-[#111111] shadow-2xl group/display">
                        <motion.div
                            key={activeModel}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={models[activeModel].image}
                                    alt={models[activeModel].title}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-cover transition-transform duration-[4s] group-hover/display:scale-105"
                                />

                                {/* Premium Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-aldurr-void via-transparent to-transparent opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-r from-aldurr-void/40 via-transparent to-transparent" />

                                {/* HUD Elements */}
                                <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
                                    <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3">
                                        <div className="w-2 h-2 bg-aldurr-honey animate-pulse" />
                                        <span className="text-[10px] font-mono text-aldurr-text-body tracking-[0.2em] uppercase">V-Ray Render Active</span>
                                    </div>
                                    <span className="text-[8px] font-mono text-aldurr-text-body/30 uppercase tracking-widest">Model_Type: {models[activeModel].id}_AL_DURR</span>
                                </div>

                                {/* Scanning Line Effect */}
                                <motion.div
                                    animate={{ top: ["-10%", "110%"] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aldurr-honey/30 to-transparent z-10"
                                />

                                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-aldurr-honey text-[10px] font-bold tracking-[0.5em] uppercase">Especificação</span>
                                        <h4 className="text-4xl md:text-6xl font-bold text-aldurr-text-body tracking-tighter">
                                            {models[activeModel].area}
                                        </h4>
                                    </div>

                                    {/* Glass Frame Info */}
                                    <div className="hidden md:block p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-sm max-w-[240px]">
                                        <span className="text-[9px] text-aldurr-honey font-mono block mb-2 opacity-70 uppercase tracking-widest">Architecture_Note</span>
                                        <p className="text-[11px] text-aldurr-text-muted font-light leading-relaxed">
                                            Design paramétrico otimizado para resiliência climática e eficiência térmica passiva.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
