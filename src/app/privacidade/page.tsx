"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type Section = { h: string; p?: string[]; ul?: string[] };

const CONTENT: Record<"pt" | "en", { title: string; updated: string; intro: string[]; sections: Section[] }> = {
    pt: {
        title: "Política de Privacidade",
        updated: "Última atualização: Junho de 2026",
        intro: [
            "A Al Durr respeita a sua privacidade e está empenhada em proteger os seus dados pessoais. Esta política explica que dados recolhemos, como os usamos e quais os seus direitos, ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD).",
        ],
        sections: [
            {
                h: "1. Responsável pelo tratamento",
                p: [
                    "Al Durr — R. Nossa Sra. da Graça, Póvoa de Penafirme 119, 2560-046 Torres Vedras, Portugal.",
                    "Email: grupo@tatierica.pt · Telefone: +351 935 994 555.",
                ],
            },
            {
                h: "2. Que dados recolhemos",
                ul: [
                    "Dados de identificação e contacto: nome, email, telefone, localidade.",
                    "Conteúdo das suas mensagens e pedidos (formulário do site, WhatsApp, Instagram, Facebook Messenger e email).",
                    "Informação sobre o seu interesse: modelo pretendido, terreno, orçamento e notas.",
                    "Dados técnicos de navegação (cookies essenciais e, com consentimento, de análise).",
                ],
            },
            {
                h: "3. Finalidades e fundamentos legais",
                ul: [
                    "Responder aos seus pedidos e elaborar orçamentos — diligências pré-contratuais.",
                    "Gestão da relação comercial e do nosso CRM interno — interesse legítimo.",
                    "Comunicação por WhatsApp, Instagram, Facebook e email — execução do pedido e/ou consentimento.",
                    "Comunicações de marketing — apenas com o seu consentimento, revogável a qualquer momento.",
                ],
            },
            {
                h: "4. Partilha de dados e subcontratantes",
                p: [
                    "Não vendemos os seus dados. Partilhamos apenas com prestadores que nos ajudam a operar, sob contrato e instruções:",
                ],
                ul: [
                    "Meta Platforms (WhatsApp Business, Instagram, Facebook Messenger) — para comunicarmos consigo nesses canais.",
                    "Google (Workspace / Sheets) — receção e organização de contactos.",
                    "Supabase — base de dados e CRM.",
                    "n8n — automação dos fluxos de mensagens.",
                    "Fornecedores de envio de email.",
                ],
            },
            {
                h: "5. Conservação",
                p: [
                    "Conservamos os dados apenas pelo tempo necessário às finalidades indicadas ou enquanto durar a relação comercial, salvo obrigação legal de conservação superior.",
                ],
            },
            {
                h: "6. Transferências internacionais",
                p: [
                    "Alguns prestadores podem tratar dados fora do Espaço Económico Europeu. Nesses casos, asseguramos garantias adequadas (ex.: Cláusulas Contratuais-Tipo da Comissão Europeia).",
                ],
            },
            {
                h: "7. Os seus direitos",
                p: ["Pode exercer, a qualquer momento, os direitos de:"],
                ul: [
                    "Acesso, retificação e apagamento dos seus dados;",
                    "Limitação e oposição ao tratamento;",
                    "Portabilidade;",
                    "Retirada do consentimento, sem afetar a licitude do tratamento anterior.",
                ],
            },
            {
                h: "8. Como exercer / Reclamações",
                p: [
                    "Para exercer os seus direitos ou apagar os seus dados, contacte grupo@tatierica.pt. Tem ainda o direito de apresentar reclamação à autoridade de controlo (CNPD — www.cnpd.pt).",
                ],
            },
            {
                h: "9. Cookies",
                p: [
                    "Utilizamos cookies essenciais ao funcionamento do site e, mediante consentimento, cookies de análise para melhorar a experiência.",
                ],
            },
            {
                h: "10. Alterações",
                p: ["Podemos atualizar esta política. A versão em vigor está sempre disponível nesta página."],
            },
        ],
    },
    en: {
        title: "Privacy Policy",
        updated: "Last updated: June 2026",
        intro: [
            "Al Durr respects your privacy and is committed to protecting your personal data. This policy explains what data we collect, how we use it and your rights under the EU General Data Protection Regulation (GDPR).",
        ],
        sections: [
            {
                h: "1. Data controller",
                p: [
                    "Al Durr — R. Nossa Sra. da Graça, Póvoa de Penafirme 119, 2560-046 Torres Vedras, Portugal.",
                    "Email: grupo@tatierica.pt · Phone: +351 935 994 555.",
                ],
            },
            {
                h: "2. Data we collect",
                ul: [
                    "Identification and contact data: name, email, phone, location.",
                    "Your messages and requests (website form, WhatsApp, Instagram, Facebook Messenger and email).",
                    "Your interest details: desired model, land, budget and notes.",
                    "Technical browsing data (essential cookies and, with consent, analytics).",
                ],
            },
            {
                h: "3. Purposes and legal bases",
                ul: [
                    "Respond to your requests and prepare quotes — pre-contractual steps.",
                    "Manage the commercial relationship and our internal CRM — legitimate interest.",
                    "Communicate via WhatsApp, Instagram, Facebook and email — performance of your request and/or consent.",
                    "Marketing communications — only with your consent, withdrawable at any time.",
                ],
            },
            {
                h: "4. Data sharing and processors",
                p: ["We do not sell your data. We only share it with providers that help us operate, under contract and instructions:"],
                ul: [
                    "Meta Platforms (WhatsApp Business, Instagram, Facebook Messenger) — to communicate with you on those channels.",
                    "Google (Workspace / Sheets) — receiving and organising contacts.",
                    "Supabase — database and CRM.",
                    "n8n — message workflow automation.",
                    "Email delivery providers.",
                ],
            },
            { h: "5. Retention", p: ["We keep data only as long as necessary for the stated purposes or for the duration of the relationship, unless a longer legal retention applies."] },
            { h: "6. International transfers", p: ["Some providers may process data outside the EEA. In such cases we ensure adequate safeguards (e.g. EU Standard Contractual Clauses)."] },
            {
                h: "7. Your rights",
                p: ["At any time you may exercise the rights to:"],
                ul: ["Access, rectify and erase your data;", "Restrict and object to processing;", "Data portability;", "Withdraw consent, without affecting prior lawful processing."],
            },
            { h: "8. How to exercise / Complaints", p: ["To exercise your rights or delete your data, contact grupo@tatierica.pt. You may also lodge a complaint with the Portuguese supervisory authority (CNPD — www.cnpd.pt)."] },
            { h: "9. Cookies", p: ["We use cookies essential to the website and, subject to consent, analytics cookies to improve the experience."] },
            { h: "10. Changes", p: ["We may update this policy. The current version is always available on this page."] },
        ],
    },
};

export default function PrivacyPage() {
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
