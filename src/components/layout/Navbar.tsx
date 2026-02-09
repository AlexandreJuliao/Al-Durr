"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
            ${isScrolled ? "backdrop-blur-md bg-aldurr-canvas/40 border-b border-white/5 shadow-2xl shadow-black/20" : "bg-transparent"}
            `}
        >
            {/* Logo */}
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-[0.2em] text-aldurr-text-heading z-10 cursor-pointer hover:opacity-80 transition-opacity">
                AL DURR
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-12 text-xs tracking-[0.15em] text-aldurr-text-body font-medium">
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
            <div className="hidden md:flex items-center gap-8 z-10">
                {/* Language Switcher */}
                <div className="flex items-center gap-3 text-xs font-mono">
                    <button
                        onClick={() => switchLanguage("pt")}
                        className={`transition-colors duration-300 hover:text-white ${locale === "pt" ? "text-aldurr-accent" : "text-aldurr-text-body"
                            }`}
                    >
                        PT
                    </button>
                    <span className="text-aldurr-text-body opacity-20">|</span>
                    <button
                        onClick={() => switchLanguage("en")}
                        className={`transition-colors duration-300 hover:text-white ${locale === "en" ? "text-aldurr-accent" : "text-aldurr-text-body"
                            }`}
                    >
                        EN
                    </button>
                </div>

                {/* CTA */}
                <Magnetic>
                    <Link href="/contactos">
                        <button className="px-8 py-3 bg-aldurr-accent text-aldurr-canvas text-[10px] font-bold tracking-[0.2em] rounded-full hover:bg-white transition-colors duration-500 uppercase shadow-lg shadow-aldurr-accent/20">
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
                className={`fixed inset-0 bg-aldurr-canvas/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 
                ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className="flex flex-col items-center gap-10 text-2xl font-bold tracking-widest uppercase">
                    <Link href="/modelos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-aldurr-accent transition-colors scale-110 active:scale-95 duration-200">{t.nav.models}</Link>
                    <Link href="/galeria" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-aldurr-accent transition-colors scale-110 active:scale-95 duration-200">{t.nav.gallery}</Link>
                    <Link href="/processo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-aldurr-accent transition-colors scale-110 active:scale-95 duration-200">{t.nav.process}</Link>
                    <Link href="/contactos" onClick={() => setIsMobileMenuOpen(false)} className="text-aldurr-accent hover:text-white transition-colors scale-110 active:scale-95 duration-200">Contactos</Link>
                </div>


                {/* Mobile Language & CTA */}
                <div className="mt-12 flex flex-col items-center gap-8">
                    <div className="flex items-center gap-6">
                        <button onClick={() => switchLanguage("pt")} className={`${locale === "pt" ? "text-aldurr-accent" : "text-white/50"}`}>PT</button>
                        <button onClick={() => switchLanguage("en")} className={`${locale === "en" ? "text-aldurr-accent" : "text-white/50"}`}>EN</button>
                    </div>
                    <Link href="/contactos" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-full uppercase text-xs tracking-widest">
                            {t.nav.cta}
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
