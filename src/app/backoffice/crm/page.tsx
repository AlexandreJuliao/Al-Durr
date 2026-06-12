"use client";

import React, { useState } from "react";
import { PIPELINE_STAGES, MOCK_LEADS } from "../mockData";
import { Lead, PipelineStage } from "../types";
import { 
    Plus, 
    Search, 
    Filter, 
    X, 
    User, 
    MapPin, 
    Home, 
    DollarSign, 
    Calendar, 
    FileText, 
    TrendingUp, 
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    ExternalLink,
    Mail,
    Phone,
    Instagram,
    Facebook,
    Sparkles,
    Trash2
} from "lucide-react";

export default function CRMPage() {
    // Lead states
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    
    // Modals & Panels State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [activeDragOverColumn, setActiveDragOverColumn] = useState<string | null>(null);

    // Filters State
    const [searchTerm, setSearchTerm] = useState("");
    const [tempFilter, setTempFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
    const [channelFilter, setChannelFilter] = useState<string>('all');
    const [modelFilter, setModelFilter] = useState<string>('all');

    // New Lead Form State
    const [newLead, setNewLead] = useState({
        contactName: "",
        channel: "website" as Lead['channel'],
        modelInterest: "T1" as Lead['modelInterest'],
        location: "",
        potentialValue: 149900,
        temperature: "warm" as Lead['temperature'],
        notes: ""
    });

    // Active Selected Lead
    const selectedLead = leads.find(l => l.id === selectedLeadId);

    // Trigger Toast
    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 4000);
    };

    // --- DRAG AND DROP HANDLERS (Native HTML5) ---
    const handleDragStart = (e: React.DragEvent, leadId: string) => {
        e.dataTransfer.setData("text/plain", leadId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent, stageId: string) => {
        e.preventDefault();
        if (activeDragOverColumn !== stageId) {
            setActiveDragOverColumn(stageId);
        }
    };

    const handleDragLeave = () => {
        setActiveDragOverColumn(null);
    };

    const handleDrop = (e: React.DragEvent, targetStageId: string) => {
        e.preventDefault();
        setActiveDragOverColumn(null);
        const leadId = e.dataTransfer.getData("text/plain");
        
        if (leadId) {
            const leadToMove = leads.find(l => l.id === leadId);
            if (leadToMove) {
                if (leadToMove.stageId === targetStageId) return;

                setLeads(prev => prev.map(l => {
                    if (l.id === leadId) {
                        return { 
                            ...l, 
                            stageId: targetStageId,
                            lastUpdated: new Date().toLocaleDateString("pt-PT", { day: 'numeric', month: 'short', year: 'numeric' })
                        };
                    }
                    return l;
                }));

                const targetStage = PIPELINE_STAGES.find(s => s.id === targetStageId);
                triggerToast(`Lead "${leadToMove.contactName}" movida para "${targetStage?.title}"`);
            }
        }
    };

    // --- FORM ACTIONS ---
    const handleCreateLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLead.contactName.trim()) return;

        const dateStr = new Date().toLocaleDateString("pt-PT", { day: 'numeric', month: 'short', year: 'numeric' });
        const created: Lead = {
            id: `lead-${Date.now()}`,
            contactName: newLead.contactName,
            channel: newLead.channel,
            modelInterest: newLead.modelInterest,
            location: newLead.location || "Não especificado",
            potentialValue: Number(newLead.potentialValue) || 0,
            temperature: newLead.temperature,
            dateAdded: dateStr,
            lastUpdated: dateStr,
            stageId: "nova",
            notes: newLead.notes
        };

        setLeads(prev => [created, ...prev]);
        setIsAddModalOpen(false);
        setNewLead({
            contactName: "",
            channel: "website",
            modelInterest: "T1",
            location: "",
            potentialValue: 149900,
            temperature: "warm",
            notes: ""
        });
        triggerToast(`Sucesso! Lead "${created.contactName}" adicionada ao pipeline.`);
    };

    const handleUpdateLeadField = (leadId: string, field: keyof Lead, value: any) => {
        setLeads(prev => prev.map(l => {
            if (l.id === leadId) {
                return {
                    ...l,
                    [field]: value,
                    lastUpdated: new Date().toLocaleDateString("pt-PT", { day: 'numeric', month: 'short', year: 'numeric' })
                };
            }
            return l;
        }));
    };

    const handleRedirectToRealEstate = (lead: Lead) => {
        triggerToast(`Sucesso! Lead "${lead.contactName}" redirecionada com sucesso para a Imobiliária Parceira Al Durr.`);
        // Mark lead notes with redirection log
        handleUpdateLeadField(
            lead.id, 
            "notes", 
            `${lead.notes || ""}\n\n[SISTEMA ${new Date().toLocaleDateString("pt-PT")}] Lead redirecionada formalmente para imobiliária parceira Al Durr.`
        );
    };

    // --- FILTERS LOGIC ---
    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.contactName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (lead.location && lead.location.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesTemp = tempFilter === 'all' || lead.temperature === tempFilter;
        const matchesChannel = channelFilter === 'all' || lead.channel === channelFilter;
        const matchesModel = modelFilter === 'all' || lead.modelInterest === modelFilter;

        return matchesSearch && matchesTemp && matchesChannel && matchesModel;
    });

    // Unique Channels and Models from mock data for filters list
    const availableChannels = ["website", "meta_ads", "instagram", "facebook", "whatsapp", "email"];
    const availableModels = ["T1", "T2", "T-Multi", "Indefinido"];

    // Helper: Temperature details
    const getTempBadge = (temp: Lead['temperature']) => {
        switch (temp) {
            case "hot":
                return { label: "Muito Quente", emoji: "🔥", color: "bg-red-500/10 border-red-500/20 text-red-500" };
            case "warm":
                return { label: "Interessado", emoji: "🟡", color: "bg-amber-500/10 border-amber-500/20 text-amber-500" };
            case "cold":
                return { label: "Frio / Informativo", emoji: "🔵", color: "bg-blue-500/10 border-blue-500/20 text-blue-500" };
            default:
                return { label: "Indefinido", emoji: "⚪", color: "bg-neutral-500/10 border-neutral-500/20 text-neutral-500" };
        }
    };

    // Helper: Channel styling and labels
    const getChannelBadge = (chan: Lead['channel']) => {
        switch (chan) {
            case "whatsapp":
                return { label: "WhatsApp", color: "text-[#25d366] bg-[#25d366]/5 border-[#25d366]/20" };
            case "instagram":
                return { label: "Instagram", color: "text-[#e1306c] bg-[#e1306c]/5 border-[#e1306c]/20" };
            case "facebook":
                return { label: "Messenger", color: "text-[#1877f2] bg-[#1877f2]/5 border-[#1877f2]/20" };
            case "email":
                return { label: "Email", color: "text-neutral-400 bg-neutral-400/5 border-neutral-400/20" };
            case "website":
                return { label: "Website", color: "text-[#B8956A] bg-[#B8956A]/5 border-[#B8956A]/20" };
            case "meta_ads":
                return { label: "Meta Ads", color: "text-cyan-500 bg-cyan-500/5 border-cyan-500/20" };
            default:
                return { label: "Origem Externa", color: "text-neutral-500 bg-neutral-500/5 border-neutral-500/20" };
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden relative">
            {/* Elegant Feedback Toast */}
            {toastMessage && (
                <div className="absolute top-4 right-4 z-[999] px-6 py-4 bg-[#0A0A0A] border border-[#B8956A] text-[#B8956A] font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 rounded-none">
                    <CheckCircle className="w-4 h-4 text-[#B8956A]" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Top Toolbar / Filters Ribbon */}
            <div className="bg-white border-b border-[#B8956A]/10 px-6 py-4 md:px-12 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between flex-shrink-0">
                {/* Search & Main Filter Controls */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <input 
                            type="text" 
                            placeholder="Pesquisar cliente ou localidade..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-800 placeholder-neutral-400 font-sans"
                        />
                        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                    </div>

                    {/* Temperature Filter */}
                    <select
                        value={tempFilter}
                        onChange={(e) => setTempFilter(e.target.value as any)}
                        className="px-3 py-2 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-600 font-sans"
                    >
                        <option value="all">Todas as Temperaturas</option>
                        <option value="hot">🔥 Muito Quente</option>
                        <option value="warm">🟡 Interessado</option>
                        <option value="cold">🔵 Frio / Informativo</option>
                    </select>

                    {/* Channel Filter */}
                    <select
                        value={channelFilter}
                        onChange={(e) => setChannelFilter(e.target.value)}
                        className="px-3 py-2 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-600 font-sans uppercase"
                    >
                        <option value="all">Todos os Canais</option>
                        {availableChannels.map(c => (
                            <option key={c} value={c}>{c.replace("_", " ")}</option>
                        ))}
                    </select>

                    {/* Model Filter */}
                    <select
                        value={modelFilter}
                        onChange={(e) => setModelFilter(e.target.value)}
                        className="px-3 py-2 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-600 font-sans"
                    >
                        <option value="all">Todos os Modelos</option>
                        {availableModels.map(m => (
                            <option key={m} value={m}>Modelo {m}</option>
                        ))}
                    </select>
                </div>

                {/* Direct Action */}
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] hover:bg-neutral-900 border border-[#B8956A]/20 text-[#B8956A] text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-none shadow-md w-full sm:w-auto justify-center"
                >
                    <Plus className="w-4 h-4 text-[#B8956A]" />
                    Adicionar Lead
                </button>
            </div>

            {/* Kanban Board Container */}
            <div className="flex-1 overflow-x-auto custom-scrollbar bg-[#F5F2EC] flex flex-row p-6 md:p-12 items-start gap-5 select-none h-full">
                {PIPELINE_STAGES.map((stage) => {
                    const stageLeads = filteredLeads.filter(l => l.stageId === stage.id);
                    const totalValue = stageLeads.reduce((sum, l) => sum + l.potentialValue, 0);
                    const isDragOver = activeDragOverColumn === stage.id;
                    const isLostStage = stage.id === "perdida";
                    const isWonStage = stage.id === "contrato_fechado";

                    return (
                        <div 
                            key={stage.id} 
                            onDragOver={(e) => handleDragOver(e, stage.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, stage.id)}
                            className={`flex flex-col w-80 bg-white border h-full flex-shrink-0 rounded-none shadow-sm transition-all duration-300 relative ${
                                isDragOver 
                                    ? "border-dashed border-[#B8956A] bg-[#B8956A]/5 scale-[1.01]" 
                                    : "border-[#B8956A]/10"
                            }`}
                        >
                            {/* Column Header */}
                            <div className={`p-4 border-b flex justify-between items-center text-left ${
                                isWonStage 
                                    ? "bg-emerald-50 border-b-emerald-200/50" 
                                    : isLostStage 
                                        ? "bg-neutral-50 border-b-neutral-200/50" 
                                        : "bg-neutral-50/50 border-b-neutral-100"
                            }`}>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-800">
                                        {stage.title}
                                    </h4>
                                    <span className="text-[9px] text-[#B8956A] font-semibold font-mono block">
                                        {totalValue > 0 ? `€${totalValue.toLocaleString("pt-PT")}` : "€0"}
                                    </span>
                                </div>
                                <span className={`px-2 py-0.5 text-[9px] font-bold font-mono rounded-none border ${
                                    isWonStage 
                                        ? "bg-emerald-100 border-emerald-200 text-emerald-700" 
                                        : isLostStage 
                                            ? "bg-neutral-200 border-neutral-300 text-neutral-600" 
                                            : "bg-[#0A0A0A]/5 border-[#B8956A]/10 text-neutral-500"
                                }`}>
                                    {stageLeads.length}
                                </span>
                            </div>

                            {/* Column Cards List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-3.5 bg-neutral-50/30">
                                {stageLeads.map((lead) => {
                                    const temp = getTempBadge(lead.temperature);
                                    const channel = getChannelBadge(lead.channel);
                                    const isSelected = lead.id === selectedLeadId;

                                    return (
                                        <div 
                                            key={lead.id}
                                            draggable={true}
                                            onDragStart={(e) => handleDragStart(e, lead.id)}
                                            onClick={() => setSelectedLeadId(lead.id)}
                                            className={`p-4 bg-white border cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-300 rounded-none flex flex-col justify-between h-40 group relative ${
                                                isSelected 
                                                    ? "border-[#B8956A] ring-1 ring-[#B8956A]/20" 
                                                    : "border-[#B8956A]/10 hover:border-[#B8956A]/30"
                                            }`}
                                        >
                                            {/* Top info and temp */}
                                            <div className="flex justify-between items-start">
                                                <div className="text-left">
                                                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 pr-4">
                                                        {lead.contactName}
                                                    </h5>
                                                    <span className="text-[9px] text-neutral-400 font-mono block mt-0.5">
                                                        {lead.dateAdded}
                                                    </span>
                                                </div>
                                                <span 
                                                    title={temp.label} 
                                                    className="text-xs select-none filter drop-shadow-sm cursor-help"
                                                >
                                                    {temp.emoji}
                                                </span>
                                            </div>

                                            {/* House details and model */}
                                            <div className="flex items-center gap-3 my-2 text-left text-neutral-500">
                                                <div className="flex items-center gap-1">
                                                    <Home className="w-3 h-3 text-[#B8956A]/60" />
                                                    <span className="text-[9px] font-semibold text-neutral-600 uppercase tracking-widest">
                                                        {lead.modelInterest}
                                                    </span>
                                                </div>
                                                {lead.location && (
                                                    <div className="flex items-center gap-0.5 truncate max-w-[120px]">
                                                        <MapPin className="w-3 h-3 text-neutral-400" />
                                                        <span className="text-[9px] font-light truncate">{lead.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer with potential value & channel */}
                                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 mt-2">
                                                <span className="text-[10px] font-mono font-bold text-neutral-800">
                                                    €{lead.potentialValue.toLocaleString("pt-PT")}
                                                </span>
                                                <span className={`px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-none border ${channel.color}`}>
                                                    {channel.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                                {stageLeads.length === 0 && (
                                    <div className="h-full flex items-center justify-center p-6 border border-dashed border-neutral-200 bg-white/20 select-none">
                                        <span className="text-[10px] text-neutral-400 font-light font-sans tracking-wide">
                                            Arraste lead para aqui
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Side Drawer Panel (Gaveta Lateral de Detalhes) */}
            <div className={`fixed top-0 right-0 w-[460px] h-full bg-[#0A0A0A] border-l border-[#B8956A]/20 shadow-2xl z-[99] transform transition-transform duration-500 flex flex-col text-left ${
                selectedLeadId ? "translate-x-0" : "translate-x-full"
            }`}>
                {selectedLead && (
                    <div className="flex flex-col h-full text-white relative">
                        {/* Header of Drawer */}
                        <div className="p-6 border-b border-[#B8956A]/10 bg-black/40 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 border border-[#B8956A]/30 bg-white/[0.02] flex items-center justify-center text-[#B8956A] font-bold text-lg rounded-none">
                                    {selectedLead.contactName.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold tracking-widest uppercase text-white">
                                        {selectedLead.contactName}
                                    </h4>
                                    <span className="text-[8px] font-mono tracking-widest text-[#B8956A] uppercase mt-0.5 block">
                                        Editar Informação Comercial
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedLeadId(null)}
                                className="p-2 border border-[#B8956A]/20 hover:border-[#B8956A] text-white/50 hover:text-white rounded-none transition-all duration-300"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body of Drawer */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                            {/* Lost Stage Redirection Module */}
                            {selectedLead.stageId === "perdida" && (
                                <div className="p-5 bg-[#B8956A]/5 border border-[#B8956A]/30 rounded-none space-y-3.5">
                                    <div className="flex items-start gap-2.5">
                                        <AlertTriangle className="w-4 h-4 text-[#B8956A] flex-shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8956A] block">
                                                Oportunidade Imobiliária Parceira
                                            </span>
                                            <p className="text-[11px] text-white/50 font-light leading-relaxed">
                                                Esta lead foi marcada como perdida no pipeline Al Durr (ex: falta de viabilidade construtiva no lote). Gostaria de rentabilizar este contacto redirecionando para a nossa rede de imobiliárias parceiras para encontrar outro lote?
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleRedirectToRealEstate(selectedLead)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#B8956A] hover:bg-[#a6845a] text-[#0A0A0A] text-[9px] font-bold tracking-widest uppercase transition-all duration-300 rounded-none shadow-sm"
                                    >
                                        Redirecionar para Imobiliária
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}

                            {/* Editable Fields Section */}
                            <div className="space-y-5">
                                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#B8956A] block border-b border-[#B8956A]/10 pb-2">
                                    Detalhes Comerciais
                                </span>

                                {/* Temperature Field */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Temperatura</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['hot', 'warm', 'cold'] as const).map(t => {
                                            const details = getTempBadge(t);
                                            const isSelected = selectedLead.temperature === t;
                                            return (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => handleUpdateLeadField(selectedLead.id, "temperature", t)}
                                                    className={`py-2 text-[10px] font-bold border transition-all uppercase tracking-widest rounded-none ${
                                                        isSelected 
                                                            ? `${details.color} border-[#B8956A]` 
                                                            : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.04]"
                                                    }`}
                                                >
                                                    {details.emoji} {details.label.split(" ")[0]}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* House Model Interest */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Modelo de Interesse</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(['T1', 'T2', 'T-Multi', 'Indefinido'] as const).map(m => {
                                            const isSelected = selectedLead.modelInterest === m;
                                            return (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    onClick={() => handleUpdateLeadField(selectedLead.id, "modelInterest", m)}
                                                    className={`py-2 text-[10px] font-bold border transition-all rounded-none ${
                                                        isSelected 
                                                            ? "bg-[#B8956A]/10 border-[#B8956A] text-[#B8956A]" 
                                                            : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.04]"
                                                    }`}
                                                >
                                                    {m}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Potential Financial Value */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Valor do Contrato (€)</label>
                                    <div className="relative">
                                        <input 
                                            type="number"
                                            value={selectedLead.potentialValue}
                                            onChange={(e) => handleUpdateLeadField(selectedLead.id, "potentialValue", Number(e.target.value))}
                                            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                        />
                                        <DollarSign className="w-3.5 h-3.5 absolute left-3 top-3 text-[#B8956A]" />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Localidade / Terreno</label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={selectedLead.location || ""}
                                            onChange={(e) => handleUpdateLeadField(selectedLead.id, "location", e.target.value)}
                                            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                        />
                                        <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#B8956A]" />
                                    </div>
                                </div>

                                {/* Stage Selector */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Fase Comercial Atual</label>
                                    <select
                                        value={selectedLead.stageId}
                                        onChange={(e) => handleUpdateLeadField(selectedLead.id, "stageId", e.target.value)}
                                        className="w-full px-3 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                    >
                                        {PIPELINE_STAGES.map(stage => (
                                            <option key={stage.id} value={stage.id} className="bg-[#0A0A0A] text-white">
                                                {stage.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Notes / Logs section */}
                            <div className="space-y-4">
                                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#B8956A] block border-b border-[#B8956A]/10 pb-2">
                                    Notas e Histórico do Cliente
                                </span>
                                <textarea 
                                    rows={6}
                                    value={selectedLead.notes || ""}
                                    onChange={(e) => handleUpdateLeadField(selectedLead.id, "notes", e.target.value)}
                                    placeholder="Registe notas sobre chamadas, feedback do terreno ou agendamentos..."
                                    className="w-full p-4 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white font-light leading-relaxed resize-none"
                                />
                            </div>

                            {/* Dates Log */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#B8956A]/10 text-[9px] text-white/40 font-mono">
                                <div>
                                    <span>Adicionado em:</span>
                                    <span className="block text-white/70 mt-0.5">{selectedLead.dateAdded}</span>
                                </div>
                                <div>
                                    <span>Último contacto:</span>
                                    <span className="block text-[#B8956A] mt-0.5">{selectedLead.lastUpdated}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer containing quick database warning */}
                        <div className="p-4 bg-black/40 border-t border-[#B8956A]/10 text-center">
                            <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase block">
                                // TODO: Supabase Leads Sync Active
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Insertion Add Lead Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-[#0A0A0A]/85 z-[9999] flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-[#0A0A0A] border border-[#B8956A]/20 shadow-2xl relative flex flex-col text-left">
                        {/* Header */}
                        <div className="p-6 border-b border-[#B8956A]/10 bg-black/40 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#B8956A]" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.25em]">Inserir Nova Lead Manual</h3>
                            </div>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-none"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleCreateLead} className="p-6 space-y-5 text-white">
                            {/* Client Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Nome Completo do Cliente *</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Ex: Alexandre Julião"
                                        value={newLead.contactName}
                                        onChange={(e) => setNewLead(prev => ({ ...prev, contactName: e.target.value }))}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                    />
                                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-[#B8956A]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Origin Channel */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Canal de Origem</label>
                                    <select
                                        value={newLead.channel}
                                        onChange={(e) => setNewLead(prev => ({ ...prev, channel: e.target.value as any }))}
                                        className="w-full px-3 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                    >
                                        <option value="website" className="bg-[#0A0A0A]">Website Al Durr</option>
                                        <option value="whatsapp" className="bg-[#0A0A0A]">WhatsApp</option>
                                        <option value="instagram" className="bg-[#0A0A0A]">Instagram</option>
                                        <option value="facebook" className="bg-[#0A0A0A]">Messenger</option>
                                        <option value="meta_ads" className="bg-[#0A0A0A]">Meta Ads</option>
                                        <option value="email" className="bg-[#0A0A0A]">Email Direto</option>
                                    </select>
                                </div>

                                {/* Model Interest */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Modelo de Casa</label>
                                    <select
                                        value={newLead.modelInterest}
                                        onChange={(e) => setNewLead(prev => ({ ...prev, modelInterest: e.target.value as any }))}
                                        className="w-full px-3 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                    >
                                        <option value="T1" className="bg-[#0A0A0A]">T1 Studio (149.900€)</option>
                                        <option value="T2" className="bg-[#0A0A0A]">T2 Family (199.900€)</option>
                                        <option value="T-Multi" className="bg-[#0A0A0A]">T-Multi / Customizado</option>
                                        <option value="Indefinido" className="bg-[#0A0A0A]">Não Identificado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Location */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Localidade / Terreno</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Ex: Sintra, Mafra, Algarve..."
                                            value={newLead.location}
                                            onChange={(e) => setNewLead(prev => ({ ...prev, location: e.target.value }))}
                                            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                        />
                                        <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#B8956A]" />
                                    </div>
                                </div>

                                {/* Potential Value */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Valor Orçamentado (€)</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            value={newLead.potentialValue}
                                            onChange={(e) => setNewLead(prev => ({ ...prev, potentialValue: Number(e.target.value) }))}
                                            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white"
                                        />
                                        <DollarSign className="w-3.5 h-3.5 absolute left-3 top-3 text-[#B8956A]" />
                                    </div>
                                </div>
                            </div>

                            {/* Temperature Select */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Qualificação Inicial</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['hot', 'warm', 'cold'] as const).map(t => {
                                        const details = getTempBadge(t);
                                        const isSelected = newLead.temperature === t;
                                        return (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setNewLead(prev => ({ ...prev, temperature: t }))}
                                                className={`py-2 text-[10px] font-bold border transition-all uppercase tracking-widest rounded-none ${
                                                    isSelected 
                                                        ? `${details.color} border-[#B8956A]` 
                                                        : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.04]"
                                                }`}
                                            >
                                                {details.emoji} {details.label.split(" ")[0]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase">Notas e Contexto</label>
                                <textarea 
                                    rows={3}
                                    placeholder="Dúvidas técnicas do cliente, características do lote de terreno..."
                                    value={newLead.notes}
                                    onChange={(e) => setNewLead(prev => ({ ...prev, notes: e.target.value }))}
                                    className="w-full p-4 bg-white/[0.02] border border-white/10 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-white font-light leading-relaxed resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-none"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#B8956A] hover:bg-[#a6845a] text-[#0A0A0A] text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-none shadow-md"
                                >
                                    Criar Lead
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
