import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import i18n from '../i18n';

type LanguageType = 'zh' | 'en';

interface LanguageContextType {
  language: LanguageType;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>(
    (localStorage.getItem('i18nextLng') as LanguageType) || 'zh'
  );

  // 切换语言
  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // 初始化语言
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义 hook 用于访问语言上下文
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 