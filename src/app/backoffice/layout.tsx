"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    MessageSquare, 
    Layers, 
    Settings, 
    User,
    LogOut,
    Menu
} from "lucide-react";

export default function BackofficeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/backoffice",
        },
        {
            name: "Central de Mensagens",
            icon: MessageSquare,
            path: "/backoffice/mensagens",
            badge: "4", // Count of active messages waiting human response
        },
        {
            name: "CRM Leads",
            icon: Layers,
            path: "/backoffice/crm",
        },
        {
            name: "Definições",
            icon: Settings,
            path: "/backoffice/definicoes",
        },
    ];

    return (
        <div className="flex h-screen w-full bg-[#F5F2EC] overflow-hidden text-neutral-800">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-72 bg-[#0A0A0A] border-r border-[#B8956A]/10 text-white flex-shrink-0">
                {/* Brand Logo */}
                <div className="p-8 border-b border-[#B8956A]/10 flex flex-col items-start gap-1">
                    <Link href="/backoffice" className="flex items-baseline gap-1.5 cursor-pointer">
                        <span className="text-2xl font-bold tracking-[0.2em] font-display bg-gradient-to-r from-[#B8956A] via-[#D8B289] to-[#B8956A] bg-clip-text text-transparent">
                            AL DURR
                        </span>
                    </Link>
                    <span className="text-[8px] font-bold tracking-[0.3em] text-[#B8956A]/60 uppercase">
                        Plataforma Interna
                    </span>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== "/backoffice" && pathname.startsWith(item.path));
                        const Icon = item.icon;

                        return (
                            <Link 
                                key={item.name} 
                                href={item.path}
                                className={`group flex items-center justify-between px-4 py-3.5 border transition-all duration-300 rounded-none ${
                                    isActive 
                                        ? "bg-white/[0.03] border-[#B8956A]/30 text-[#B8956A]" 
                                        : "border-transparent text-white/60 hover:text-white hover:bg-white/[0.01] hover:border-white/5"
                                }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <Icon className={`w-4 h-4 transition-colors ${
                                        isActive ? "text-[#B8956A]" : "text-white/40 group-hover:text-white/70"
                                    }`} />
                                    <span className="text-xs uppercase tracking-[0.2em] font-medium font-sans">
                                        {item.name}
                                    </span>
                                </div>
                                {item.badge && (
                                    <span className="px-2 py-0.5 bg-[#ef4444]/20 border border-[#ef4444]/30 text-[#ef4444] text-[9px] font-bold rounded-none font-mono">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Block at bottom */}
                <div className="p-6 border-t border-[#B8956A]/10 bg-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-none border border-[#B8956A]/30 flex items-center justify-center bg-white/[0.02]">
                            <User className="w-4 h-4 text-[#B8956A]" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs font-semibold text-white/90 truncate max-w-[120px]">
                                Pedro Albuquerque
                            </span>
                            <span className="text-[8px] font-mono tracking-widest text-[#B8956A]/60 uppercase">
                                Diretor Comercial
                            </span>
                        </div>
                    </div>
                    <Link href="/" className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-none text-white/40 hover:text-white transition-all duration-300">
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Topbar */}
                <header className="h-20 bg-white border-b border-[#B8956A]/10 flex items-center justify-between px-6 md:px-12 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 border border-neutral-200 text-neutral-600 rounded-none">
                            <Menu className="w-4 h-4" />
                        </button>
                        <h1 className="text-sm font-bold tracking-[0.25em] text-[#0A0A0A] uppercase font-sans">
                            {pathname === "/backoffice" && "Cockpit Geral"}
                            {pathname.startsWith("/backoffice/mensagens") && "Central de Mensagens"}
                            {pathname.startsWith("/backoffice/crm") && "Gestão de Pipeline / CRM"}
                            {pathname.startsWith("/backoffice/definicoes") && "Configurações"}
                        </h1>
                    </div>

                    {/* Quick Info / Environment Indicator */}
                    <div className="flex items-center gap-6">
                        {/* Live Bot Connection Status */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#22c55e]/5 border border-[#22c55e]/20 text-[#22c55e]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]"></span>
                            </span>
                            <span className="text-[9px] font-mono tracking-widest uppercase">
                                BOT Live • n8n Connected
                            </span>
                        </div>
                        <div className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                            PT-PT • 2026
                        </div>
                    </div>
                </header>

                {/* Page Content Body */}
                <main className="flex-1 overflow-auto bg-[#F5F2EC]">
                    {children}
                </main>
            </div>
        </div>
    );
}
