import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Bangla
    return localStorage.getItem('language') || 'bn';
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en';
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
