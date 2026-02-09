export const translations = {
    pt: {
        nav: {
            models: "MODELOS",
            gallery: "GALERIA",
            process: "O PROCESSO",
            cta: "Pedir Orçamento",
        },
        hero: {
            headline: "Design. Rapidez. Eternidade.",
            sub: "A sua casa pronta a habitar em 6 meses. Sem manutenção.",
            stageA: "Estrutura",
            stageB: "Acabamento",
            stageC: "Final",
            slides: [
                { title: "Geometria Pura", subtitle: "O Traço Icónico" },
                { title: "Eficiência", subtitle: "Do Projeto à Realidade em 4 Meses" },
                { title: "Perenidade", subtitle: "Materiais que Desafiam o Tempo" },
                { title: "Adaptabilidade", subtitle: "Espaços que Crescem Consigo" },
                { title: "Distinção", subtitle: "Um Investimento de Valor Absoluto" }
            ]
        },
        prism: {
            title: "A Geometria do Prisma",
            subtitle: "O Manifesto",
            description: "Não é uma cabana rústica. É uma peça de arquitetura contemporânea definida pela sua geometria trapezoidal e moldura identitária.",
            feature1: "Design Trapezoidal",
            feature2: "A Moldura Identitária",
            feature3: "Extrusão Modular"
        },
        engineering: {
            title: "Engenharia de Elite",
            subtitle: "O Diferencial",
            description: "Durabilidade absoluta garantida por um esqueleto de engenharia avançada. O conceito Raio-X prova a robustez que a estética esconde.",
            feature1: "Ancoragem Heavy Duty",
            feature2: "Malha Estrutural",
            feature3: "Pele Antracite"
        },
        interiors: {
            title: "Sem Cantos Mortos",
            subtitle: "Interiores",
            description: "A solução 'Chave na Mão' onde o design personalizado domina a inclinação. Aproveitamento total do volume habitável.",
            feature1: "Escadaria à Medida",
            feature2: "Amplitude das Mezzanines",
            feature3: "Carpintaria Personalizada"
        },
        common: {
            scroll: "Scroll para explorar",
        }
    },
    en: {
        nav: {
            models: "MODELS",
            gallery: "GALLERY",
            process: "THE PROCESS",
            cta: "Request Quote",
        },
        hero: {
            headline: "Design. Speed. Eternity.",
            sub: "Your home ready to live in 6 months. Maintenance-free.",
            stageA: "Structure",
            stageB: "Finishing",
            stageC: "Final",
            slides: [
                { title: "Pure Geometry", subtitle: "The Iconic Stroke" },
                { title: "Efficiency", subtitle: "From Blueprint to Reality in 4 Months" },
                { title: "Permanence", subtitle: "Materials That Defy Time" },
                { title: "Adaptability", subtitle: "Spaces That Grow With You" },
                { title: "Distinction", subtitle: "An Investment of Absolute Value" }
            ]
        },
        prism: {
            title: "The Prism Geometry",
            subtitle: "The Manifesto",
            description: "Not a rustic cabin. A piece of contemporary architecture defined by its trapezoidal geometry and signature frame.",
            feature1: "Trapezoidal Design",
            feature2: "Signature Frame",
            feature3: "Modular Extrusion"
        },
        engineering: {
            title: "Elite Engineering",
            subtitle: "The Differential",
            description: "Absolute durability guaranteed by an advanced engineering skeleton. The X-Ray concept proves the robustness hidden by aesthetics.",
            feature1: "Heavy Duty Anchoring",
            feature2: "Structural Mesh",
            feature3: "Anthracite Skin"
        },
        interiors: {
            title: "No Dead Corners",
            subtitle: "Interiors",
            description: "The 'Turnkey' solution where custom design masters the slope. Total utilization of habitable volume.",
            feature1: "Custom Staircase",
            feature2: "Mezzanine Amplitude",
            feature3: "Custom Carpentry"
        },
        common: {
            scroll: "Scroll to explore",
        }
    }
};

export type Locale = "pt" | "en";
export type TranslationKey = keyof typeof translations.pt;
