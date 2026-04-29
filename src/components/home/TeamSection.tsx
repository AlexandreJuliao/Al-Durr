"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const team = [
    {
        name: "Pedro Antunes",
        role: "Founder & Design Lead",
        bio: "Visionário por trás do traço A-Frame contemporâneo. Focado em engenharia de precisão e design de elite para criar legados duradouros."
    },
    {
        name: "Érica Antunes",
        role: "Structural & Design",
        bio: "Especialista em garantir que a estética e a funcionalidade caminham juntas, assegurando estruturas que resistem ao tempo com elegância."
    },
    {
        name: "Tatiana Antunes",
        role: "Operations & Management",
        bio: "Responsável pela coordenação e fluidez de todos os processos, garantindo que cada projeto Al Durr seja entregue com rigor e excelência."
    }
];

export default function TeamSection() {
    return (
        <section className="relative py-24 md:py-32 bg-aldurr-stone text-aldurr-text-body border-t border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-aldurr-stone to-transparent opacity-50" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="text-center mb-24">
                    <span className="text-aldurr-honey text-[10px] font-bold tracking-[0.4em] uppercase block mb-6 shadow-aldurr-honey/30">
                        Quem Somos
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-aldurr-text-body mb-6 tracking-tight font-display">
                        A visão por trás do <span className="text-transparent font-outline-2 stroke-aldurr-honey">Traço.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            className="bg-white/[0.02] backdrop-blur-xl p-10 border border-white/10 rounded-sm hover:bg-white-[0.05] hover:border-aldurr-honey/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group"
                        >
                            {/* Photo removed as requested */}
                            <h3 className="text-2xl font-bold text-aldurr-text-body mb-2 group-hover:text-aldurr-honey transition-colors">{member.name}</h3>
                            <p className="text-[10px] text-aldurr-honey font-bold uppercase tracking-[0.2em] mb-6 inline-block bg-aldurr-honey/10 px-3 py-1 rounded-sm">{member.role}</p>
                            <p className="text-base text-aldurr-text-body/60 font-light leading-relaxed">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
