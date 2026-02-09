"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations, Locale } from "@/lib/constants";

type LanguageContextType = {
    locale: Locale;
    t: typeof translations.pt;
    switchLanguage: (lang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>("pt");

    const switchLanguage = (lang: Locale) => {
        setLocale(lang);
    };

    return (
        <LanguageContext.Provider value={{ locale, t: translations[locale], switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
