"use client";

import React, { useState } from "react";
import { 
    Settings, 
    Bot, 
    Link2, 
    Sliders, 
    Users, 
    CheckCircle, 
    Save, 
    RefreshCw, 
    Webhook, 
    Shield, 
    Database, 
    Eye, 
    EyeOff
} from "lucide-react";

export default function DefinicoesPage() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [webhookUrl, setWebhookUrl] = useState("https://n8n.aldurr.pt/webhook/v1/whatsapp-gateway");
    const [botDelay, setBotDelay] = useState(30); // seconds
    const [showApiKey, setShowApiKey] = useState(false);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        triggerToast("Configurações gravadas com sucesso no Cockpit!");
    };

    const activeUsers = [
        { name: "Pedro Albuquerque", role: "Diretor Comercial", avatar: "PA", status: "Ativo" },
        { name: "Alexandre Julião", role: "Administrador / Proprietário", avatar: "AJ", status: "Proprietário" },
        { name: "Sara Martins", role: "Arquiteta Técnica / Apoio", avatar: "SM", status: "Ativo" }
    ];

    const connectedChannels = [
        { name: "WhatsApp Business API", provider: "Twilio / Meta", status: "Connected", date: "Ativo desde Jan 2026" },
        { name: "Instagram Direct Business", provider: "Meta Cloud", status: "Connected", date: "Ativo desde Fev 2026" },
        { name: "Facebook Messenger API", provider: "Meta Cloud", status: "Connected", date: "Ativo desde Fev 2026" },
        { name: "E-mail Profissional IMAP/SMTP", provider: "aldurr.pt Cloud", status: "Connected", date: "Ativo desde Out 2025" }
    ];

    return (
        <div className="p-6 md:p-12 space-y-12 text-left relative max-w-6xl">
            {/* Elegant Feedback Toast */}
            {toastMessage && (
                <div className="absolute top-4 right-4 z-[999] px-6 py-4 bg-[#0A0A0A] border border-[#B8956A] text-[#B8956A] font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 rounded-none">
                    <CheckCircle className="w-4 h-4 text-[#B8956A]" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#B8956A]/10 pb-8">
                <div>
                    <h2 className="text-3xl font-bold font-display tracking-tight text-[#0A0A0A]">
                        Configurações do Cockpit
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1 font-light">
                        Faça a gestão dos webhooks do bot n8n, canais omnicanal ativos e permissões internas da equipa Al Durr.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Settings Form (Left) */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSave} className="bg-white border border-[#B8956A]/10 p-8 shadow-sm rounded-none space-y-6">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-4">
                            <Bot className="w-4 h-4 text-[#B8956A]" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A0A0A]">
                                Central de Automação & Bot Inteligente
                            </h3>
                        </div>

                        {/* Webhook n8n */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                                Webhook Principal do n8n (WhatsApp / Meta Gateway)
                            </label>
                            <div className="relative">
                                <input 
                                    type="url"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-800 font-mono"
                                />
                                <Webhook className="w-3.5 h-3.5 absolute left-3 top-3.5 text-[#B8956A]" />
                            </div>
                            <span className="text-[9px] text-neutral-400 font-light">
                                URL de destino configurado no workflow do n8n para tratar mensagens recebidas e fazer o dispatch de triggers.
                            </span>
                        </div>

                        {/* Bot API Key */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                                Al Durr API Key (Backoffice Authorization Token)
                            </label>
                            <div className="relative flex">
                                <input 
                                    type={showApiKey ? "text" : "password"}
                                    value="aldurr_live_7fac48c89bdf20a1122a849d"
                                    readOnly
                                    className="w-full pl-9 pr-12 py-2.5 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-800 font-mono"
                                />
                                <Shield className="w-3.5 h-3.5 absolute left-3 top-3.5 text-[#B8956A]" />
                                <button 
                                    type="button"
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="absolute right-3 top-2.5 p-1 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Configurações de Qualificação */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                            {/* Bot delay */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                                    Atraso do Bot (Segundos)
                                </label>
                                <input 
                                    type="number"
                                    value={botDelay}
                                    onChange={(e) => setBotDelay(Number(e.target.value))}
                                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A]"
                                />
                                <span className="text-[9px] text-neutral-400 font-light">
                                    Simula tempo de digitação natural antes de enviar resposta.
                                </span>
                            </div>

                            {/* Base Price */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                                    Preço de Construção Padrão (€/m²)
                                </label>
                                <input 
                                    type="text"
                                    value="1.200 €/m²"
                                    readOnly
                                    className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 text-xs rounded-none text-neutral-500 font-mono cursor-not-allowed"
                                />
                                <span className="text-[9px] text-neutral-400 font-light">
                                    Valor indicativo de fabrico e entrega Al Durr chave-na-mão.
                                </span>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-6 border-t border-neutral-100">
                            <button 
                                type="submit"
                                className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] hover:bg-neutral-900 border border-[#B8956A]/20 text-[#B8956A] text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-none shadow-md"
                            >
                                <Save className="w-3.5 h-3.5" />
                                Gravar Parâmetros
                            </button>
                        </div>
                    </form>

                    {/* Omni-Channel Connected Section */}
                    <div className="bg-white border border-[#B8956A]/10 p-8 shadow-sm rounded-none space-y-6">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-4">
                            <Link2 className="w-4 h-4 text-[#B8956A]" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A0A0A]">
                                Canais de Comunicação Conetados
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {connectedChannels.map((c, idx) => (
                                <div key={idx} className="flex justify-between items-center p-4 bg-neutral-50 border border-neutral-200/50 rounded-none hover:border-[#B8956A]/20 transition-all duration-300">
                                    <div className="text-left space-y-1">
                                        <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                                            {c.name}
                                        </h4>
                                        <p className="text-[10px] text-neutral-400 font-mono">
                                            {c.provider} • {c.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                                        </span>
                                        <span className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase font-bold">
                                            {c.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team / Users Dashboard Split (Right) */}
                <div className="space-y-8">
                    {/* Active Cockpit Users */}
                    <div className="bg-[#0A0A0A] border border-[#B8956A]/20 p-8 shadow-md rounded-none text-white space-y-6">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                            <Users className="w-4 h-4 text-[#B8956A]" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em]">
                                Operadores com Acesso
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {activeUsers.map((u, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 border border-[#B8956A]/30 flex items-center justify-center bg-white/[0.02] text-[#B8956A] font-bold text-xs rounded-none">
                                            {u.avatar}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-xs font-semibold text-white/90 truncate max-w-[130px]">
                                                {u.name}
                                            </h4>
                                            <span className="text-[8px] font-mono tracking-widest text-[#B8956A] uppercase">
                                                {u.role}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 border text-[7px] font-bold tracking-widest uppercase rounded-none ${
                                        u.status === "Proprietário" 
                                            ? "bg-[#B8956A]/10 border-[#B8956A]/30 text-[#B8956A]" 
                                            : "bg-white/5 border-white/10 text-white/60"
                                    }`}>
                                        {u.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <button className="w-full py-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#B8956A]/30 text-white text-[9px] font-bold tracking-widest uppercase transition-all duration-300 rounded-none">
                                Convidar Novo Membro
                            </button>
                        </div>
                    </div>

                    {/* Quick System Info */}
                    <div className="bg-white border border-[#B8956A]/10 p-8 shadow-sm rounded-none text-neutral-800 space-y-4">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-4">
                            <Database className="w-4 h-4 text-[#B8956A]" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0A0A0A]">
                                Informação do Sistema
                            </h3>
                        </div>

                        <div className="space-y-3 text-[10px] text-neutral-500">
                            <div className="flex justify-between font-light">
                                <span>Ambiente:</span>
                                <span className="font-mono font-bold uppercase text-neutral-800">Front-End Mock (Top UI)</span>
                            </div>
                            <div className="flex justify-between font-light">
                                <span>Database:</span>
                                <span className="font-mono text-amber-600 font-bold uppercase">Pending Supabase Setup</span>
                            </div>
                            <div className="flex justify-between font-light">
                                <span>Subdomínio:</span>
                                <span className="font-mono text-neutral-800">backoffice.aldurr.pt</span>
                            </div>
                            <div className="flex justify-between font-light">
                                <span>Licença Cockpit:</span>
                                <span className="font-mono text-[#B8956A] font-bold">AL_DURR_PRO_MAX</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                            <span>Versão: v1.4.0-premium</span>
                            <button 
                                onClick={() => triggerToast("Verificação de atualizações concluída: Sistema já se encontra na última versão!")}
                                className="flex items-center gap-1 hover:text-neutral-700 active:rotate-18"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Verificar Updates
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
