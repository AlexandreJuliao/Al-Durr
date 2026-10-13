"use client";
import React, { useRef, useState } from "react";
import * as fp from "@/lib/fpixel";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormStatus = "idle" | "loading" | "success" | "error";
type ValidatedField = "phone" | "model" | "landStatus";
type FieldErrors = Partial<Record<ValidatedField, string>>;

// Sem valores pré-escolhidos: o modelo e a situação do terreno têm de ser escolhidos pela lead.
const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    landStatus: "",
    location: "",
    model: "",
    message: ""
};

// Validação leve: só dígitos, espaços, +, (, ) e -, com pelo menos 9 dígitos.
// O valor segue tal como foi escrito; o n8n normaliza o número.
const isValidPhone = (value: string) =>
    /^[\d\s()+-]+$/.test(value.trim()) && (value.match(/\d/g)?.length ?? 0) >= 9;

const ERROR_MESSAGES: Record<ValidatedField, string> = {
    phone: "Indique um telefone válido, com pelo menos 9 dígitos.",
    model: "Escolha um modelo.",
    landStatus: "Escolha uma das opções."
};

const validate = (data: typeof EMPTY_FORM): FieldErrors => {
    const errors: FieldErrors = {};
    if (!isValidPhone(data.phone)) errors.phone = ERROR_MESSAGES.phone;
    if (!data.model) errors.model = ERROR_MESSAGES.model;
    if (!data.landStatus) errors.landStatus = ERROR_MESSAGES.landStatus;
    return errors;
};

export default function ContactForm() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState<FormStatus>("idle");
    const [consent, setConsent] = useState(false);
    const phoneRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name as ValidatedField]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Mostra a mensagem por baixo do campo (também quando é o browser a bloquear o envio).
    const showError = (field: ValidatedField) => () =>
        setErrors((prev) => ({ ...prev, [field]: ERROR_MESSAGES[field] }));

    const handlePhoneBlur = () => {
        if (formData.phone.trim() && !isValidPhone(formData.phone)) showError("phone")();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return;

        const fieldErrors = validate(formData);
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            if (fieldErrors.phone) phoneRef.current?.focus();
            return;
        }

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
            setFormData(EMPTY_FORM);
            setErrors({});
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
                        placeholder="O seu nome"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Telefone</label>
                    <input
                        ref={phoneRef}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handlePhoneBlur}
                        onInvalid={showError("phone")}
                        required
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors rounded-sm"
                        placeholder="+351 9xx xxx xxx"
                    />
                    {errors.phone && (
                        <p id="phone-error" className="text-red-400/80 text-xs">{errors.phone}</p>
                    )}
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
                    placeholder="nome@exemplo.pt"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">Modelo de Interesse</label>
                    <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        onInvalid={showError("model")}
                        required
                        aria-invalid={errors.model ? true : undefined}
                        aria-describedby={errors.model ? "model-error" : undefined}
                        className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:border-aldurr-honey outline-none transition-colors appearance-none rounded-sm"
                    >
                        <option value="" disabled>Escolha um modelo</option>
                        <option value="t1">T1 Studio</option>
                        <option value="t2">T2 Family</option>
                        <option value="custom">T-Multi (Personalizado)</option>
                    </select>
                    {errors.model && (
                        <p id="model-error" className="text-red-400/80 text-xs">{errors.model}</p>
                    )}
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
                    <label className={`relative cursor-pointer border p-4 transition-all duration-300 rounded-sm ${formData.landStatus === "tenho_terreno" ? "border-aldurr-honey bg-aldurr-honey/5" : "border-white/10 hover:border-white/30 focus-within:border-white/30 bg-white/[0.02]"}`}>
                        <input
                            type="radio"
                            name="landStatus"
                            value="tenho_terreno"
                            className="sr-only"
                            onChange={handleChange}
                            onInvalid={showError("landStatus")}
                            required
                            checked={formData.landStatus === "tenho_terreno"}
                        />
                        <div className="font-bold text-white mb-1">Já tenho Terreno</div>
                        <div className="text-[10px] text-white/50">Procuro apenas a casa</div>
                    </label>

                    <label className={`relative cursor-pointer border p-4 transition-all duration-300 rounded-sm ${formData.landStatus === "ajuda_procurar" ? "border-aldurr-honey bg-aldurr-honey/5" : "border-white/10 hover:border-white/30 focus-within:border-white/30 bg-white/[0.02]"}`}>
                        <input
                            type="radio"
                            name="landStatus"
                            value="ajuda_procurar"
                            className="sr-only"
                            onChange={handleChange}
                            onInvalid={showError("landStatus")}
                            required
                            checked={formData.landStatus === "ajuda_procurar"}
                        />
                        <div className="font-bold text-white mb-1">Procuro Terreno</div>
                        <div className="text-[10px] text-white/50">Quero ajuda a encontrar</div>
                    </label>
                </div>
                {errors.landStatus && (
                    <p className="text-red-400/80 text-xs">{errors.landStatus}</p>
                )}
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
