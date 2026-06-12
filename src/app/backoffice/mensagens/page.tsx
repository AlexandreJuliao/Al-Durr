"use client";

import React, { useState } from "react";
import { 
    MOCK_CONVERSATIONS 
} from "../mockData";
import { Conversation, Message } from "../types";
import { 
    Phone, 
    Mail, 
    Instagram, 
    Facebook, 
    AlertTriangle,
    CheckCircle,
    UserCheck,
    RotateCcw,
    Send,
    Search,
    MessageSquare,
    Link2,
    Calendar,
    CornerDownRight,
    Info
} from "lucide-react";

export default function MessageCenterPage() {
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [selectedConvId, setSelectedConvId] = useState<string>("conv-1");
    
    // Filters State
    const [channelFilter, setChannelFilter] = useState<'all' | 'whatsapp' | 'instagram' | 'facebook' | 'email'>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'waiting' | 'bot_responded' | 'active'>('all');
    const [showDetails, setShowDetails] = useState(true);
    
    // Message input states
    const [chatInput, setChatInput] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");

    // Active conversation
    const activeConversation = conversations.find(c => c.id === selectedConvId) || conversations[0];

    // Notification toast state for feedback
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Filter conversations
    const filteredConversations = conversations.filter(c => {
        const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesChannel && matchesStatus;
    });

    // Count statistics for badges
    const getCountByChannel = (channel: 'all' | 'whatsapp' | 'instagram' | 'facebook' | 'email') => {
        if (channel === 'all') return conversations.length;
        return conversations.filter(c => c.channel === channel).length;
    };

    const getCountByStatus = (status: 'all' | 'waiting' | 'bot_responded' | 'active') => {
        if (status === 'all') return conversations.length;
        return conversations.filter(c => c.status === status).length;
    };

    // Action Handlers
    const handleMarkResolved = (id: string) => {
        setConversations(prev => prev.map(c => {
            if (c.id === id) {
                triggerToast(`Conversa de ${c.contactName} marcada como resolvida!`);
                return { ...c, status: "bot_responded", unreadCount: 0 };
            }
            return c;
        }));
    };

    const handleReturnToBot = (id: string) => {
        setConversations(prev => prev.map(c => {
            if (c.id === id) {
                // Mock bot immediately adds a message
                const botGreeting: Message = {
                    id: `bot-auto-${Date.now()}`,
                    sender: "bot",
                    senderName: "Bot Al Durr",
                    content: "Entendido! O nosso bot inteligente retomou o diálogo automático. Em que mais posso ajudar?",
                    timestamp: "Agora mesmo"
                };
                triggerToast(`Conversa de ${c.contactName} devolvida ao Bot.`);
                return { 
                    ...c, 
                    status: "bot_responded", 
                    messages: [...c.messages, botGreeting] 
                };
            }
            return c;
        }));
    };

    const handleConvertToLead = (conv: Conversation) => {
        // In the future this will send a post request to Supabase
        // // TODO: Supabase connection: insert new row in Leads table
        // axios.post('/api/leads', { name: conv.contactName, ... })
        triggerToast(`Sucesso! ${conv.contactName} foi convertido em Lead no CRM!`);
    };

    const handleSendMessage = () => {
        if (activeConversation.channel === 'email') {
            if (!emailBody.trim()) return;
            const newMsg: Message = {
                id: `msg-${Date.now()}`,
                sender: "human",
                senderName: "Pedro (Al Durr)",
                subject: emailSubject || `Re: ${activeConversation.messages[0]?.subject || 'Contacto Al Durr'}`,
                content: emailBody,
                timestamp: "Agora mesmo"
            };
            setConversations(prev => prev.map(c => {
                if (c.id === activeConversation.id) {
                    return {
                        ...c,
                        status: "active",
                        lastMessage: emailBody.substring(0, 60) + "...",
                        lastMessageTime: "Agora",
                        messages: [...c.messages, newMsg]
                    };
                }
                return c;
            }));
            setEmailBody("");
            setEmailSubject("");
            triggerToast("Email enviado com sucesso!");
        } else {
            if (!chatInput.trim()) return;
            const newMsg: Message = {
                id: `msg-${Date.now()}`,
                sender: "human",
                senderName: "Pedro (Al Durr)",
                content: chatInput,
                timestamp: "Agora mesmo"
            };
            setConversations(prev => prev.map(c => {
                if (c.id === activeConversation.id) {
                    return {
                        ...c,
                        status: "active",
                        lastMessage: chatInput,
                        lastMessageTime: "Agora",
                        messages: [...c.messages, newMsg]
                    };
                }
                return c;
            }));
            setChatInput("");
            triggerToast("Mensagem enviada!");
        }
    };

    const getChannelIcon = (channel: string, size = 16) => {
        switch (channel) {
            case "whatsapp":
                return <Phone className={`w-${size} h-${size} text-[#25d366]`} />;
            case "instagram":
                return <Instagram className={`w-${size} h-${size} text-[#e1306c]`} />;
            case "facebook":
                return <Facebook className={`w-${size} h-${size} text-[#1877f2]`} />;
            case "email":
                return <Mail className={`w-${size} h-${size} text-neutral-400`} />;
            default:
                return <MessageSquare className={`w-${size} h-${size}`} />;
        }
    };

    return (
        <div className="flex h-full w-full overflow-hidden relative">
            {/* Feedback Toast Overlay */}
            {toastMessage && (
                <div className="absolute top-4 right-4 z-[999] px-6 py-4 bg-[#0A0A0A] border border-[#B8956A] text-[#B8956A] font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 select-none animate-in fade-in slide-in-from-top-4 duration-300">
                    <CheckCircle className="w-4 h-4 text-[#B8956A]" />
                    {toastMessage}
                </div>
            )}

            {/* Column 1: Conversations List (Left) */}
            <div className="w-80 lg:w-96 border-r border-[#B8956A]/10 bg-white flex flex-col h-full flex-shrink-0 text-left">
                {/* Channel Filters */}
                <div className="p-4 border-b border-neutral-100 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                            Filtros por Canal
                        </span>
                        {getCountByStatus("waiting") > 0 && (
                            <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[8px] font-bold tracking-widest uppercase border border-red-500/20">
                                {getCountByStatus("waiting")} Pendentes
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        <button 
                            onClick={() => setChannelFilter('all')}
                            className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                                channelFilter === 'all' 
                                    ? "bg-[#0A0A0A] border-[#B8956A]/30 text-[#B8956A]" 
                                    : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                            }`}
                        >
                            Todos ({getCountByChannel('all')})
                        </button>
                        <button 
                            onClick={() => setChannelFilter('whatsapp')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                                channelFilter === 'whatsapp' 
                                    ? "bg-[#25d366]/5 border-[#25d366]/40 text-[#25d366]" 
                                    : "bg-[#25d366]/2 border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                            }`}
                        >
                            <Phone className="w-3 h-3 text-[#25d366]" />
                            WhatsApp ({getCountByChannel('whatsapp')})
                        </button>
                        <button 
                            onClick={() => setChannelFilter('instagram')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                                channelFilter === 'instagram' 
                                    ? "bg-[#e1306c]/5 border-[#e1306c]/40 text-[#e1306c]" 
                                    : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                            }`}
                        >
                            <Instagram className="w-3 h-3 text-[#e1306c]" />
                            Instagram ({getCountByChannel('instagram')})
                        </button>
                        <button 
                            onClick={() => setChannelFilter('facebook')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                                channelFilter === 'facebook' 
                                    ? "bg-[#1877f2]/5 border-[#1877f2]/40 text-[#1877f2]" 
                                    : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                            }`}
                        >
                            <Facebook className="w-3 h-3 text-[#1877f2]" />
                            Messenger ({getCountByChannel('facebook')})
                        </button>
                        <button 
                            onClick={() => setChannelFilter('email')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                                channelFilter === 'email' 
                                    ? "bg-neutral-800 border-neutral-700 text-white" 
                                    : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                            }`}
                        >
                            <Mail className="w-3 h-3" />
                            Email ({getCountByChannel('email')})
                        </button>
                    </div>
                </div>

                {/* Status Filters */}
                <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200/50 flex gap-2">
                    <button 
                        onClick={() => setStatusFilter('all')}
                        className={`px-2 py-1 text-[8px] font-bold uppercase tracking-widest border ${
                            statusFilter === 'all' 
                                ? "bg-neutral-200 border-neutral-300 text-neutral-800" 
                                : "bg-white border-neutral-200 text-neutral-500"
                        }`}
                    >
                        Ver Todas
                    </button>
                    <button 
                        onClick={() => setStatusFilter('waiting')}
                        className={`flex items-center gap-1 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest border transition-all ${
                            statusFilter === 'waiting' 
                                ? "bg-red-500 border-red-600 text-white" 
                                : "bg-white border-red-200 text-red-500 hover:bg-red-50"
                        }`}
                    >
                        Aguardar ({getCountByStatus('waiting')})
                    </button>
                    <button 
                        onClick={() => setStatusFilter('active')}
                        className={`px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest border transition-all ${
                            statusFilter === 'active' 
                                ? "bg-blue-600 border-blue-700 text-white" 
                                : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                        }`}
                    >
                        Ativas ({getCountByStatus('active')})
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-3 bg-white border-b border-neutral-100 relative">
                    <input 
                        type="text" 
                        placeholder="Pesquisar contacto..."
                        className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] text-neutral-800 placeholder-neutral-400"
                    />
                    <Search className="w-3.5 h-3.5 absolute left-6 top-[1.1rem] text-neutral-400" />
                </div>

                {/* Conversations Scrollable Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-neutral-100">
                    {filteredConversations.length > 0 ? (
                        filteredConversations.map((c) => {
                            const isSelected = c.id === selectedConvId;
                            const isWhatsApp = c.channel === "whatsapp";
                            const isWaiting = c.status === "waiting";

                            return (
                                <div 
                                    key={c.id}
                                    onClick={() => setSelectedConvId(c.id)}
                                    className={`p-5 cursor-pointer relative transition-all duration-300 border-l-2 select-none ${
                                        isSelected 
                                            ? "bg-[#F5F2EC]/60 border-l-[#B8956A]" 
                                            : `border-l-transparent hover:bg-neutral-50 ${isWhatsApp && isWaiting ? "border-l-[#B8956A]/20" : ""}`
                                    } ${isWhatsApp ? "bg-white/[0.01]" : ""}`}
                                >
                                    {/* Highlighting WhatsApp WAITING Priority */}
                                    {isWhatsApp && isWaiting && (
                                        <div className="absolute top-0 right-0 bg-[#B8956A]/10 px-2 py-0.5 border-b border-l border-[#B8956A]/20 text-[7px] font-mono tracking-widest text-[#B8956A] font-bold uppercase">
                                            WhatsApp Principal
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            {getChannelIcon(c.channel)}
                                            <span className="text-xs font-bold text-neutral-800 uppercase">
                                                {c.contactName}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-neutral-400 font-mono">
                                            {c.lastMessageTime}
                                        </span>
                                    </div>

                                    <p className="text-[11px] text-neutral-500 line-clamp-1 pr-6 font-light">
                                        {c.lastMessage}
                                    </p>

                                    <div className="flex items-center gap-2 mt-3.5">
                                        {/* Status badges */}
                                        {c.status === "waiting" && (
                                            <span className="px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 text-[8px] font-bold uppercase tracking-widest rounded-none">
                                                Precisa de Ti
                                            </span>
                                        )}
                                        {c.status === "bot_responded" && (
                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[8px] font-bold uppercase tracking-widest rounded-none">
                                                Bot Respondeu
                                            </span>
                                        )}
                                        {c.status === "active" && (
                                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[8px] font-bold uppercase tracking-widest rounded-none">
                                                Conversa Ativa
                                            </span>
                                        )}

                                        {/* Cross-channel warning indicator */}
                                        {c.otherChannels && c.otherChannels.length > 0 && (
                                            <span className="ml-auto flex items-center gap-1 text-[8px] font-bold text-[#B8956A] uppercase tracking-wider">
                                                <Link2 className="w-2.5 h-2.5" />
                                                Multicanal
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-neutral-400 space-y-2">
                            <AlertTriangle className="w-8 h-8 mx-auto text-neutral-300" />
                            <p className="text-xs font-light">Nenhuma conversa nesta vista.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Column 2: Selected Conversation Chat History (Center) */}
            <div className="flex-1 flex flex-col bg-neutral-50 h-full border-r border-[#B8956A]/10 text-left">
                {/* Active Chat Header */}
                <div className="p-6 bg-white border-b border-neutral-100 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-[#B8956A]/30 bg-[#0A0A0A] flex items-center justify-center text-[#B8956A] font-bold rounded-none">
                            {activeConversation.contactAvatar}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-widest">
                                    {activeConversation.contactName}
                                </h3>
                                <span className="px-2 py-0.5 border border-[#B8956A]/20 bg-[#F5F2EC] text-[#B8956A] text-[8px] font-mono tracking-widest uppercase">
                                    Canal: {activeConversation.channel}
                                </span>
                            </div>
                            <span className="text-[10px] text-neutral-400 font-light block mt-0.5">
                                Original: {activeConversation.originalChannel}
                            </span>
                        </div>
                    </div>

                    {/* Operator quick action buttons */}
                    <div className="flex items-center gap-2">
                        {activeConversation.status === "waiting" && (
                            <button 
                                onClick={() => handleMarkResolved(activeConversation.id)}
                                className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 hover:border-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 text-[9px] font-bold tracking-widest uppercase rounded-none transition-all duration-300"
                            >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Resolver
                            </button>
                        )}
                        <button 
                            onClick={() => handleConvertToLead(activeConversation)}
                            className="flex items-center gap-2 px-4 py-2 border border-[#B8956A]/30 hover:border-[#B8956A] bg-[#B8956A]/5 hover:bg-[#B8956A]/10 text-[#B8956A] text-[9px] font-bold tracking-widest uppercase rounded-none transition-all duration-300"
                        >
                            <UserCheck className="w-3.5 h-3.5" />
                            Converter em Lead
                        </button>
                        <button 
                            onClick={() => handleReturnToBot(activeConversation.id)}
                            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-600 text-[9px] font-bold tracking-widest uppercase rounded-none transition-all duration-300"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Devolver ao Bot
                        </button>
                        <button 
                            onClick={() => setShowDetails(!showDetails)}
                            className={`flex items-center justify-center p-2 border transition-all duration-300 rounded-none ${
                                showDetails 
                                    ? "bg-[#0A0A0A] border-[#B8956A]/30 text-[#B8956A]" 
                                    : "bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50"
                            }`}
                            title={showDetails ? "Ocultar Detalhes" : "Mostrar Detalhes"}
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* History list */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    {/* Bot waiting warning */}
                    {activeConversation.status === "waiting" && (
                        <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 rounded-none flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest block">Intervenção Humana Necessária</span>
                                <p className="text-[11px] font-light mt-0.5">O bot inteligente não conseguiu responder de forma segura a esta questão técnica/comercial. Por favor, responda manualmente.</p>
                            </div>
                        </div>
                    )}

                    {activeConversation.messages.map((m) => {
                        const isEmail = activeConversation.channel === "email";
                        const isClient = m.sender === "client";
                        const isBot = m.sender === "bot";
                        
                        if (isEmail) {
                            // Render Email Thread
                            return (
                                <div key={m.id} className="bg-white border border-neutral-200 p-6 rounded-none space-y-4 shadow-sm hover:border-[#B8956A]/30 transition-all duration-300">
                                    <div className="flex justify-between items-start border-b border-neutral-100 pb-3">
                                        <div>
                                            <span className="text-[10px] text-neutral-400 font-mono block">Remetente</span>
                                            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block mt-0.5">
                                                {m.senderName} 
                                                {isBot && " (Auto Bot)"}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-neutral-400 font-mono block">Enviado em</span>
                                            <span className="text-xs text-neutral-500 font-light block mt-0.5">{m.timestamp}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] uppercase tracking-widest text-[#B8956A]/70 font-bold font-mono">Assunto</span>
                                        <p className="text-xs font-bold text-neutral-800">{m.subject}</p>
                                    </div>
                                    <div className="h-[1px] bg-neutral-100" />
                                    <div className="text-xs text-neutral-600 font-light whitespace-pre-line leading-relaxed pr-6">
                                        {m.content}
                                    </div>
                                </div>
                            );
                        }

                        // Render Chat Bubble for WhatsApp/Facebook/Instagram
                        return (
                            <div key={m.id} className={`flex flex-col ${isClient ? "items-start" : "items-end"}`}>
                                {/* Sender Label */}
                                <div className="flex items-center gap-1.5 mb-1 px-1">
                                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                                        {m.senderName}
                                    </span>
                                    {isBot && (
                                        <span className="px-1.5 py-0.5 bg-[#B8956A]/10 border border-[#B8956A]/20 text-[#B8956A] text-[7px] font-mono uppercase tracking-widest">
                                            Bot
                                        </span>
                                    )}
                                </div>

                                {/* Bubble content */}
                                <div className={`max-w-md p-4 shadow-sm border text-xs leading-relaxed ${
                                    isClient 
                                        ? "bg-white border-neutral-200 text-neutral-800 rounded-none" 
                                        : isBot 
                                            ? "bg-[#0A0A0A]/5 border-[#B8956A]/20 text-neutral-700 rounded-none" 
                                            : "bg-[#0A0A0A] border-[#0A0A0A] text-white rounded-none"
                                }`}>
                                    <p className="font-light">{m.content}</p>
                                </div>

                                {/* Timestamp */}
                                <span className="text-[9px] text-neutral-400 font-mono mt-1 px-1">
                                    {m.timestamp}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Caixa de Resposta (Footer) */}
                <div className="p-6 bg-white border-t border-neutral-100 flex-shrink-0">
                    {activeConversation.channel === "email" ? (
                        // Email Editor
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 w-16">Assunto:</span>
                                <input 
                                    type="text" 
                                    placeholder="Re: Solicitação de Informação Técnica..."
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <textarea 
                                    rows={4}
                                    placeholder="Escreva a resposta formal de email..."
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                    className="w-full p-4 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A] font-light leading-relaxed resize-none"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] text-neutral-400 font-mono">Assinatura: Equipa Al Durr</span>
                                    <button 
                                        onClick={handleSendMessage}
                                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A0A0A] hover:bg-neutral-900 border border-[#B8956A]/20 text-[#B8956A] text-[9px] font-bold tracking-widest uppercase rounded-none transition-all duration-300"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        Enviar Email
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Chat Input
                        <div className="relative flex items-center">
                            <input 
                                type="text"
                                placeholder={`Responda via ${activeConversation.channel.toUpperCase()}...`}
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                className="w-full pl-4 pr-16 py-3 bg-neutral-50 border border-neutral-200 text-xs rounded-none focus:outline-none focus:border-[#B8956A]"
                            />
                            <button 
                                onClick={handleSendMessage}
                                className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center bg-[#0A0A0A] border border-[#B8956A]/20 hover:bg-[#B8956A] text-[#B8956A] hover:text-white transition-all duration-300 rounded-none shadow-sm"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Column 3: Contact Details (Right) */}
            {showDetails && (
                <div className="hidden lg:block w-72 xl:w-80 bg-white border-l border-[#B8956A]/10 h-full overflow-y-auto custom-scrollbar p-6 text-left flex-shrink-0 animate-in fade-in slide-in-from-right duration-300">
                <div className="space-y-8">
                    {/* Contact Profile */}
                    <div className="text-center space-y-3 pb-6 border-b border-neutral-100">
                        <div className="w-16 h-16 mx-auto border border-[#B8956A]/40 bg-[#0A0A0A] flex items-center justify-center text-[#B8956A] font-bold text-2xl rounded-none shadow-sm">
                            {activeConversation.contactAvatar}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-neutral-800 tracking-widest uppercase">
                                {activeConversation.contactName}
                            </h4>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5 block">
                                Perfil Qualificado
                            </span>
                        </div>
                    </div>

                    {/* Unified Multi-Channel Alert */}
                    {activeConversation.otherChannels && activeConversation.otherChannels.length > 0 && (
                        <div className="p-4 bg-[#B8956A]/5 border border-[#B8956A]/20 rounded-none space-y-2">
                            <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#B8956A] uppercase tracking-wider">
                                <Link2 className="w-3 h-3" />
                                Vista Unificada (Cross-Channel)
                            </span>
                            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                                Este cliente também já contactou a Al Durr através do **{activeConversation.otherChannels.join(", ").toUpperCase()}**.
                            </p>
                        </div>
                    )}

                    {/* Profile details */}
                    <div className="space-y-4">
                        <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-neutral-400 block border-b border-neutral-100 pb-2">
                            Informação de Contacto
                        </span>
                        {activeConversation.phone && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-mono tracking-widest text-[#B8956A] uppercase">Telefone</span>
                                <span className="text-xs text-neutral-700 font-medium">{activeConversation.phone}</span>
                            </div>
                        )}
                        {activeConversation.emailAddress && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-mono tracking-widest text-[#B8956A] uppercase">E-mail</span>
                                <span className="text-xs text-neutral-700 font-medium truncate">{activeConversation.emailAddress}</span>
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-mono tracking-widest text-[#B8956A] uppercase">Canal de Origem</span>
                            <span className="text-xs text-neutral-700 font-medium uppercase tracking-wider">
                                {activeConversation.originalChannel}
                            </span>
                        </div>
                    </div>

                    {/* Bot Qualification Summary */}
                    {activeConversation.summary && (
                        <div className="space-y-3">
                            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-neutral-400 block border-b border-neutral-100 pb-2">
                                Sumário Qualificação Bot
                            </span>
                            <div className="p-4 bg-neutral-50 border border-neutral-200/50 rounded-none text-[11px] text-neutral-600 font-light leading-relaxed">
                                {activeConversation.summary}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div className="space-y-3">
                        <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-neutral-400 block border-b border-neutral-100 pb-2">
                            Tags Operador
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {activeConversation.tags.map((tag, idx) => (
                                <span 
                                    key={idx}
                                    className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-600 text-[8px] font-bold tracking-widest uppercase"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}
