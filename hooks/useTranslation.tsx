import { useState, useEffect, createContext, useContext } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, hi } from '@/localization';

// Available languages
const translations = {
  en,
  hi
};

// Create the translation context
const TranslationContext = createContext<{
  t: (key: string, options?: object) => string;
  locale: string;
  setLocale: (locale: string) => void;
}>({
  t: () => '',
  locale: 'en',
  setLocale: () => {},
});

// Initialize i18n
const i18n = new I18n(translations);

// Set the default locale
i18n.locale = Localization.locale.split('-')[0];
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Translation provider component
export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState(i18n.locale);

  useEffect(() => {
    // Update i18n locale when state changes
    i18n.locale = locale;
  }, [locale]);

  // Translation function
  const t = (key: string, options?: object) => {
    return i18n.t(key, options);
  };

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook to use translation
export const useTranslation = () => useContext(TranslationContext);