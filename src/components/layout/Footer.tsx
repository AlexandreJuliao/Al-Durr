"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-aldurr-void text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
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
                            Ready to build your <span className="text-aldurr-honey">legacy</span>?
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg font-light">
                            Agende uma reunião connosco e descubra como podemos transformar a sua visão em realidade.
                        </p>

                        <Magnetic>
                            <button className="px-12 py-5 bg-white text-aldurr-canvas text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:bg-aldurr-accent hover:text-white transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95">
                                Agendar Reunião
                            </button>
                        </Magnetic>
                    </motion.div>
                </div>

                {/* Massive Typography */}
                <div className="relative border-b border-white/10 pb-12 mb-12">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[15vw] leading-none font-bold text-center tracking-tighter text-white/5 select-none pointer-events-none"
                    >
                        AL DURR
                    </motion.h1>
                </div>

                {/* Bottom Links */}
                <div className="grid md:grid-cols-3 gap-8 items-end text-sm text-white/40">
                    <div className="space-y-4">
                        <div className="uppercase tracking-widest text-xs text-aldurr-accent mb-4 font-bold">Social</div>
                        <div className="flex flex-col gap-2">
                            <Magnetic><Link href="#" className="hover:text-white transition-colors w-fit">Instagram</Link></Magnetic>
                            <Magnetic><Link href="#" className="hover:text-white transition-colors w-fit">LinkedIn</Link></Magnetic>
                            <Magnetic><Link href="#" className="hover:text-white transition-colors w-fit">WhatsApp</Link></Magnetic>
                        </div>
                    </div>

                    <div className="space-y-4 md:text-center">
                        <div className="uppercase tracking-widest text-xs text-aldurr-accent mb-4 font-bold">Contact</div>
                        <div className="flex flex-col gap-2">
                            <a href="mailto:info@aldurr.com" className="hover:text-white transition-colors">info@aldurr.com</a>
                            <p>+351 999 999 999</p>
                        </div>
                    </div>

                    <div className="md:text-right flex flex-col justify-end h-full">
                        <p>&copy; {new Date().getFullYear()} Al Durr Architecture.</p>
                        <p className="text-[10px] mt-2">All rights reserved.</p>
                    </div>
                </div>
            </div>


        </footer>
    );
}
