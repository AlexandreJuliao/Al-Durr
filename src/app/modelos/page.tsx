"use client";
import React from "react";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const modelsFull = [
    {
        id: "t1",
        title: "T1 STUDIO",
        subtitle: "Afinado para a Natureza",
        price: "149.900",
        area: "45m²",
        blueprint: "/blueprint-t1.png", // Placeholder
        desc: "O T1 Studio é a expressão mínima e perfeita do conceito A-Frame. Desenhado para maximizar a ligação com o exterior, é a escolha ideal para retiros de fim-de-semana ou unidades de turismo rural de alto rendimento.",
        specs: [
            { label: "Área Bruta", value: "45 m²" },
            { label: "Pé Direito", value: "5.5 m" },
            { label: "Quartos", value: "1 (Mezzanine)" },
            { label: "WC", value: "1 Completo" }
        ],
        features: [
            "Lounge com pé direito duplo",
            "Cozinha equipada oculta",
            "Deck frontal em madeira maciça (15m²)",
            "Fachada envidraçada termo-acústica"
        ]
    },
    {
        id: "t2",
        title: "T2 FAMILY",
        subtitle: "Espaço para Criar Memórias",
        price: "189.900",
        area: "75m²",
        blueprint: "/blueprint-t2.png", // Placeholder
        desc: "A evolução natural. O T2 Family mantém a elegância da geometria Prisma mas expande o volume para acomodar uma família pequena com total conforto. Dois quartos privados e uma área social generosa.",
        specs: [
            { label: "Área Bruta", value: "75 m²" },
            { label: "Pé Direito", value: "6.0 m" },
            { label: "Quartos", value: "2" },
            { label: "WC", value: "1 Premium" }
        ],
        features: [
            "Suite principal no piso térreo",
            "Quarto secundário em Mezzanine",
            "Área de arrumos técnica integrada",
            "Iluminação LED arquitetural"
        ]
    },
    {
        id: "custom",
        title: "T-MULTI",
        subtitle: "Sem Limites Arquitetónicos",
        price: "Sob Consulta",
        area: "∞",
        blueprint: "/blueprint-custom.png", // Placeholder
        desc: "O sistema construtivo Al Durr permite a extrusão do módulo base para comprimentos infinitos. Crie uma mansão A-Frame com múltiplas suites, ginásio, spa ou espaços de co-living.",
        specs: [
            { label: "Área Bruta", value: "Personalizável" },
            { label: "Configuração", value: "Livre" },
            { label: "Acabamentos", value: "Elite" },
            { label: "Domótica", value: "Integral" }
        ],
        features: [
            "Ligação de múltiplos módulos",
            "Paredes interiores amovíveis",
            "Acabamentos em mármore e madeiras exóticas",
            "Soluções Off-Grid disponíveis"
        ]
    }
];

export default function ModelosPage() {
    return (
        <main className="bg-aldurr-canvas min-h-screen relative text-white">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 text-center container mx-auto px-4 z-10 relative">
                <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                    Catálogo
                </span>
                <h1 className="text-5xl md:text-7xl font-bold">
                    A Coleção Prisma
                </h1>
            </section>

            {/* Models List */}
            <div className="space-y-0">
                {modelsFull.map((model, idx) => (
                    <section key={model.id} className={`py-24 border-t border-white/5 ${idx % 2 !== 0 ? 'bg-aldurr-surface/10' : ''}`}>
                        <div className="container mx-auto px-4">
                            <div className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                                {/* Info */}
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h2 className="text-4xl md:text-5xl font-bold">{model.title}</h2>
                                            <span className="px-3 py-1 bg-aldurr-accent/20 text-aldurr-accent text-[10px] font-bold tracking-widest uppercase rounded-full">
                                                {model.area}
                                            </span>
                                        </div>
                                        <p className="text-aldurr-accent text-sm tracking-widest uppercase mb-6">{model.subtitle}</p>
                                        <p className="text-white/60 font-light leading-relaxed text-lg">
                                            {model.desc}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-8 border-y border-white/5">
                                        {model.specs.map((spec, sIdx) => (
                                            <div key={sIdx}>
                                                <span className="block text-xs text-white/30 uppercase tracking-widest">{spec.label}</span>
                                                <span className="text-lg font-medium">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="space-y-2">
                                        {model.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center text-sm text-white/70">
                                                <span className="w-1.5 h-1.5 bg-aldurr-accent rounded-full mr-3" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <span className="block text-xs text-white/40 uppercase mb-1">Preço chave na mão desde</span>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-3xl font-bold text-aldurr-accent">€{model.price}</span>
                                            {model.id !== 'custom' && <span className="text-xs text-white/30 font-light">+ IVA</span>}
                                        </div>
                                    </div>

                                    <button className="px-8 py-4 border border-white/20 hover:border-aldurr-accent hover:bg-aldurr-accent hover:text-aldurr-canvas transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold">
                                        Pedir Planta Detalhada
                                    </button>
                                </div>

                                {/* Visual */}
                                <div className="flex-1 w-full relative h-[500px] border border-white/10 p-4">
                                    <div className="relative w-full h-full bg-black/20">
                                        {/* Placeholder for specific model render */}
                                        <Image
                                            src={model.id === 't1' ? '/t1-studio.png' : (model.id === 't2' ? '/t2-family.png' : '/t2-family.png')}
                                            alt={model.title}
                                            fill
                                            className="object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="bg-black/50 backdrop-blur-md px-4 py-2 text-white/50 text-xs tracking-widest border border-white/10">
                                                Visualizar Planta 3D
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <Footer />
        </main>
    );
}
