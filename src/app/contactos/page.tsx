"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Pedro Antunes",
        role: "Founder & Design Lead",
        bio: "O visionário por trás da estética Al Durr. Com vasta experiência em design de elite, Pedro funde a engenharia de precisão com a visão arquitetónica contemporânea.",
        image: "/team-architect.avif"
    },
    {
        name: "Érica Antunes",
        role: "Structural & Design",
        bio: "A força que assegura a integridade de cada projeto. Especialista em sistemas avançados, garante segurança e excelência estética em cada traço.",
        image: "/team-engineer.avif"
    },
    {
        name: "Tatiana Antunes",
        role: "Operations Director",
        bio: "A maestrina da logística e gestão. Garante que do primeiro contacto à entrega da chave, o processo Al Durr é fluido, rigoroso e de alta performance.",
        image: "/team-ops.avif"
    }
];

export default function ContactosPage() {
    return (
        <main className="bg-aldurr-void min-h-screen relative text-aldurr-text-body overflow-x-hidden">
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aldurr-honey/5 rounded-full blur-[150px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aldurr-honey/5 rounded-full blur-[150px] -ml-64 -mb-64" />
            </div>

            {/* Title Section */}
            <section className="pt-40 pb-20 container mx-auto px-4 text-center relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-aldurr-honey text-xs font-bold tracking-[0.5em] uppercase block mb-6 flex items-center justify-center gap-4"
                >
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                    Equipa
                    <span className="w-12 h-[1px] bg-aldurr-honey/30" />
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-9xl font-bold tracking-tight mb-6"
                >
                    THE <span className="text-transparent font-outline-2">MINDS.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl text-aldurr-text-body/50 max-w-2xl mx-auto font-light"
                >
                    Conheça os artesãos que irão desenhar o seu legado.
                </motion.p>
            </section>

            {/* Creative Team Grid */}
            <section className="pb-32 container mx-auto px-4 relative z-10">
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
                            <div className="relative p-8 bg-white/[0.02] border border-white/5 rounded-sm group-hover:-translate-y-2 transition-transform duration-500 ease-out h-full min-h-[300px] flex flex-col justify-end">
                                <div className="absolute inset-0 bg-aldurr-honey/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <p className="text-aldurr-honey text-xs font-bold tracking-[0.2em] uppercase mb-2">{member.role}</p>
                                    <h3 className="text-3xl font-bold mb-4 text-white">{member.name}</h3>
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
            <section id="contact-form" className="bg-aldurr-stone border-t border-white/5 relative z-10">
                <div className="container mx-auto px-4 py-24 grid lg:grid-cols-2 gap-20">

                    {/* Left: Info */}
                    <div className="space-y-12">
                        <div>
                            <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                                Contacto
                            </span>
                            <h2 className="text-5xl font-bold mb-8 text-aldurr-text-heading">Vamos conversar?</h2>
                            <p className="text-aldurr-text-body/50 text-lg leading-relaxed max-w-md font-light">
                                Estamos prontos para ouvir a sua visão. Seja um terreno que já possui ou um sonho que ainda procura o lugar certo.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="border-l-2 border-aldurr-honey/50 pl-6">
                                <p className="text-xs text-aldurr-honey uppercase tracking-widest mb-1">Email</p>
                                <a href="mailto:grupo@tatierica.pt" className="text-2xl text-aldurr-text-heading hover:text-aldurr-honey transition-colors">grupo@tatierica.pt</a>
                            </div>
                            <div className="border-l-2 border-aldurr-honey/50 pl-6">
                                <p className="text-xs text-aldurr-honey uppercase tracking-widest mb-1">Telefone</p>
                                <a href="tel:+351935994555" className="text-2xl text-aldurr-text-heading hover:text-aldurr-honey transition-colors">+351 935 994 555</a>
                            </div>
                            <div className="border-l-2 border-aldurr-honey/50 pl-6">
                                <p className="text-xs text-aldurr-honey uppercase tracking-widest mb-1">Sede</p>
                                <p className="text-xl text-aldurr-text-heading">R. Nossa Sra. da Graça<br />Póvoa de Penafirme 119<br />2560-046 Torres Vedras</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="relative z-20">
                        <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-sm backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-8 text-aldurr-text-heading">Inicie o seu Legado.</h3>
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 relative z-10 bg-aldurr-void overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-20">
                        <span className="text-aldurr-honey text-xs font-bold tracking-[0.4em] uppercase block mb-4">Informação Útil</span>
                        <h2 className="text-4xl md:text-6xl font-bold font-display leading-[0.9]">Perguntas <br /><span className="text-transparent font-outline-2 italic">Frequentes.</span></h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "As casas Al Durr precisam de licenciamento?", a: "Sim, como qualquer construção permanente em Portugal, as nossas moradias requerem licenciamento camarário. Tratamos de todo o projeto de arquitetura e especialidades para submissão." },
                            { q: "É possível construir em qualquer terreno?", a: "Desde que o terreno seja urbanizável ou tenha índice de construção, o nosso sistema adapta-se. Realizamos uma análise técnica gratuita ao seu terreno antes de avançarmos." },
                            { q: "As casas são transportadas em que formato?", a: "Depende do modelo. A T1 é transportada em módulos quase finalizados, enquanto modelos maiores (T-Multi) são transportados em secções 3D otimizadas e finalizados no local em tempo recorde." },
                            { q: "Aceitam financiamento bancário?", a: "Sim. Sendo construções permanentes com licença de habitabilidade, são elegíveis para Crédito Habitação tradicional em qualquer instituição bancária nacional." }
                        ].map((faq, i) => (
                            <div key={i} className="group p-8 border border-white/5 hover:border-white/10 transition-all duration-300 bg-white/[0.01]">
                                <h4 className="text-lg font-bold text-white mb-4 flex justify-between items-center group-hover:text-aldurr-honey transition-colors">
                                    {faq.q}
                                    <span className="text-aldurr-honey text-xl">+</span>
                                </h4>
                                <p className="text-sm text-white/40 leading-relaxed max-w-2xl">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
