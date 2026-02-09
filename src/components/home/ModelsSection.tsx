"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const models = [
    {
        id: "t1",
        title: "T1 STUDIO",
        subtitle: "O Refúgio Perfeito",
        price: "149.900",
        area: "45m²",
        desc: "Ideal para turismo rural ou casa de férias compacta. Design otimizado para conforto máximo em área reduzida.",
        features: ["1 Quarto Mezzanine", "1 WC Completo", "Sala + Kitchenette", "Deck Frontal"],
        image: "/t1-studio.png"
    },
    {
        id: "t2",
        title: "T2 FAMILY",
        subtitle: "Vida em Equilíbrio",
        price: "189.900",
        area: "75m²",
        desc: "A escolha equilibrada para pequenas famílias. Amplas áreas sociais e privacidade nos quartos.",
        features: ["2 Quartos", "1 WC Premium", "Sala Panorâmica", "Área Técnica"],
        image: "/t2-family.png"
    },
    {
        id: "custom",
        title: "T-MULTI",
        subtitle: "Sem Limites",
        price: "Sob Consulta",
        area: "75m²+",
        desc: "A modularidade permite expandir o comprimento da casa infinitamente. Crie a sua mansão A-Frame.",
        features: ["Layout Personalizado", "Múltiplas Suites", "Sauna / Ginásio", "Acabamentos Elite"],
        image: "/t2-family.png"
    }
];

export default function ModelsSection() {
    const { t } = useLanguage();
    const [activeModel, setActiveModel] = useState(0);

    return (
        <section id="models" className="relative py-32 bg-aldurr-surface text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-4">
                        A Coleção
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        Modelos <span className="text-aldurr-accent italic font-serif">Al Durr</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto font-light">
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
                                className={`group p-8 border cursor-pointer transition-all duration-500 relative overflow-hidden ${activeModel === idx
                                    ? "border-aldurr-accent bg-aldurr-accent/5"
                                    : "border-white/10 hover:border-white/30 bg-white/5"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-2xl font-bold tracking-wide transition-colors ${activeModel === idx ? "text-white" : "text-white/70"
                                        }`}>{model.title}</h3>
                                    {activeModel === idx && (
                                        <motion.span
                                            layoutId="active-dot"
                                            className="w-2 h-2 bg-aldurr-accent rounded-full mt-2"
                                        />
                                    )}
                                </div>
                                <p className="text-xs tracking-widest uppercase text-aldurr-accent mb-4 opacity-80">{model.subtitle}</p>

                                <motion.div
                                    initial={false}
                                    animate={{ height: activeModel === idx ? "auto" : 0, opacity: activeModel === idx ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
                                        {model.desc}
                                    </p>
                                    <ul className="space-y-2">
                                        {model.features.map((f, i) => (
                                            <li key={i} className="flex items-center text-sm text-white/80">
                                                <span className="w-1 h-1 bg-aldurr-accent rounded-full mr-3" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-white/40 uppercase block">Desde</span>
                                            <span className="text-xl font-bold text-aldurr-accent">€{model.price}</span>
                                        </div>
                                        <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-aldurr-accent hover:text-white transition-colors">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Image Display */}
                    <div className="lg:w-2/3 relative min-h-[500px] border border-white/5 bg-black/20">
                        <motion.div
                            key={activeModel}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 p-8 flex items-center justify-center"
                        >
                            {/* Placeholder visual since we don't have separate pics for T1/T2 yet. 
                                 Using the exterior one for now but tinted/cropped differently could work,
                                 or just generic placeholders. */}
                            <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                                {/* Ideally we place 3D renders here. For now, using the main exterior as placeholder 
                                   but in a real scenario we'd swap sources. */}
                                <Image
                                    src={models[activeModel].image}
                                    alt={models[activeModel].title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-aldurr-canvas via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-12 left-12">
                                    <h4 className="text-6xl md:text-8xl font-bold text-white/10 select-none">
                                        {models[activeModel].area}
                                    </h4>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
