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

    return (
        <section className="relative py-24 bg-aldurr-canvas text-white border-t border-white/5">
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-4">
                        Dúvidas Comuns
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Esclarecimentos
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-white/10">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center py-6 text-left hover:text-aldurr-accent transition-colors"
                            >
                                <span className="text-lg md:text-xl font-light">{faq.q}</span>
                                <span className="text-aldurr-accent text-2xl">
                                    {openIndex === i ? "−" : "+"}
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
                                        <p className="pb-6 text-white/50 text-base font-light leading-relaxed max-w-2xl">
                                            {faq.a}
                                        </p>
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
