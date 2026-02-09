"use client";
import React, { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        landStatus: "tenho_terreno", // "tenho_terreno", "ajuda_procurar"
        location: "",
        model: "t1" // "t1", "t2", "custom"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-aldurr-canvas border border-white/10 p-4 text-white focus:border-aldurr-accent outline-none transition-colors"
                        placeholder="Seu nome completo"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Telefone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-aldurr-canvas border border-white/10 p-4 text-white focus:border-aldurr-accent outline-none transition-colors"
                        placeholder="+351 ..."
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-aldurr-canvas border border-white/10 p-4 text-white focus:border-aldurr-accent outline-none transition-colors"
                    placeholder="seu.email@exemplo.com"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Modelo de Interesse</label>
                    <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full bg-aldurr-canvas border border-white/10 p-4 text-white focus:border-aldurr-accent outline-none transition-colors appearance-none"
                    >
                        <option value="t1">T1 Studio</option>
                        <option value="t2">T2 Family</option>
                        <option value="custom">T-Multi (Personalizado)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Local do Projeto</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-aldurr-canvas border border-white/10 p-4 text-white focus:border-aldurr-accent outline-none transition-colors"
                        placeholder="Ex: Comporta, Gerês..."
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-xs uppercase tracking-widest text-aldurr-accent font-bold">Situação do Terreno</label>
                <div className="grid md:grid-cols-2 gap-4">
                    <label className={`cursor-pointer border p-4 transition-all duration-300 ${formData.landStatus === 'tenho_terreno' ? 'border-aldurr-accent bg-aldurr-accent/10' : 'border-white/10 hover:border-white/30'}`}>
                        <input
                            type="radio"
                            name="landStatus"
                            value="tenho_terreno"
                            className="hidden"
                            onChange={handleChange}
                            checked={formData.landStatus === 'tenho_terreno'}
                        />
                        <div className="font-bold text-white mb-1">Já tenho Terreno</div>
                        <div className="text-[10px] text-white/50">Procuro apenas a casa</div>
                    </label>

                    <label className={`cursor-pointer border p-4 transition-all duration-300 ${formData.landStatus === 'ajuda_procurar' ? 'border-aldurr-accent bg-aldurr-accent/10' : 'border-white/10 hover:border-white/30'}`}>
                        <input
                            type="radio"
                            name="landStatus"
                            value="ajuda_procurar"
                            className="hidden"
                            onChange={handleChange}
                            checked={formData.landStatus === 'ajuda_procurar'}
                        />
                        <div className="font-bold text-white mb-1">Procuro Terreno</div>
                        <div className="text-[10px] text-white/50">Quero ajuda a encontrar</div>
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Mensagem (Opcional)</label>
                <textarea
                    className="w-full bg-aldurr-canvas border border-white/10 p-4 text-white focus:border-aldurr-accent outline-none transition-colors h-32"
                    placeholder="Diga-nos mais sobre o seu projeto..."
                />
            </div>

            <button className="w-full py-4 bg-aldurr-accent text-aldurr-canvas font-bold text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500">
                Enviar Pedido
            </button>
        </form>
    );
}
