import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import '../styles/MainLayout.css';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  messageCount: number;
}

const MainLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // 模拟聊天会话列表
  const [chatSessions] = useState<ChatSession[]>([
    { id: '1', title: "解决机会消失", date: '2025/2/27 13:52:09', messageCount: 2 },
    { id: '2', title: "泰勒展开估计π", date: '2025/2/18 17:29:56', messageCount: 2 },
    { id: '3', title: "AI提升效率", date: '2024/12/24 10:50:05', messageCount: 6 },
    { id: '4', title: "市场营销策略", date: '2024/12/24 09:17:15', messageCount: 2 },
    { id: '5', title: "案例库需求文档", date: '2024/12/13 11:19:19', messageCount: 2 },
  ]);

  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-placeholder">
            <span className="logo-text">GPT专业版</span>
          </div>
        </div>
        
        <Button 
          type="default" 
          className="new-chat-button" 
          icon={<span>+</span>}
          onClick={() => navigate('/chat/new')}
        >
          {t('sidebar.newChat')}
        </Button>
        
        <div className="chat-history">
          {chatSessions.map(chat => (
            <div 
              key={chat.id} 
              className="chat-history-item"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <div className="chat-history-title">{chat.title}</div>
              <div className="chat-history-meta">
                <span>{chat.messageCount} 条对话</span>
                <span>{chat.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="sidebar-bottom">
          <div className="sidebar-item" onClick={toggleLanguage}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            <span>{t('sidebar.language')}</span>
          </div>
          <div className="sidebar-item" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <MoonOutlined style={{ marginRight: '8px' }} />
                <span>{t('sidebar.darkMode')}</span>
              </>
            ) : (
              <>
                <SunOutlined style={{ marginRight: '8px' }} />
                <span>{t('sidebar.lightMode')}</span>
              </>
            )}
          </div>
          <div className="sidebar-item">
            <span>{t('sidebar.aboutUs')}</span>
          </div>
          <div className="sidebar-item">
            <span>{t('sidebar.updateFAQ')}</span>
          </div>
          <div className="sidebar-item">
            <span>{t('sidebar.statistics')}</span>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout; 