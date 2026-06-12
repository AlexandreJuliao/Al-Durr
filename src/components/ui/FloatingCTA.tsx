"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as fp from "@/lib/fpixel";

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const isBackoffice = pathname?.startsWith("/backoffice");

    useEffect(() => {
        if (isBackoffice) return;

        const handleScroll = () => {
            // Show after scrolling 500px
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isBackoffice) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-8 right-8 z-[100]"
                >
                    <Link href="/contactos#contact-form">
                        <button 
                            onClick={() => fp.event("Contact", { content_name: "Floating CTA Pedir Orçamento" })}
                            className="group relative flex items-center gap-3 px-6 py-4 bg-gold-metallic text-aldurr-canvas rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(198,156,109,0.4)] transition-all duration-500 overflow-hidden"
                        >
                            {/* Inner Shine */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            <MessageSquare className="w-5 h-5 fill-current" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                                Pedir Orçamento
                            </span>
                        </button>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
