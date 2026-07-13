"use client";
import React from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {


    return (
        <footer className="relative bg-aldurr-void text-aldurr-text-body pt-32 pb-12 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10">

                {/* Main CTA Section */}
                <div className="flex flex-col items-center justify-center mb-32 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Ready to build your <span className="text-aldurr-green">legacy</span>?
                        </h2>
                        <p className="text-aldurr-text-body/60 max-w-xl mx-auto mb-10 text-lg font-light">
                            Agende uma reunião connosco e descubra como podemos transformar a sua visão em realidade.
                        </p>

                        <Magnetic>
                            <Link scroll={false} href="/contactos#contact-form">
                                <button className="px-12 py-5 bg-gold-metallic text-aldurr-canvas text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:brightness-110 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(45,90,66,0.3)] hover:scale-105 active:scale-95">
                                    Agendar Reunião
                                </button>
                            </Link>
                        </Magnetic>
                    </motion.div>
                </div>

                {/* Massive Typography */}
                <div className="relative border-b border-white/10 pb-12 mb-12">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[15vw] leading-none font-bold text-center tracking-tighter text-aldurr-text-body/5 select-none pointer-events-none"
                    >
                        AL DURR
                    </motion.h1>
                </div>

                {/* Bottom Links */}
                <div className="grid md:grid-cols-3 gap-8 items-end text-[13px] tracking-wide text-aldurr-text-muted">
                    <div className="space-y-4">
                        <div className="uppercase tracking-[0.2em] text-[10px] text-aldurr-green mb-6 font-bold">Social</div>
                        <div className="flex flex-col gap-3">
                            <Magnetic><a href="https://www.instagram.com/aldurr.pt/" target="_blank" rel="noopener noreferrer" className="hover:text-aldurr-text-body transition-colors w-fit">Instagram</a></Magnetic>
                            <Magnetic><a href="https://www.facebook.com/profile.php?id=61581264754701" target="_blank" rel="noopener noreferrer" className="hover:text-aldurr-text-body transition-colors w-fit">Facebook</a></Magnetic>
                        </div>
                    </div>

                    <div className="space-y-4 md:text-center">
                        <div className="uppercase tracking-[0.2em] text-[10px] text-aldurr-green mb-6 font-bold">Contact</div>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:geral@inovaldurr.pt" className="hover:text-aldurr-text-body transition-colors">geral@inovaldurr.pt</a>
                            <a href="tel:+351935994555" className="hover:text-aldurr-text-body transition-colors">+351 935 994 555</a>
                            <p className="text-[11px] opacity-70 mt-2">Rua Fialho de Almeida, n.º 14, 2.º Esq<br />1070-129 Lisboa, Portugal</p>
                        </div>
                    </div>

                    <div className="md:text-right flex flex-col justify-end h-full">
                        <div className="flex md:justify-end gap-4 mb-4 text-[12px]">
                            <Link href="/privacidade" className="hover:text-aldurr-text-body transition-colors">Privacidade</Link>
                            <span className="opacity-30 select-none">·</span>
                            <Link href="/termos" className="hover:text-aldurr-text-body transition-colors">Termos</Link>
                        </div>
                        <p className="hover:text-aldurr-text-body transition-colors">&copy; {new Date().getFullYear()} Al Durr Architecture.</p>
                        <p className="text-[10px] mt-2 uppercase tracking-widest opacity-50">All rights reserved.</p>
                    </div>
                </div>
            </div>


        </footer>
    );
}
