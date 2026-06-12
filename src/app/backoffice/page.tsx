"use client";

import React from "react";
import Link from "next/link";
import { 
    MOCK_LEADS, 
    MOCK_CONVERSATIONS, 
    PIPELINE_STAGES 
} from "./mockData";
import { 
    Users, 
    MessageSquare, 
    Activity, 
    TrendingUp,
    ChevronRight,
    ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
    // Dynamic KPI Calculations
    const totalLeadsActive = MOCK_LEADS.filter(l => l.stageId !== "perdida" && l.stageId !== "contrato_fechado").length;
    const messagesWaitingHuman = MOCK_CONVERSATIONS.filter(c => c.status === "waiting").length;
    const activeConversations = MOCK_CONVERSATIONS.filter(c => c.status === "active").length;
    
    // Custom calculation for total potential revenue in pipeline (active leads)
    const pipelineValue = MOCK_LEADS
        .filter(l => l.stageId !== "perdida" && l.stageId !== "contrato_fechado")
        .reduce((sum, l) => sum + l.potentialValue, 0);

    // Group leads by stage for pipeline overview
    const stageCounts = PIPELINE_STAGES.map(stage => {
        const leadsInStage = MOCK_LEADS.filter(l => l.stageId === stage.id);
        const count = leadsInStage.length;
        const totalValue = leadsInStage.reduce((sum, l) => sum + l.potentialValue, 0);
        return {
            ...stage,
            count,
            totalValue
        };
    });

    const kpis = [
        {
            title: "Leads Ativas no Pipeline",
            value: totalLeadsActive,
            subtitle: "Em negociação comercial",
            icon: Users,
            color: "text-[#B8956A]",
            link: "/backoffice/crm"
        },
        {
            title: "Aguardar Resposta Humana",
            value: messagesWaitingHuman,
            subtitle: "Bot requer intervenção",
            icon: MessageSquare,
            color: "text-red-500",
            badge: "Prioridade",
            link: "/backoffice/mensagens"
        },
        {
            title: "Conversas Ativas Hoje",
            value: activeConversations,
            subtitle: "Operador humano a responder",
            icon: Activity,
            color: "text-emerald-500",
            link: "/backoffice/mensagens"
        },
        {
            title: "Valor Total do Pipeline",
            value: `€${(pipelineValue / 1000).toFixed(0)}k`,
            subtitle: "Excluindo ganhas/perdidas",
            icon: TrendingUp,
            color: "text-[#B8956A]",
            link: "/backoffice/crm"
        }
    ];

    return (
        <div className="p-6 md:p-12 space-y-12">
            {/* Greeting Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#B8956A]/10 pb-8">
                <div>
                    <h2 className="text-3xl font-bold font-display tracking-tight text-[#0A0A0A]">
                        Bem-vindo ao Cockpit, Pedro
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1 font-light">
                        Aqui está o estado geral da qualificação e vendas das moradias Al Durr.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/backoffice/mensagens">
                        <button className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-neutral-900 border border-[#B8956A]/20 text-[#B8956A] text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-none shadow-md">
                            Central Inbox
                        </button>
                    </Link>
                    <Link href="/backoffice/crm">
                        <button className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-none shadow-sm">
                            Abrir Kanban
                        </button>
                    </Link>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <Link 
                            key={idx} 
                            href={kpi.link}
                            className="bg-white border border-[#B8956A]/10 p-8 shadow-sm flex flex-col justify-between h-48 rounded-none transition-all duration-300 hover:border-[#B8956A]/40 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                                    {kpi.title}
                                </span>
                                <div className="flex items-center gap-2">
                                    {kpi.badge && (
                                        <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[8px] font-bold tracking-widest uppercase rounded-none border border-red-500/20 animate-pulse">
                                            {kpi.badge}
                                        </span>
                                    )}
                                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                                </div>
                            </div>

                            <div className="my-2">
                                <h3 className="text-4xl font-bold tracking-tight text-[#0A0A0A] font-sans">
                                    {kpi.value}
                                </h3>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                                <span className="text-[10px] text-neutral-500 font-light">
                                    {kpi.subtitle}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#B8956A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Main Dashboard Layout Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pipeline Overview Stage Bars */}
                <div className="bg-white border border-[#B8956A]/10 p-8 shadow-sm rounded-none lg:col-span-2 space-y-8 text-left">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                        <div>
                            <h3 className="text-sm font-bold tracking-[0.2em] text-[#0A0A0A] uppercase">
                                Sumário do Pipeline Comercial
                            </h3>
                            <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                                Distribuição de leads e volume potencial pelas fases de venda.
                            </p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#B8956A] bg-[#B8956A]/10 px-2 py-1">
                            {MOCK_LEADS.length} Leads Registadas
                        </span>
                    </div>

                    <div className="space-y-4">
                        {stageCounts.map((stage) => {
                            // Find percentage based on max count
                            const maxCount = Math.max(...stageCounts.map(s => s.count)) || 1;
                            const percentage = (stage.count / maxCount) * 100;
                            
                            // Define visual styling based on stage type
                            let barColor = "bg-[#B8956A]";
                            if (stage.id === "contrato_fechado") barColor = "bg-emerald-600";
                            if (stage.id === "perdida") barColor = "bg-neutral-300";

                            return (
                                <div key={stage.id} className="space-y-2 group">
                                    <div className="flex justify-between items-end text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-neutral-700 tracking-wide">
                                                {stage.title}
                                            </span>
                                            {stage.count > 0 && (
                                                <span className="text-[9px] font-mono text-neutral-400">
                                                    ({stage.count} {stage.count === 1 ? "lead" : "leads"})
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-mono text-neutral-500 font-semibold text-[11px]">
                                            {stage.totalValue > 0 ? `€${stage.totalValue.toLocaleString("pt-PT")}` : "—"}
                                        </span>
                                    </div>
                                    <div className="h-3 w-full bg-neutral-50 border border-neutral-200/50 relative overflow-hidden">
                                        <div 
                                            className={`h-full ${barColor} transition-all duration-1000 ease-out`}
                                            style={{ width: `${stage.count > 0 ? Math.max(percentage, 3) : 0}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Direct Action Hub */}
                <div className="bg-[#0A0A0A] border border-[#B8956A]/20 p-8 shadow-md rounded-none text-white flex flex-col justify-between text-left relative overflow-hidden">
                    {/* Elegant outline drawing background */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="#B8956A" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="text-[#B8956A] text-[9px] font-bold tracking-[0.4em] uppercase block mb-2 italic">
                                Al Durr Cockpit
                            </span>
                            <h3 className="text-xl font-bold font-display tracking-tight text-white leading-snug">
                                Central de Ações Rápidas
                            </h3>
                            <p className="text-white/40 text-xs mt-2 font-light leading-relaxed">
                                Responda a pedidos de clientes pendentes ou analise propostas e lotes de terreno em carteira.
                            </p>
                        </div>

                        <div className="h-[1px] bg-white/10" />

                        <div className="space-y-3">
                            <Link href="/backoffice/mensagens" className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#B8956A]/30 transition-all duration-300 group">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">
                                    Inbox do Bot ({messagesWaitingHuman})
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#B8956A] group-hover:translate-x-0.5 transition-all duration-300" />
                            </Link>

                            <Link href="/backoffice/crm" className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#B8956A]/30 transition-all duration-300 group">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">
                                    Adicionar Nova Lead
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#B8956A] group-hover:translate-x-0.5 transition-all duration-300" />
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8 text-left">
                        <span className="text-[8px] font-mono tracking-widest text-[#B8956A]/50 uppercase">
                            Last Backup: Today 04:00 • OK
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
