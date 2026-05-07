"use client";
import React from "react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactFormSection({
    title = "Inicie o seu Legado.",
    description = "A sua casa Al Durr começa aqui. Preencha o formulário para agendar uma reunião com a nossa equipa de arquitetura.",
    hideInfo = false
}) {


    return (
        <section className="py-24 text-aldurr-text-body relative bg-aldurr-void overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Visual / Info Side */}
                    <div className="space-y-12">
                        <div>
                            <span className="text-aldurr-honey text-[10px] font-bold tracking-[0.4em] uppercase block mb-6 drop-shadow-[0_0_8px_rgba(235,185,105,0.4)]">
                                Contacto
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9] tracking-tight font-display">
                                {title}
                            </h2>
                            <p className="text-aldurr-text-muted text-lg md:text-xl font-light leading-relaxed max-w-md">
                                {description}
                            </p>
                        </div>

                        {!hideInfo && (
                            <div className="space-y-10 border-t border-white/10 pt-10">
                                <div className="group">
                                    <h4 className="text-[10px] text-aldurr-honey uppercase tracking-[0.2em] font-bold mb-3">Escritório</h4>
                                    <p className="text-2xl font-light text-aldurr-text-body group-hover:text-aldurr-honey transition-colors">Torres Vedras, Portugal</p>
                                    <p className="text-aldurr-text-muted font-light text-sm mt-2">R. Nossa Sra. da Graça Póvoa de Penafirme 119</p>
                                </div>
                                <div className="group">
                                    <h4 className="text-[10px] text-aldurr-honey uppercase tracking-[0.2em] font-bold mb-3">Contacto Direto</h4>
                                    <a href="tel:+351935994555" className="text-2xl font-light text-aldurr-text-body group-hover:text-aldurr-honey transition-colors block">+351 935 994 555</a>
                                    <a href="mailto:grupo@tatierica.pt" className="text-aldurr-text-muted font-light text-sm mt-2 block hover:text-aldurr-honey transition-colors">grupo@tatierica.pt</a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Side */}
                    <div className="bg-white/5 p-8 md:p-14 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
