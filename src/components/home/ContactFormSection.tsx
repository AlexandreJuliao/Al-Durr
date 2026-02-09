"use client";
import React, { useState } from "react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactFormSection({
    title = "Inicie o seu Legado.",
    description = "A sua casa Al Durr começa aqui. Preencha o formulário para agendar uma reunião com a nossa equipa de arquitetura.",
    hideInfo = false
}) {


    return (
        <section className="py-24 bg-aldurr-canvas text-white relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Visual / Info Side */}
                    <div className="space-y-12">
                        <div>
                            <span className="text-aldurr-accent text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                                Contacto
                            </span>
                            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-none">
                                {title}
                            </h2>
                            <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                                {description}
                            </p>
                        </div>

                        {!hideInfo && (
                            <div className="space-y-8 border-t border-white/5 pt-8">
                                <div>
                                    <h4 className="text-sm text-aldurr-accent uppercase tracking-widest mb-2">Showroom</h4>
                                    <p className="text-xl font-light">Lisboa, Portugal</p>
                                    <p className="text-white/40 font-light text-sm mt-1">Av. da Liberdade (Por marcação)</p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-aldurr-accent uppercase tracking-widest mb-2">Contacto Direto</h4>
                                    <p className="text-xl font-light">+351 912 345 678</p>
                                    <p className="text-white/40 font-light text-sm mt-1">geral@aldurr.pt</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Side */}
                    <div className="bg-aldurr-surface/30 p-8 md:p-12 border border-white/10 rounded-sm backdrop-blur-sm">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
