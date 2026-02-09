"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Duarte Silva",
        role: "Lead Architect",
        bio: "O visionário por trás da estética Al Durr. Com 15 anos de experiência em design sustentável, Duarte funde a natureza com o betão.",
        image: "/team-architect.png" // We have this one
    },
    {
        name: "Inês Santos",
        role: "Head of Engineering",
        bio: "A força que mantém tudo de pé. Especialista em estruturas modulares e sismo-resistentes, garantindo segurança sem comprometer a arte.",
        image: "/team-engineer.png" // Hope to get this
    },
    {
        name: "Pedro Costa",
        role: "Operations Director",
        bio: "O maestro da logística. Garante que do primeiro traço à chave na mão, o processo é fluido e o prazo é sagrado.",
        image: "/team-ops.png" // Hope to get this
    }
];

export default function ContactosPage() {
    return (
        <main className="bg-aldurr-canvas min-h-screen relative text-white overflow-x-hidden">
            <Navbar />

            {/* Title Section */}
            <section className="pt-40 pb-20 container mx-auto px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-9xl font-bold tracking-tight mb-6"
                >
                    THE <span className="text-aldurr-accent">MINDS.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl text-white/60 max-w-2xl mx-auto font-light"
                >
                    Conheça os artesãos que irão desenhar o seu legado.
                </motion.p>
            </section>

            {/* Creative Team Grid */}
            <section className="pb-32 container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="relative h-[500px] w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-aldurr-accent text-xs font-bold tracking-[0.2em] uppercase mb-2">{member.role}</p>
                                    <h3 className="text-3xl font-bold mb-4">{member.name}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Split Contact Section */}
            <section className="bg-white/5 border-t border-white/5">
                <div className="container mx-auto px-4 py-24 grid lg:grid-cols-2 gap-20">

                    {/* Left: Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-5xl font-bold mb-8">Vamos conversar?</h2>
                            <p className="text-white/60 text-lg leading-relaxed max-w-md">
                                Estamos prontos para ouvir a sua visão. Seja um terreno que já possui ou um sonho que ainda procura o lugar certo.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="border-l-2 border-aldurr-accent pl-6">
                                <p className="text-xs text-aldurr-accent uppercase tracking-widest mb-1">Email</p>
                                <a href="mailto:info@aldurr.pt" className="text-2xl hover:text-aldurr-accent transition-colors">info@aldurr.pt</a>
                            </div>
                            <div className="border-l-2 border-aldurr-accent pl-6">
                                <p className="text-xs text-aldurr-accent uppercase tracking-widest mb-1">Telefone</p>
                                <a href="tel:+351912345678" className="text-2xl hover:text-aldurr-accent transition-colors">+351 912 345 678</a>
                            </div>
                            <div className="border-l-2 border-aldurr-accent pl-6">
                                <p className="text-xs text-aldurr-accent uppercase tracking-widest mb-1">Studio</p>
                                <p className="text-xl">Av. da Liberdade, 100<br />Lisboa, Portugal</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-aldurr-surface/30 p-8 md:p-12 border border-white/10 rounded-sm backdrop-blur-sm shadow-2xl">
                            <h3 className="text-2xl font-bold mb-8">Inicie o seu Legado.</h3>
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
