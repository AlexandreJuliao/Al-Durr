export interface Message {
    id: string;
    sender: 'client' | 'bot' | 'human';
    senderName: string;
    content: string;
    timestamp: string;
    subject?: string; // For emails
}

export interface Conversation {
    id: string;
    contactName: string;
    contactAvatar?: string;
    channel: 'whatsapp' | 'instagram' | 'facebook' | 'email';
    status: 'waiting' | 'bot_responded' | 'active';
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: Message[];
    summary?: string; // What the bot understood
    phone?: string;
    emailAddress?: string;
    otherChannels?: ('whatsapp' | 'instagram' | 'facebook' | 'email')[];
    originalChannel: 'whatsapp' | 'instagram' | 'facebook' | 'email';
    tags: string[];
}

export interface Lead {
    id: string;
    contactName: string;
    contactAvatar?: string;
    channel: 'website' | 'meta_ads' | 'instagram' | 'facebook' | 'whatsapp' | 'email';
    modelInterest: 'T1' | 'T2' | 'T-Multi' | 'Indefinido';
    location?: string;
    potentialValue: number; // in EUR
    temperature: 'hot' | 'warm' | 'cold'; // hot = 🔥, warm = 🟡, cold = 🔵
    dateAdded: string;
    lastUpdated: string;
    stageId: string;
    notes?: string;
}

export interface PipelineStage {
    id: string;
    title: string;
}
