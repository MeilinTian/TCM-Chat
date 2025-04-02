import { ConfigProvider, theme as antdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import Home from './pages/Home';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './i18n';
import './App.css';

// 包装组件，使用主题和语言
const AppContent = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <ConfigProvider 
      locale={language === 'zh' ? zhCN : enUS}
      theme={{
        algorithm: theme === 'dark' 
          ? antdTheme.darkAlgorithm 
          : antdTheme.defaultAlgorithm,
        token: {
          // 自定义主题令牌
          colorPrimary: '#1677ff',
          colorText: theme === 'dark' ? '#ddd' : '#333',
          colorTextSecondary: theme === 'dark' ? '#aaa' : '#666',
          colorBgContainer: theme === 'dark' ? '#343540' : '#fff',
        },
        components: {
          Button: {
            defaultBg: 'transparent',
            defaultBorderColor: theme === 'light' ? '#9baab0' : '#555',
            defaultHoverBg: theme === 'light' ? '#bccdd6' : 'rgba(255, 255, 255, 0.1)',
            defaultActiveBg: theme === 'light' ? '#a8bbc5' : 'rgba(255, 255, 255, 0.2)',
            defaultColor: theme === 'dark' ? '#ddd' : '#333',
          },
        },
      }}
    >
      <Home />
    </ConfigProvider>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
