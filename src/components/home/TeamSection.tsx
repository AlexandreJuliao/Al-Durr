"use client";
import React from "react";
import { motion } from "framer-motion";

const team = [
    {
        name: "Arquiteto Principal",
        role: "Founder & Design Lead",
        bio: "Visionário por trás do traço A-Frame contemporâneo. 15 anos de experiência em arquitetura modular."
    },
    {
        name: "Engenharia Civil",
        role: "Structural Head",
        bio: "Especialista em estruturas leves e sismo-resistentes. Garante que a estética sobrevive ao tempo."
    },
    {
        name: "Gestão de Obra",
        role: "Operations Director",
        bio: "O relógio suíço da equipa. Assegura que os 4 meses são cumpridos à risca."
    }
];

export default function TeamSection() {
    return (
        <section className="relative py-24 bg-aldurr-stone text-white border-t border-aldurr-honey/20">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-4">
                        Quem Somos
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Mentes por trás do <span className="text-aldurr-accent">Traço.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="bg-aldurr-surface/30 p-8 border border-white/5 hover:border-aldurr-accent/50 transition-colors duration-300 group"
                        >
                            <div className="w-16 h-16 bg-aldurr-accent/10 rounded-full mb-6 flex items-center justify-center text-aldurr-accent group-hover:bg-aldurr-accent group-hover:text-aldurr-canvas transition-all duration-300">
                                {/* Placeholder Icon since we don't have photos yet */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-xs text-aldurr-accent uppercase tracking-widest mb-4">{member.role}</p>
                            <p className="text-sm text-white/50 font-light leading-relaxed">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
