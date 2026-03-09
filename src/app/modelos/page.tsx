"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const modelsFull = [
    {
        id: "t1",
        title: "T1 STUDIO",
        subtitle: "Afinado para a Natureza",
        price: "149.900",
        area: "45m²",
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
        ],
        image: "/t1-model.jpg"
    },
    {
        id: "t2",
        title: "T2 FAMILY",
        subtitle: "Espaço para Criar Memórias",
        price: "189.900",
        area: "75m²",
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
        ],
        image: "/t2-model.jpg"
    },
    {
        id: "custom",
        title: "T-MULTI",
        subtitle: "Sem Limites Arquitetónicos",
        price: "Sob Consulta",
        area: "∞",
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
        ],
        image: "/t-multi-model.jpg"
    }
];

export default function ModelosPage() {
    return (
        <main className="bg-aldurr-void min-h-screen relative text-aldurr-text-body">
            <Navbar />

            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aldurr-honey/5 rounded-full blur-[150px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aldurr-honey/5 rounded-full blur-[150px] -ml-32 -mb-32" />
            </div>

            {/* Header */}
            <section className="pt-40 pb-20 text-center container mx-auto px-4 z-10 relative">
                <span className="text-aldurr-honey text-xs font-bold tracking-[0.5em] uppercase block mb-6 flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                    Catálogo
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display">
                    A Coleção <span className="text-transparent font-outline-2">Prisma</span>
                </h1>
            </section>

            {/* Models List */}
            <div className="space-y-0 relative z-10">
                {modelsFull.map((model, idx) => (
                    <motion.section
                        key={model.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="py-24 border-t border-white/5"
                    >
                        <div className="container mx-auto px-4">
                            <div className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                                {/* Info */}
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h2 className="text-4xl md:text-5xl font-bold text-aldurr-text-heading font-display">{model.title}</h2>
                                            <span className="px-3 py-1 bg-aldurr-honey/10 text-aldurr-honey text-[10px] font-bold tracking-widest uppercase rounded-sm">
                                                {model.area}
                                            </span>
                                        </div>
                                        <p className="text-aldurr-honey text-xs tracking-[0.3em] uppercase mb-6 font-bold">{model.subtitle}</p>
                                        <p className="text-aldurr-text-body/50 font-light leading-relaxed text-lg">
                                            {model.desc}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-8 border-y border-white/5">
                                        {model.specs.map((spec, sIdx) => (
                                            <div key={sIdx}>
                                                <span className="block text-xs text-aldurr-honey/50 uppercase tracking-widest mb-1">{spec.label}</span>
                                                <span className="text-lg font-medium text-aldurr-text-heading">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="space-y-3">
                                        {model.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center text-sm text-aldurr-text-body/60 gap-3">
                                                <span className="w-1.5 h-1.5 bg-aldurr-honey rounded-full shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <span className="block text-xs text-aldurr-honey/40 uppercase tracking-widest mb-2">Preço chave na mão desde</span>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-3xl font-bold text-aldurr-honey">€{model.price}</span>
                                            {model.id !== 'custom' && <span className="text-xs text-aldurr-text-body/30 font-light">+ IVA</span>}
                                        </div>
                                    </div>

                                    <button className="px-8 py-4 border border-aldurr-honey/40 bg-aldurr-honey/10 text-aldurr-text-body font-bold hover:bg-aldurr-honey hover:text-aldurr-void transition-all duration-500 uppercase tracking-[0.2em] text-xs rounded-sm">
                                        Pedir Planta Detalhada
                                    </button>
                                </div>

                                {/* Visual */}
                                <div className="flex-1 w-full relative h-[500px] border border-white/5 rounded-sm overflow-hidden group bg-aldurr-stone">
                                    <Image
                                        src={model.image}
                                        alt={model.title}
                                        fill
                                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="bg-aldurr-void/80 border border-aldurr-honey/30 backdrop-blur-sm px-6 py-3 text-aldurr-honey text-xs font-bold tracking-widest uppercase rounded-sm">
                                            VISUALIZAR PLANTA 3D
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* Technical Specification Banner */}
            <section className="py-20 bg-aldurr-stone/50 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="max-w-xl">
                        <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-4 italic">Alta Performance</span>
                        <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Eficiência Térmica Classe A+ em todos os modelos.</h2>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Utilizamos painéis de madeira contralaminada (CLT) e isolamento térmico de alta densidade, garantindo um conforto térmico superior com consumo energético mínimo.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "U-Value Parede", value: "0.18 W/m²K" },
                            { label: "U-Value Vidro", value: "1.0 W/m²K" },
                            { label: "Inércia Térmica", value: "Alta" },
                            { label: "Pegada CO2", value: "Negativa" }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-sm">
                                <p className="text-[10px] text-aldurr-honey uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className="text-xl font-bold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Model Comparison Table */}
            <section className="py-32 relative z-10 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-4 italic">Precisão Técnica</span>
                        <h2 className="text-4xl md:text-6xl font-bold font-display leading-[0.9]">Comparação <br /><span className="text-transparent font-outline-2 italic">Direta</span></h2>
                    </div>
                    
                    <div className="overflow-x-auto pb-10">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-6 px-4 text-xs uppercase tracking-widest text-white/30 font-bold">Especificação</th>
                                    {modelsFull.map(m => (
                                        <th key={m.id} className="py-6 px-4 text-lg font-bold text-aldurr-honey">{m.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: "Área de Implantação", values: ["45 m²", "75 m²", "Custom"] },
                                    { label: "Piso 0 (Social)", values: ["30 m²", "55 m²", "Variável"] },
                                    { label: "Mezzanine (Privado)", values: ["15 m²", "20 m²", "Personalizável"] },
                                    { label: "Ambientes", values: ["1 Quarto, 1 WC", "2 Quartos, 1 WC", "Escalável"] },
                                    { label: "Pé Direito Máximo", values: ["5.5m", "6.0m", "Sob Medida"] },
                                    { label: "Isolamento Térmico", values: ["Classe A+", "Classe A+", "Classe A++"] },
                                    { label: "Prazo de Montagem", values: ["1 Semana", "1.5 Semanas", "Variável"] }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-6 px-4 text-sm text-white/50 group-hover:text-aldurr-honey transition-colors">{row.label}</td>
                                        {row.values.map((v, idx) => (
                                            <td key={idx} className="py-6 px-4 text-sm font-medium text-white">{v}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Customization & Materials */}
            <section className="py-32 relative z-10 bg-aldurr-void overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.03] -z-10" />
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="relative h-[650px] w-full p-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-sm">
                                <div className="relative w-full h-full bg-white/[0.02] border border-dashed border-white/20 rounded-sm overflow-hidden flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-12 h-12 border-2 border-dashed border-aldurr-honey/30 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:border-aldurr-honey transition-all duration-500">
                                            <span className="text-aldurr-honey">+</span>
                                        </div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-aldurr-honey/50 transition-colors">Imagem de Acabamentos</p>
                                    </div>
                                </div>
                            </div>
                            {/* Material Dots HUD overlay potentially? */}
                        </div>
                        
                        <div className="space-y-12">
                            <div>
                                <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-6">Personalização</span>
                                <h2 className="text-5xl md:text-7xl font-bold font-display leading-[1.0] mb-8">O Seu Legado <br /><span className="text-transparent font-outline-2 italic">Inimitável.</span></h2>
                                <p className="text-aldurr-text-body/60 text-lg font-light leading-relaxed max-w-xl">
                                    Não construímos casas em série. Cada refúgio Al Durr é uma peça de autor. Explore as nossas linhas de curadoria para interiores.
                                </p>
                            </div>
                            
                            <div className="grid gap-6">
                                {[
                                    { title: "Nórdico Essencial", desc: "A pureza da madeira clara. Foco na claridade e texturas orgânicas." },
                                    { title: "Contemporâneo", desc: "Betão afagado e aço. Um diálogo entre o industrial e o acolhedor." },
                                    { title: "Obsidian Elite", desc: "Paleta escura e luxuosa. A elegância suprema em cada sombra." }
                                ].map((p, i) => (
                                    <div key={i} className="group p-8 border border-white/5 hover:border-aldurr-honey/30 transition-all duration-500 relative bg-white/[0.01]">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-xl font-bold text-white group-hover:text-aldurr-honey transition-colors">{p.title}</h4>
                                            <span className="text-[10px] text-white/20 uppercase tracking-widest group-hover:text-aldurr-honey/50">Linha 0{i+1}</span>
                                        </div>
                                        <p className="text-sm text-white/40 leading-relaxed">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="pt-6">
                                <button className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-aldurr-honey hover:text-white transition-all transform hover:-translate-y-1">
                                    Descarregar Catálogo de Acabamentos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
