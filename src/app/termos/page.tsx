"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type Section = { h: string; p?: string[]; ul?: string[] };

const CONTENT: Record<"pt" | "en", { title: string; updated: string; intro: string[]; sections: Section[] }> = {
    pt: {
        title: "Termos e Condições",
        updated: "Última atualização: Junho de 2026",
        intro: [
            "Estes Termos e Condições regem o acesso e a utilização do website da Al Durr e dos seus canais de contacto. Ao utilizar o site, aceita estes termos.",
        ],
        sections: [
            { h: "1. Identificação", p: ["Al Durr — R. Nossa Sra. da Graça, Póvoa de Penafirme 119, 2560-046 Torres Vedras, Portugal. Email: grupo@tatierica.pt · Telefone: +351 935 994 555."] },
            { h: "2. Objeto", p: ["O site destina-se à apresentação das moradias modulares Al Durr e ao contacto com potenciais clientes. Não constitui, por si só, uma proposta contratual vinculativa."] },
            { h: "3. Orçamentos e informações", p: ["Os valores, plantas e prazos apresentados são indicativos e podem variar consoante o projeto, o terreno e o licenciamento. Qualquer compromisso depende de proposta escrita e contrato específico."] },
            { h: "4. Propriedade intelectual", p: ["Todos os conteúdos do site (textos, imagens, vídeos, marca, design e arquitetura das moradias) são propriedade da Al Durr ou licenciados, e não podem ser copiados ou reutilizados sem autorização escrita."] },
            { h: "5. Utilização", ul: ["Não utilizar o site para fins ilícitos;", "Não tentar aceder a áreas restritas ou comprometer a segurança;", "Fornecer informação verdadeira nos formulários de contacto."] },
            { h: "6. Canais de mensagens", p: ["O contacto por WhatsApp, Instagram, Facebook e email pode envolver respostas automáticas e humanas. O tratamento dos seus dados rege-se pela nossa Política de Privacidade."] },
            { h: "7. Limitação de responsabilidade", p: ["A Al Durr não se responsabiliza por interrupções do site nem por decisões tomadas com base em informação indicativa. O site pode conter ligações para terceiros, pelos quais não nos responsabilizamos."] },
            { h: "8. Lei aplicável e foro", p: ["Estes termos regem-se pela lei portuguesa. Para qualquer litígio, é competente o foro da comarca de Torres Vedras, sem prejuízo dos direitos do consumidor."] },
            { h: "9. Alterações", p: ["A Al Durr pode atualizar estes termos a qualquer momento. A versão em vigor está sempre disponível nesta página."] },
            { h: "10. Contacto", p: ["Para qualquer questão sobre estes termos: grupo@tatierica.pt."] },
        ],
    },
    en: {
        title: "Terms & Conditions",
        updated: "Last updated: June 2026",
        intro: ["These Terms & Conditions govern access to and use of the Al Durr website and its contact channels. By using the site, you accept these terms."],
        sections: [
            { h: "1. Identification", p: ["Al Durr — R. Nossa Sra. da Graça, Póvoa de Penafirme 119, 2560-046 Torres Vedras, Portugal. Email: grupo@tatierica.pt · Phone: +351 935 994 555."] },
            { h: "2. Purpose", p: ["The site presents Al Durr modular homes and enables contact with prospective clients. It does not, by itself, constitute a binding contractual offer."] },
            { h: "3. Quotes and information", p: ["Prices, plans and timelines shown are indicative and may vary with the project, land and permitting. Any commitment depends on a written proposal and specific contract."] },
            { h: "4. Intellectual property", p: ["All site content (text, images, videos, brand, design and home architecture) belongs to Al Durr or is licensed, and may not be copied or reused without written permission."] },
            { h: "5. Use", ul: ["Do not use the site for unlawful purposes;", "Do not attempt to access restricted areas or compromise security;", "Provide truthful information in contact forms."] },
            { h: "6. Messaging channels", p: ["Contact via WhatsApp, Instagram, Facebook and email may involve automated and human replies. Processing of your data is governed by our Privacy Policy."] },
            { h: "7. Limitation of liability", p: ["Al Durr is not liable for site interruptions or for decisions made based on indicative information. The site may contain third-party links, for which we are not responsible."] },
            { h: "8. Governing law and jurisdiction", p: ["These terms are governed by Portuguese law. Any dispute is subject to the courts of Torres Vedras, without prejudice to consumer rights."] },
            { h: "9. Changes", p: ["Al Durr may update these terms at any time. The current version is always available on this page."] },
            { h: "10. Contact", p: ["For any question about these terms: grupo@tatierica.pt."] },
        ],
    },
};

export default function TermsPage() {
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
