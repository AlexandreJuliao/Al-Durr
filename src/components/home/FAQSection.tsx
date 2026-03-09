"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "É necessário licenciamento?",
        a: "Sim. Apesar de ser construção modular, é uma habitação permanente e requer licenciamento camarário. A nossa equipa de arquitetura trata de todo o processo burocrático por si."
    },
    {
        q: "O preço inclui transporte e montagem?",
        a: "O valor base inclui a fabricação e montagem num raio de 50km da nossa fábrica. O transporte para distâncias maiores é orçamentado caso a caso, dependendo da acessibilidade do terreno."
    },
    {
        q: "Qual a durabilidade da estrutura?",
        a: "A estrutura em Pinho Nórdico Tratado e Aço tem uma esperança de vida superior a 50 anos, similar à construção tradicional, desde que feita a manutenção mínima recomendada."
    },
    {
        q: "Posso personalizar os acabamentos?",
        a: "Absolutamente. O modelo T-Multi é 100% personalizável. Nos modelos T1 e T2, temos 3 linhas de acabamentos (Nature, Dark, Pure) que pode escolher sem custo adicional."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    console.log("FAQSection Render", openIndex);
    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-aldurr-void to-aldurr-void text-aldurr-text-body border-t border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-aldurr-honey/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-aldurr-honey/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-24">
                    <span className="text-aldurr-honey text-[10px] font-bold tracking-[0.4em] uppercase block mb-6">
                        Dúvidas Comuns
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display">
                        <span className="text-transparent font-outline-2">Esclarecimentos</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-colors hover:border-white/20 hover:bg-white/10">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center px-8 py-6 text-left group"
                            >
                                <span className={`text-lg md:text-xl font-light transition-colors ${openIndex === i ? 'text-aldurr-honey' : 'text-aldurr-text-body group-hover:text-aldurr-text-muted'}`}>{faq.q}</span>
                                <span className={`text-2xl transition-transform duration-300 font-light ${openIndex === i ? 'text-aldurr-honey rotate-45' : 'text-aldurr-text-muted'}`}>
                                    +
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8">
                                            <div className="w-12 h-[1px] bg-aldurr-honey/50 mb-6" />
                                            <p className="text-aldurr-text-muted text-base md:text-lg font-light leading-relaxed max-w-2xl">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
