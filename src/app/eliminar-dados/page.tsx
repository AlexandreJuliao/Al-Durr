"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type Section = { h: string; p?: string[]; ul?: string[] };

const CONTENT: Record<"pt" | "en", { title: string; updated: string; intro: string[]; sections: Section[] }> = {
    pt: {
        title: "Eliminação de Dados",
        updated: "Última atualização: Junho de 2026",
        intro: [
            "Tem o direito de pedir a eliminação dos seus dados pessoais tratados pela REPORLAR CONSTRUÇÕES, LDA (marca Al Durr), incluindo os recolhidos através do website, WhatsApp, Instagram, Facebook Messenger e email.",
        ],
        sections: [
            {
                h: "Como pedir a eliminação",
                p: ["Envie um email para grupo@tatierica.pt com:"],
                ul: [
                    "Assunto: «Pedido de eliminação de dados»;",
                    "O nome, email e/ou telefone que usou ao contactar-nos;",
                    "O canal onde nos contactou (site, WhatsApp, Instagram, Facebook ou email).",
                ],
            },
            {
                h: "O que eliminamos",
                p: [
                    "Apagamos os seus dados pessoais (contactos, mensagens e registos de lead) no prazo máximo de 30 dias, exceto os dados que sejamos legalmente obrigados a conservar (ex.: faturação).",
                ],
            },
            {
                h: "Confirmação",
                p: ["Confirmamos por email assim que a eliminação estiver concluída."],
            },
            {
                h: "Contacto e reclamações",
                p: [
                    "Responsável: REPORLAR CONSTRUÇÕES, LDA — pessoa coletiva n.º 516583409 — R. Nossa Sra. da Graça, Póvoa de Penafirme 119, 2560-046 Torres Vedras. Email: grupo@tatierica.pt.",
                    "Pode também reclamar junto da CNPD (www.cnpd.pt). Ver também a nossa Política de Privacidade.",
                ],
            },
        ],
    },
    en: {
        title: "Data Deletion",
        updated: "Last updated: June 2026",
        intro: [
            "You have the right to request deletion of your personal data processed by REPORLAR CONSTRUÇÕES, LDA (Al Durr brand), including data collected via the website, WhatsApp, Instagram, Facebook Messenger and email.",
        ],
        sections: [
            {
                h: "How to request deletion",
                p: ["Send an email to grupo@tatierica.pt with:"],
                ul: [
                    "Subject: “Data deletion request”;",
                    "The name, email and/or phone you used to contact us;",
                    "The channel where you contacted us (website, WhatsApp, Instagram, Facebook or email).",
                ],
            },
            { h: "What we delete", p: ["We delete your personal data (contacts, messages and lead records) within 30 days, except data we are legally required to keep (e.g. invoicing)."] },
            { h: "Confirmation", p: ["We confirm by email once the deletion is complete."] },
            {
                h: "Contact and complaints",
                p: [
                    "Controller: REPORLAR CONSTRUÇÕES, LDA — tax ID 516583409 — R. Nossa Sra. da Graça, Póvoa de Penafirme 119, 2560-046 Torres Vedras, Portugal. Email: grupo@tatierica.pt.",
                    "You may also complain to the Portuguese authority (CNPD — www.cnpd.pt). See also our Privacy Policy.",
                ],
            },
        ],
    },
};

export default function DataDeletionPage() {
    const { locale } = useLanguage();
    const c = CONTENT[locale === "en" ? "en" : "pt"];

    return (
        <main className="relative min-h-screen bg-aldurr-void text-aldurr-text-body pt-36 pb-32">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-aldurr-green hover:brightness-125 transition">
                    ← Al Durr
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-8 mb-3">{c.title}</h1>
                <p className="text-aldurr-text-muted text-sm mb-12">{c.updated}</p>

                {c.intro.map((t, i) => (
                    <p key={i} className="text-aldurr-text-body/70 font-light leading-relaxed mb-10">{t}</p>
                ))}

                <div className="space-y-12">
                    {c.sections.map((s, i) => (
                        <section key={i}>
                            <h2 className="text-lg font-bold tracking-tight text-aldurr-text-body mb-4">{s.h}</h2>
                            {s.p?.map((p, j) => (
                                <p key={j} className="text-aldurr-text-body/70 font-light leading-relaxed mb-3">{p}</p>
                            ))}
                            {s.ul && (
                                <ul className="space-y-2 mt-2">
                                    {s.ul.map((li, j) => (
                                        <li key={j} className="flex gap-3 text-aldurr-text-body/70 font-light leading-relaxed">
                                            <span className="text-aldurr-green mt-1 select-none">—</span>
                                            <span>{li}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
