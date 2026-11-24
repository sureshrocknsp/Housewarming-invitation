import React, { createContext, useContext, useState, useEffect } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 'TE' (Telugu), 'EN' (English), 'BOTH' (Bilingual)
  const defaultLangSetting = (gruhapravesamConfig.settings?.defaultLanguage || 'te').toUpperCase();
  const [language, setLanguage] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('gruhapravesam_lang') || defaultLangSetting;
      }
    } catch (e) {
      console.warn('localStorage read warning:', e);
    }
    return defaultLangSetting;
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('gruhapravesam_lang', language);
      }
    } catch (e) {
      console.warn('localStorage write warning:', e);
    }
  }, [language]);

  /**
   * Safe getter for centralized translations dictionary
   * @param {string} path - dot-separated path, e.g. 'nav.entrance', 'countdown.days'
   */
  const tr = (path) => {
    const langKey = language === 'EN' ? 'en' : 'te';
    const parts = path.split('.');
    let current = gruhapravesamConfig.translations[langKey];
    for (const part of parts) {
      if (!current || current[part] === undefined) {
        // Fallback to english if not found
        let fallback = gruhapravesamConfig.translations['en'];
        for (const fPart of parts) {
          if (!fallback || fallback[fPart] === undefined) return path;
          fallback = fallback[fPart];
        }
        return fallback;
      }
      current = current[part];
    }
    return current;
  };

  /**
   * Helper to return appropriate string based on language mode
   */
  const getLocalized = (teluguText, englishText) => {
    if (language === 'TE') return teluguText || englishText;
    if (language === 'EN') return englishText || teluguText;
    return { telugu: teluguText, english: englishText };
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
