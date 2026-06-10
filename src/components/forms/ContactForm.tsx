"use client";
import React, { useState } from "react";
import * as fp from "@/lib/fpixel";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    const [consent, setConsent] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return;
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

            // Trigger Facebook Pixel Lead event
            fp.event("Lead", {
                content_name: "Contact Form",
                content_category: "Leads",
                value: 0,
                currency: "EUR"
            });

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", landStatus: "tenho_terreno", location: "", model: "t1", message: "" });
            setConsent(false);
            
            // Redirect to Thank You page
            router.push("/obrigado");
        } catch {
            setStatus("error");
        }
    };

    // Success state is now handled by redirect

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

            <label className="flex items-start gap-3 cursor-pointer text-white/60 text-[13px] leading-relaxed">
                <input
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 shrink-0 accent-aldurr-honey"
                />
                <span>
                    Li e aceito a{" "}
                    <Link href="/privacidade" className="text-aldurr-honey underline underline-offset-2 hover:brightness-125">
                        Política de Privacidade
                    </Link>{" "}
                    e consinto o tratamento dos meus dados para resposta ao meu pedido.
                </span>
            </label>

            <button
                type="submit"
                disabled={status === "loading" || !consent}
                className="w-full py-4 bg-aldurr-accent text-aldurr-canvas font-bold text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" ? "A enviar..." : "Enviar Pedido"}
            </button>
        </form>
    );
}
