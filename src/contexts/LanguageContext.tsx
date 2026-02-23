import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es' | 'ja';

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        'nav.home': 'Home',
        'nav.discover': 'Discover',
        'nav.marketplace': 'Marketplace',
        'nav.arExperience': 'AR Experience',
        'nav.events': 'Events',
        'nav.classes': 'Classes',
        'hero.title': 'Discover & Collect Extraordinary Art',
        'hero.subtitle': 'Explore our curated collection of contemporary artworks. Experience pieces in your own space with our cutting-edge AR technology.',
        'hero.explore': 'Explore Gallery',
        'hero.ar': 'Try AR Experience',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.discover': 'Découvrir',
        'nav.marketplace': 'Marché',
        'nav.arExperience': 'Expérience RA',
        'nav.events': 'Événements',
        'nav.classes': 'Cours',
        'hero.title': 'Découvrez & Collectionnez de l\'Art Extraordinaire',
        'hero.subtitle': 'Explorez notre collection d\'œuvres contemporaines. Découvrez des pièces dans votre espace grâce à notre technologie de Réalité Augmentée.',
        'hero.explore': 'Explorer la Galerie',
        'hero.ar': 'Essayer l\'Expérience RA',
    },
    es: {
        'nav.home': 'Inicio',
        'nav.discover': 'Descubrir',
        'nav.marketplace': 'Mercado',
        'nav.arExperience': 'Experiencia RA',
        'nav.events': 'Eventos',
        'nav.classes': 'Clases',
        'hero.title': 'Descubre y Colecciona Arte Extraordinario',
        'hero.subtitle': 'Explora nuestra colección curada de obras contemporáneas. Experimenta piezas en tu propio espacio con nuestra tecnología de Realidad Aumentada.',
        'hero.explore': 'Explorar Galería',
        'hero.ar': 'Probar Experiencia RA',
    },
    ja: {
        'nav.home': 'ホーム',
        'nav.discover': '発見',
        'nav.marketplace': 'マーケットプレイス',
        'nav.arExperience': 'AR体験',
        'nav.events': 'イベント',
        'nav.classes': 'クラス',
        'hero.title': '素晴らしいアートを発見して収集する',
        'hero.subtitle': '厳選された現代アートのコレクションをご覧ください。最先端のARテクノロジーであなたの空間で作品を体験してください。',
        'hero.explore': 'ギャラリーを見る',
        'hero.ar': 'AR体験を試す',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
