"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar() {
    const { t, locale, switchLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide on scroll down (if > 100px), show on scroll up
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Glass effect intensity based on scroll position
            if (currentScrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center transition-all duration-500 transform 
                ${isVisible ? "translate-y-0" : "-translate-y-full"} 
                ${isScrolled ? "backdrop-blur-2xl bg-black/40 border-b border-white/[0.05] shadow-2xl shadow-black/40" : "bg-transparent"}
            `}
        >
            {/* Logo */}
            <Link href="/" className="z-10 cursor-pointer hover:opacity-80 transition-opacity relative h-12 md:h-16 lg:h-20 w-40 md:w-52 lg:w-64">
                <Image
                    src="/logos/logo-white-horizontal.png"
                    alt="Al Durr Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex xl:gap-12 lg:gap-8 md:gap-4 text-[10px] lg:text-xs tracking-[0.15em] text-aldurr-text-body font-medium">
                <Magnetic>
                    <Link href="/modelos" className="hover:text-aldurr-accent transition-colors duration-300">
                        {t.nav.models}
                    </Link>
                </Magnetic>
                <Magnetic>
                    <Link href="/galeria" className="hover:text-aldurr-accent transition-colors duration-300">
                        {t.nav.gallery}
                    </Link>
                </Magnetic>
                <Magnetic>
                    <Link href="/processo" className="hover:text-aldurr-accent transition-colors duration-300">
                        {t.nav.process}
                    </Link>
                </Magnetic>
                <Magnetic>
                    <Link href="/contactos" className="hover:text-aldurr-accent transition-colors duration-300">
                        CONTACTOS
                    </Link>
                </Magnetic>
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden md:flex items-center xl:gap-8 lg:gap-6 md:gap-4 z-10">
                {/* Language Switcher */}
                <div className="flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs font-mono">
                    <button
                        onClick={() => switchLanguage("pt")}
                        className={`transition-all duration-300 hover:text-aldurr-text-body ${locale === "pt" ? "text-white font-bold" : "text-aldurr-text-muted hover:text-aldurr-text-body"}`}
                    >
                        PT
                    </button>
                    <span className="text-aldurr-text-muted/30">|</span>
                    <button
                        onClick={() => switchLanguage("en")}
                        className={`transition-all duration-300 hover:text-aldurr-text-body ${locale === "en" ? "text-white font-bold" : "text-aldurr-text-muted hover:text-aldurr-text-body"}`}
                    >
                        EN
                    </button>
                </div>

                {/* CTA */}
                <Magnetic>
                    <Link href="/contactos">
                        <button className="px-4 lg:px-8 py-2.5 lg:py-3 bg-gold-metallic text-aldurr-canvas text-[9px] lg:text-[10px] font-bold tracking-[0.2em] rounded-full hover:brightness-110 hover:shadow-[0_0_20px_rgba(45,90,66,0.4)] transition-all duration-500 uppercase shadow-lg shadow-aldurr-accent/20 whitespace-nowrap">
                            {t.nav.cta}
                        </button>
                    </Link>
                </Magnetic>
            </div>

            {/* Mobile Hamburger & Menu */}
            <div className="md:hidden z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 group"
                >
                    <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                    <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {/* Mobile Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 bg-aldurr-void/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-start pt-32 pb-12 transition-all duration-700 h-[100dvh] w-full overflow-y-auto
                ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}`}
            >
                <div className="flex flex-col items-center gap-10 text-xl md:text-2xl font-bold tracking-widest uppercase my-auto w-full">
                    <Link href="/modelos" onClick={() => setIsMobileMenuOpen(false)} className={`${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} transition-all duration-500 delay-100 hover:text-aldurr-accent`}>{t.nav.models}</Link>
                    <Link href="/galeria" onClick={() => setIsMobileMenuOpen(false)} className={`${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} transition-all duration-500 delay-200 hover:text-aldurr-accent`}>{t.nav.gallery}</Link>
                    <Link href="/processo" onClick={() => setIsMobileMenuOpen(false)} className={`${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} transition-all duration-500 delay-300 hover:text-aldurr-accent`}>{t.nav.process}</Link>
                    <Link href="/contactos" onClick={() => setIsMobileMenuOpen(false)} className={`${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} transition-all duration-500 delay-400 text-aldurr-accent`}>Contactos</Link>
                </div>

                {/* Mobile Language & CTA */}
                <div className="mt-12 flex flex-col items-center gap-8 pb-8">
                    <div className="flex items-center gap-6">
                        <button onClick={() => switchLanguage("pt")} className={`${locale === "pt" ? "text-white font-bold" : "text-aldurr-text-muted"}`}>PT</button>
                        <button onClick={() => switchLanguage("en")} className={`${locale === "en" ? "text-white font-bold" : "text-aldurr-text-muted"}`}>EN</button>
                    </div>
                    <Link href="/contactos" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-full uppercase text-xs tracking-widest hover:bg-aldurr-honey hover:text-aldurr-void transition-colors">
                            {t.nav.cta}
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
