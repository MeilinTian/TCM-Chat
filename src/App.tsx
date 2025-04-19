import { ConfigProvider, theme as antdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import Home from './pages/Home';
import Prompt from './pages/Prompt';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './i18n';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
          colorLink: '#1677ff',
          colorInfo: '#1677ff',
          colorSuccess: '#52c41a',
          colorWarning: '#1677ff',  // 将警告色也改为蓝色系
          colorError: '#ff4d4f',
          colorText: theme === 'dark' ? '#ddd' : '#333',
          colorTextSecondary: theme === 'dark' ? '#aaa' : '#666',
          colorBgContainer: theme === 'dark' ? '#343540' : '#fff',
        },
        components: {
          Button: {
            defaultBg: 'transparent',
            defaultBorderColor: theme === 'light' ? '#9baab0' : '#555',
            defaultHoverBg: theme === 'light' ? '#e6f4ff' : 'rgba(22, 119, 255, 0.1)',
            defaultActiveBg: theme === 'light' ? '#bae0ff' : 'rgba(22, 119, 255, 0.2)',
            defaultColor: theme === 'dark' ? '#ddd' : '#333',
            colorPrimary: '#1677ff',
            colorPrimaryHover: '#4096ff',
            colorPrimaryActive: '#0958d9',
          },
          Input: {
            activeBorderColor: '#1677ff',
            hoverBorderColor: '#4096ff',
            addonBg: '#e6f4ff',
          },
          Select: {
            optionSelectedBg: '#e6f4ff',
            optionActiveBg: '#e6f4ff',
          },
          Checkbox: {
            colorPrimary: '#1677ff',
          },
          Modal: {
            titleColor: theme === 'dark' ? '#ddd' : '#333',
            contentBg: theme === 'dark' ? '#343540' : '#fff',
            headerBg: theme === 'dark' ? '#343540' : '#fff',
          }
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompt" element={<Prompt />} />
        </Routes>
      </Router>
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
