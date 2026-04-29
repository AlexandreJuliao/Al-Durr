"use client";
import React, { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        landStatus: "tenho_terreno",
        location: "",
        model: "t1",
        message: ""
    });
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
            if (!webhookUrl || webhookUrl.includes("SEU-N8N-URL")) {
                throw new Error("Webhook URL não configurada");
            }

            const res = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Erro ao enviar");

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", landStatus: "tenho_terreno", location: "", model: "t1", message: "" });
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full border-2 border-aldurr-honey flex items-center justify-center">
                    <svg className="w-8 h-8 text-aldurr-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pedido Recebido</h3>
                    <p className="text-white/50 font-light max-w-xs">
                        A nossa equipa irá entrar em contacto em breve.
                    </p>
                </div>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-xs text-aldurr-honey/60 uppercase tracking-widest hover:text-aldurr-honey transition-colors"
                >
                    Enviar outro pedido
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors rounded-sm"
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
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors rounded-sm"
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
                    required
                    className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors rounded-sm"
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
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors appearance-none rounded-sm"
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
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors rounded-sm"
                        placeholder="Ex: Comporta, Gerês..."
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-xs uppercase tracking-widest text-aldurr-honey font-bold">Situação do Terreno</label>
                <div className="grid md:grid-cols-2 gap-4">
                    <label className={`cursor-pointer border p-4 transition-all duration-300 rounded-sm ${formData.landStatus === "tenho_terreno" ? "border-aldurr-honey bg-aldurr-honey/5" : "border-white/10 hover:border-white/30 bg-white/[0.02]"}`}>
                        <input
                            type="radio"
                            name="landStatus"
                            value="tenho_terreno"
                            className="hidden"
                            onChange={handleChange}
                            checked={formData.landStatus === "tenho_terreno"}
                        />
                        <div className="font-bold text-white mb-1">Já tenho Terreno</div>
                        <div className="text-[10px] text-white/50">Procuro apenas a casa</div>
                    </label>

                    <label className={`cursor-pointer border p-4 transition-all duration-300 rounded-sm ${formData.landStatus === "ajuda_procurar" ? "border-aldurr-honey bg-aldurr-honey/5" : "border-white/10 hover:border-white/30 bg-white/[0.02]"}`}>
                        <input
                            type="radio"
                            name="landStatus"
                            value="ajuda_procurar"
                            className="hidden"
                            onChange={handleChange}
                            checked={formData.landStatus === "ajuda_procurar"}
                        />
                        <div className="font-bold text-white mb-1">Procuro Terreno</div>
                        <div className="text-[10px] text-white/50">Quero ajuda a encontrar</div>
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Mensagem (Opcional)</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors h-32 rounded-sm"
                    placeholder="Diga-nos mais sobre o seu projeto..."
                />
            </div>

            {status === "error" && (
                <p className="text-red-400/80 text-sm text-center">
                    Ocorreu um erro. Tente novamente ou contacte-nos diretamente.
                </p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-aldurr-accent text-aldurr-canvas font-bold text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" ? "A enviar..." : "Enviar Pedido"}
            </button>
        </form>
    );
}
