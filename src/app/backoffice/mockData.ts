import { Conversation, Lead, PipelineStage } from "./types";

export const PIPELINE_STAGES: PipelineStage[] = [
    { id: "nova", title: "Nova Lead" },
    { id: "contacto_feito", title: "Contacto Feito" },
    { id: "qualificada", title: "Qualificada" },
    { id: "reuniao_agendada", title: "Reunião Agendada" },
    { id: "analise_viabilidade", title: "Análise de Viabilidade" },
    { id: "proposta_enviada", title: "Proposta Enviada" },
    { id: "reserva", title: "Reserva / Sinal" },
    { id: "contrato_fechado", title: "Contrato Fechado" },
    { id: "perdida", title: "Perdida" }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: "conv-1",
        contactName: "João Silva",
        contactAvatar: "JS",
        channel: "whatsapp",
        status: "waiting",
        lastMessage: "Gostei muito do modelo T2. Mas tenho uma dúvida sobre a resistência ao vento do telhado A-Frame na minha zona.",
        lastMessageTime: "14:32",
        unreadCount: 1,
        phone: "+351 912 345 678",
        emailAddress: "joao.silva@email.pt",
        originalChannel: "whatsapp",
        tags: ["Dúvida Técnica", "Modelo T2"],
        summary: "Interessado no T2 Family para terreno na zona de Sintra. Demonstra preocupação com a exposição ao vento forte devido à inclinação do telhado A-Frame.",
        messages: [
            {
                id: "m1-1",
                sender: "client",
                senderName: "João Silva",
                content: "Olá, boa tarde. Estive a ver o vosso website e fiquei muito impressionado com o design das vossas casas Al Durr. Gostaria de saber mais informações.",
                timestamp: "Ontem, 16:15"
            },
            {
                id: "m1-2",
                sender: "bot",
                senderName: "Bot Al Durr",
                content: "Olá João! É um prazer receber o seu contacto. As nossas moradias combinam engenharia sustentável com um design arquitetónico único. Para o ajudar melhor, já tem um terreno disponível para construção?",
                timestamp: "Ontem, 16:16"
            },
            {
                id: "m1-3",
                sender: "client",
                senderName: "João Silva",
                content: "Sim, tenho um terreno em Sintra, numa zona bastante alta e com alguma exposição. Estava a pensar no vosso modelo T2 Family.",
                timestamp: "Ontem, 16:20"
            },
            {
                id: "m1-4",
                sender: "bot",
                senderName: "Bot Al Durr",
                content: "Excelente escolha, João! O T2 Family tem 65m² (35m² no piso térreo e 30m² no mezzanine), perfeito para desfrutar da paisagem de Sintra. O nosso modelo chave-na-mão começa nos 199.900€. Deseja receber a planta detalhada ou gostaria de agendar uma chamada curta de qualificação com a nossa equipa comercial?",
                timestamp: "Ontem, 16:22"
            },
            {
                id: "m1-5",
                sender: "client",
                senderName: "João Silva",
                content: "Gostei muito do modelo T2. Mas tenho uma dúvida sobre a resistência ao vento do telhado A-Frame na minha zona. Sintra tem ventos muito fortes e fustigantes.",
                timestamp: "14:32"
            }
        ]
    },
    {
        id: "conv-2",
        contactName: "Sofia Mendes",
        contactAvatar: "SM",
        channel: "facebook",
        status: "waiting",
        lastMessage: "Boa tarde. Tenho visto as vossas moradias e gostaria de saber se é possível ligar dois módulos T1 para fazer um T2 personalizado?",
        lastMessageTime: "15:05",
        unreadCount: 1,
        phone: "+351 934 888 222",
        emailAddress: "sofia.mendes@gmail.pt",
        otherChannels: ["instagram"],
        originalChannel: "instagram",
        tags: ["T-Multi", "Customização"],
        summary: "Contactou originalmente via Instagram a elogiar os acabamentos interiores. Agora pergunta no Facebook se o sistema modular permite fundir dois módulos T1 independentes.",
        messages: [
            {
                id: "m2-1",
                sender: "client",
                senderName: "Sofia Mendes",
                content: "Boa tarde. Tenho visto as vossas moradias e gostaria de saber se é possível ligar dois módulos T1 para fazer um T2 personalizado?",
                timestamp: "15:05"
            }
        ]
    },
    {
        id: "conv-3",
        contactName: "Ana Pereira",
        contactAvatar: "AP",
        channel: "whatsapp",
        status: "waiting",
        lastMessage: "Tenho um terreno na Ericeira com algum declive. O vosso sistema de fundações é adequado ou preciso de terraplenar tudo?",
        lastMessageTime: "11:12",
        unreadCount: 2,
        phone: "+351 965 111 222",
        emailAddress: "ana.pereira@outlook.pt",
        originalChannel: "whatsapp",
        tags: ["Terreno", "Ericeira"],
        summary: "Cliente qualificada com terreno na Ericeira. Procura esclarecimentos urgentes sobre o impacto das fundações no declive natural do solo para evitar movimentações de terra agressivas.",
        messages: [
            {
                id: "m3-1",
                sender: "client",
                senderName: "Ana Pereira",
                content: "Olá! Gostaria de agendar uma reunião para analisar o meu terreno.",
                timestamp: "10:50"
            },
            {
                id: "m3-2",
                sender: "bot",
                senderName: "Bot Al Durr",
                content: "Olá Ana! Teremos todo o gosto em analisar a viabilidade da construção. As moradias Al Durr utilizam um sistema de fundações ecológico de alta precisão que minimiza o impacto ambiental. Para adiantar a análise do nosso arquiteto, qual é a zona do terreno e se o mesmo apresenta declive acentuado?",
                timestamp: "10:52"
            },
            {
                id: "m3-3",
                sender: "client",
                senderName: "Ana Pereira",
                content: "Tenho um terreno na Ericeira com algum declive. O vosso sistema de fundações é adequado ou preciso de terraplenar tudo?",
                timestamp: "11:12"
            }
        ]
    },
    {
        id: "conv-4",
        contactName: "Carlos Costa",
        contactAvatar: "CC",
        channel: "whatsapp",
        status: "active",
        lastMessage: "Excelente, Pedro. Ficamos então confirmados para terça-feira às 15:00 nas vossas instalações.",
        lastMessageTime: "10:15",
        unreadCount: 0,
        phone: "+351 918 765 432",
        emailAddress: "carlos.costa@tech.pt",
        originalChannel: "website",
        tags: ["Reunião Agendada", "Modelo T-Multi"],
        summary: "Cliente de alto potencial interessado no T-Multi (customizado, off-grid completo). Reunião de apresentação técnica com o Pedro confirmada para a próxima semana.",
        messages: [
            {
                id: "m4-1",
                sender: "client",
                senderName: "Carlos Costa",
                content: "Estou muito interessado na solução Off-Grid completa para o T-Multi. O terreno é no Alentejo profundo e não tenho rede pública de água ou luz.",
                timestamp: "Ontem, 09:30"
            },
            {
                id: "m4-2",
                sender: "human",
                senderName: "Pedro (Al Durr)",
                content: "Bom dia Carlos. A nossa moradia T-Multi é ideal para esse contexto. Conseguimos instalar painéis fotovoltaicos integrados, baterias de lítio e sistema de captação e filtragem biológica de água. Gostaria de agendar uma reunião presencial para lhe apresentar a maquete e os detalhes?",
                timestamp: "Ontem, 11:45"
            },
            {
                id: "m4-3",
                sender: "client",
                senderName: "Carlos Costa",
                content: "Excelente, Pedro. Ficamos então confirmados para terça-feira às 15:00 nas vossas instalações.",
                timestamp: "10:15"
            }
        ]
    },
    {
        id: "conv-5",
        contactName: "Maria Santos",
        contactAvatar: "MS",
        channel: "whatsapp",
        status: "bot_responded",
        lastMessage: "Obrigada pelas informações! Vou falar com o meu marido e depois voltamos a contactar para agendar a chamada.",
        lastMessageTime: "09:44",
        unreadCount: 0,
        phone: "+351 929 444 555",
        originalChannel: "meta_ads",
        tags: ["Topo de Funil", "Preços"],
        summary: "Contacto vindo de anúncio no Meta. O bot qualificou e esclareceu a tabela de preços do T1 Studio. Cliente em reflexão familiar antes do agendamento comercial.",
        messages: [
            {
                id: "m5-1",
                sender: "client",
                senderName: "Maria Santos",
                content: "Vi o vosso anúncio no Facebook e gostava de saber qual é o preço da casa mais pequena que fabricam.",
                timestamp: "09:35"
            },
            {
                id: "m5-2",
                sender: "bot",
                senderName: "Bot Al Durr",
                content: "Olá Maria! A nossa moradia mais compacta é a maravilhosa T1 Studio, com 45m² de design otimizado e um deck frontal em madeira de 15m². O preço base chave-na-mão é de 149.900€ (mais IVA). Este valor já inclui toda a montagem, isolamento térmico de alta performance e acabamentos premium originais. Gostava de receber o catálogo completo?",
                timestamp: "09:37"
            },
            {
                id: "m5-3",
                sender: "client",
                senderName: "Maria Santos",
                content: "Sim, por favor. Pode enviar-me para ver.",
                timestamp: "09:40"
            },
            {
                id: "m5-4",
                sender: "bot",
                senderName: "Bot Al Durr",
                content: "Com certeza, Maria! Já enviei o PDF do catálogo da Coleção Prisma para o seu contacto. Se tiver interesse, posso agendar uma breve conversa com o nosso arquiteto consultor para tirar dúvidas.",
                timestamp: "09:42"
            },
            {
                id: "m5-5",
                sender: "client",
                senderName: "Maria Santos",
                content: "Obrigada pelas informações! Vou falar com o meu marido e depois voltamos a contactar para agendar a chamada.",
                timestamp: "09:44"
            }
        ]
    },
    {
        id: "conv-6",
        contactName: "Cláudia Rodrigues",
        contactAvatar: "CR",
        channel: "instagram",
        status: "bot_responded",
        lastMessage: "Os interiores em Obsidian são simplesmente fantásticos! Vou pesquisar terrenos na zona de Tavira.",
        lastMessageTime: "Ontem, 18:20",
        unreadCount: 0,
        emailAddress: "claudia.rod@gmail.com",
        originalChannel: "instagram",
        tags: ["Interiores Obsidian", "Algarve"],
        summary: "Elogiou muito a linha de acabamentos Obsidian no Instagram. Pretende iniciar a procura de lotes de terreno no sotavento algarvio (Tavira) especificamente para construir uma Al Durr.",
        messages: [
            {
                id: "m6-1",
                sender: "client",
                senderName: "Cláudia Rodrigues",
                content: "Olá! O vosso design é incrível. Fazem construções no Algarve? Mais especificamente em Tavira?",
                timestamp: "Ontem, 18:10"
            },
            {
                id: "m6-2",
                sender: "bot",
                senderName: "Bot Al Durr",
                content: "Olá Cláudia! Muito obrigado pelo carinho. Sim, construímos e entregamos em todo o Portugal Continental, incluindo o maravilhoso sotavento algarvio! O nosso prazo de entrega total é de apenas 4 meses após o licenciamento. Já possui algum terreno em vista em Tavira?",
                timestamp: "Ontem, 18:12"
            },
            {
                id: "m6-3",
                sender: "client",
                senderName: "Cláudia Rodrigues",
                content: "Os interiores em Obsidian são simplesmente fantásticos! Vou pesquisar terrenos na zona de Tavira.",
                timestamp: "Ontem, 18:20"
            }
        ]
    },
    {
        id: "conv-7",
        contactName: "Francisco Vasconcelos",
        contactAvatar: "FV",
        channel: "email",
        status: "waiting",
        lastMessage: "Re: Solicitação de Informação Técnica - Terreno com Linha de Água em Sintra",
        lastMessageTime: "30 Mai, 17:40",
        unreadCount: 1,
        emailAddress: "f.vasconcelos.eng@sapo.pt",
        originalChannel: "email",
        tags: ["Análise Terreno", "Sintra", "Email Thread"],
        summary: "Email formal de um Engenheiro Civil proprietário de um terreno florestal com linha de água protegida em Sintra. Pede parecer sobre restrições de construção para o modelo T2.",
        messages: [
            {
                id: "m7-1",
                sender: "client",
                senderName: "Francisco Vasconcelos",
                subject: "Solicitação de Informação Técnica - Terreno em Sintra",
                content: "Exmos. Senhores,\n\nVenho por este meio solicitar informação de caráter técnico relativamente à viabilidade de implantação da vossa estrutura T2 no meu lote de terreno localizado em Colares, Sintra.\n\nMais informo que o lote em questão confina parcialmente com uma linha de água protegida (REN). Face à leveza da vossa bio-estrutura sustentável, gostaria de obter o vosso parecer preliminar sobre a necessidade de consolidação de solos ou se o vosso sistema de estacaria de precisão dispensa grandes movimentações de terra.\n\nFico a aguardar a vossa resposta.\n\nCom os melhores cumprimentos,\n\nEng. Francisco Vasconcelos",
                timestamp: "29 Mai, 10:15"
            },
            {
                id: "m7-2",
                sender: "bot",
                senderName: "Bot Al Durr",
                subject: "Re: Solicitação de Informação Técnica - Terreno em Sintra",
                content: "Exmo. Senhor Eng. Francisco Vasconcelos,\n\nAgradecemos o seu contacto e o interesse no projeto Al Durr.\n\nAs nossas moradias utilizam um método de engenharia sustentável com sapatas de micropilares metálicos autoperfurantes de alta precisão. Este método tem um impacto ambiental praticamente nulo no perfil natural do terreno, dispensando terraplenagens agressivas ou fundações maciças de betão armado, o que é altamente favorável em zonas sob regime de Reserva Ecológica Nacional (REN).\n\nContudo, a viabilidade regulamentar depende sempre do afastamento legal obrigatório face à linha de água. Para que o nosso arquiteto possa fazer um parecer geométrico preliminar gratuito, seria viável enviar-nos a caderneta predial e o levantamento topográfico?\n\nMelhores cumprimentos,\n\nEquipa Técnica Al Durr",
                timestamp: "29 Mai, 12:44"
            },
            {
                id: "m7-3",
                sender: "client",
                senderName: "Francisco Vasconcelos",
                subject: "Re: Solicitação de Informação Técnica - Terreno com Linha de Água em Sintra",
                content: "Exma. Equipa,\n\nAgradeço a vossa rápida e esclarecedora resposta técnica.\n\nEm anexo a este email, envio a certidão de teor e o levantamento topográfico em formato DWG para que possam avaliar as curvas de nível e a exata demarcação da linha de água face à zona de implantação pretendida para a moradia T2.\n\nSolicito que me informem caso necessitem de mais algum elemento cadastral.\n\nCom os meus cumprimentos,\n\nFrancisco Vasconcelos",
                timestamp: "30 Mai, 17:40"
            }
        ]
    }
];

export const MOCK_LEADS: Lead[] = [
    {
        id: "lead-1",
        contactName: "João Silva",
        channel: "whatsapp",
        modelInterest: "T2",
        location: "Sintra",
        potentialValue: 199900,
        temperature: "hot",
        dateAdded: "30 Mai 2026",
        lastUpdated: "31 Mai 2026",
        stageId: "nova",
        notes: "Interessado no T2 Family em Sintra. Dúvidas sobre a resistência do telhado ao vento forte. Necessita de acompanhamento técnico presencial."
    },
    {
        id: "lead-2",
        contactName: "Cláudia Rodrigues",
        channel: "instagram",
        modelInterest: "T1",
        location: "Tavira",
        potentialValue: 149900,
        temperature: "warm",
        dateAdded: "29 Mai 2026",
        lastUpdated: "30 Mai 2026",
        stageId: "nova",
        notes: "Apaixonada pelos interiores Obsidian. Atualmente à procura de lotes no sotavento algarvio (Tavira) para avançar com o T1 Studio."
    },
    {
        id: "lead-3",
        contactName: "Francisco Vasconcelos",
        channel: "email",
        modelInterest: "T2",
        location: "Colares",
        potentialValue: 199900,
        temperature: "hot",
        dateAdded: "29 Mai 2026",
        lastUpdated: "30 Mai 2026",
        stageId: "nova",
        notes: "Engenheiro Civil. Enviou DWG do terreno com linha de água protegida (REN). Equipa técnica em análise geométrica para o T2."
    },
    {
        id: "lead-4",
        contactName: "Mariana Costa",
        channel: "website",
        modelInterest: "T1",
        location: "Mafra",
        potentialValue: 149900,
        temperature: "warm",
        dateAdded: "24 Mai 2026",
        lastUpdated: "26 Mai 2026",
        stageId: "contacto_feito",
        notes: "Teve chamada curta com o bot. Reconfirmou telefone. Focado no T1 Studio para habitação secundária em Mafra. Primeira abordagem comercial de esclarecimento efetuada."
    },
    {
        id: "lead-5",
        contactName: "Pedro Albuquerque",
        channel: "meta_ads",
        modelInterest: "T-Multi",
        location: "Comporta",
        potentialValue: 350000,
        temperature: "hot",
        dateAdded: "20 Mai 2026",
        lastUpdated: "25 Mai 2026",
        stageId: "qualificada",
        notes: "Investidor de alto gabarito. Quer o T-Multi expansível com 3 suites premium e piscina integrada em terreno de pinhal na Comporta. Orçamento validado superior a 350k€."
    },
    {
        id: "lead-6",
        contactName: "Diana Ferreira",
        channel: "whatsapp",
        modelInterest: "T2",
        location: "Melides",
        potentialValue: 199900,
        temperature: "hot",
        dateAdded: "18 Mai 2026",
        lastUpdated: "24 Mai 2026",
        stageId: "reuniao_agendada",
        notes: "Terreno plano e viável em Melides. Reunião agendada com o Pedro para fecho de pormenores e visualização 3D dos acabamentos no próximo sábado às 11h."
    },
    {
        id: "lead-7",
        contactName: "Carlos Costa",
        channel: "whatsapp",
        modelInterest: "T-Multi",
        location: "Odemira",
        potentialValue: 280000,
        temperature: "hot",
        dateAdded: "15 Mai 2026",
        lastUpdated: "23 Mai 2026",
        stageId: "reuniao_agendada",
        notes: "Reunião presencial agendada para terça-feira às 15:00. Solução off-grid integral necessária devido a terreno isolado no Alentejo profundo."
    },
    {
        id: "lead-8",
        contactName: "António Simões",
        channel: "website",
        modelInterest: "T2",
        location: "Braga",
        potentialValue: 199900,
        temperature: "warm",
        dateAdded: "12 Mai 2026",
        lastUpdated: "20 Mai 2026",
        stageId: "analise_viabilidade",
        notes: "O nosso arquiteto está a analisar o declive acentuado do terreno em encosta na zona rural de Braga para validar o método de micropilares."
    },
    {
        id: "lead-9",
        contactName: "Sofia Mendes",
        channel: "facebook",
        modelInterest: "T2",
        location: "Ponte de Lima",
        potentialValue: 199900,
        temperature: "warm",
        dateAdded: "14 Mai 2026",
        lastUpdated: "19 Mai 2026",
        stageId: "contacto_feito",
        notes: "Pediu simulação técnica de fusão de dois módulos T1 para criar uma planta única em Ponte de Lima. Contactado via Facebook Messenger."
    },
    {
        id: "lead-10",
        contactName: "Rita Barbosa",
        channel: "meta_ads",
        modelInterest: "T1",
        location: "Vila Nova de Milfontes",
        potentialValue: 149900,
        temperature: "hot",
        dateAdded: "10 Mai 2026",
        lastUpdated: "18 Mai 2026",
        stageId: "proposta_enviada",
        notes: "Proposta chave-na-mão total de 149.900€ enviada para moradia T1 Studio. Cliente muito recetiva, a aguardar apenas feedback da entidade bancária."
    },
    {
        id: "lead-11",
        contactName: "Miguel Soares",
        channel: "whatsapp",
        modelInterest: "T-Multi",
        location: "Gêres",
        potentialValue: 320000,
        temperature: "hot",
        dateAdded: "05 Mai 2026",
        lastUpdated: "15 Mai 2026",
        stageId: "reserva",
        notes: "Sinal de reserva de slot de fábrica (10.000€) devidamente pago. Terreno no Gêres com viabilidade aprovada. Início do fabrico de bio-estrutura programado para o próximo mês."
    },
    {
        id: "lead-12",
        contactName: "Helena Moreira",
        channel: "website",
        modelInterest: "T2",
        location: "Azeitão",
        potentialValue: 199900,
        temperature: "hot",
        dateAdded: "01 Mai 2026",
        lastUpdated: "14 Mai 2026",
        stageId: "contrato_fechado",
        notes: "Contrato assinado! Pagamento inicial concluído. A moradia T2 Family encontra-se em fase final de montagem em fábrica para entrega nas próximas 3 semanas."
    },
    {
        id: "lead-13",
        contactName: "Luís Ramos",
        channel: "whatsapp",
        modelInterest: "T1",
        location: "Peniche",
        potentialValue: 149900,
        temperature: "cold",
        dateAdded: "28 Abr 2026",
        lastUpdated: "10 Mai 2026",
        stageId: "perdida",
        notes: "Terreno em área sem viabilidade construtiva municipal (reserva agrícola protegida). Lead perdida para construção Al Durr. Sugerida a conversão para a equipa imobiliária para aquisição de novo lote."
    },
    {
        id: "lead-14",
        contactName: "Margarida Antunes",
        channel: "instagram",
        modelInterest: "T2",
        location: "Ericeira",
        potentialValue: 199900,
        temperature: "warm",
        dateAdded: "15 Mai 2026",
        lastUpdated: "22 Mai 2026",
        stageId: "analise_viabilidade",
        notes: "Licenciamento anterior arquivado no terreno. O nosso engenheiro está a estudar o levantamento topográfico para o T2 na Ericeira."
    },
    {
        id: "lead-15",
        contactName: "Duarte Fernandes",
        channel: "email",
        modelInterest: "T-Multi",
        location: "Castelo Branco",
        potentialValue: 240000,
        temperature: "warm",
        dateAdded: "10 Mai 2026",
        lastUpdated: "21 Mai 2026",
        stageId: "proposta_enviada",
        notes: "Proposta técnica detalhada com painéis solares reforçados enviada por email. A aguardar resposta sobre o cronograma de pagamentos."
    }
];
