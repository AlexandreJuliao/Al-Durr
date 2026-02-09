"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


const steps = [
    {
        num: "01",
        title: "Briefing & Design",
        desc: "Definimos as suas necessidades e adaptamos o modelo ao seu terreno. Tratamos de todo o licenciamento necessário.",
        time: "Mês 1"
    },
    {
        num: "02",
        title: "Fabricação Off-Site",
        desc: "Enquanto o terreno é preparado, a sua casa é construída em ambiente controlado na nossa fábrica. Sem atrasos de chuva.",
        time: "Mês 2-3"
    },
    {
        num: "03",
        title: "Logística & Montagem",
        desc: "Transporte para o local e montagem da estrutura principal em apenas alguns dias. O esqueleto nasce.",
        time: "Mês 3-4"
    },
    {
        num: "04",
        title: "Acabamentos & Entrega",
        desc: "Instalação de caixilharias, redes técnicas e carpintarias. Entrega da chave e manual da casa.",
        time: "Mês 4"
    }
];

export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="process" ref={containerRef} className="relative py-32 bg-aldurr-void text-white overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-32">
                    <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                        Timeline
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Do Sonho à Chave em <span className="text-aldurr-accent">4 Meses</span>
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto font-light">
                        O nosso processo industrializado elimina a incerteza da construção tradicional.
                        Prazos garantidos, orçamento fechado.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Time Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-aldurr-accent origin-top"
                        />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: i * 0.2 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"
                                    }`}
                            >
                                {/* Text Side */}
                                <div className="flex-1">
                                    <div className="inline-block bg-aldurr-surface/50 border border-white/5 px-4 py-1 rounded-full text-xs text-aldurr-accent mb-4 tracking-wider">
                                        {step.time}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-white/60 font-light leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Center Dot (Desktop) */}
                                <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 bg-aldurr-canvas border border-aldurr-accent rounded-full shrink-0">
                                    <span className="text-aldurr-accent font-bold text-sm">{step.num}</span>
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
