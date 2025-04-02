import { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { SendOutlined, BulbOutlined, ThunderboltOutlined, SunOutlined, MoonOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';

const { Title, Text } = Typography;

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-placeholder"></div>
        </div>
        <Button 
          type="default" 
          className="new-chat-button" 
          icon={<span>+</span>}
        >
          {t('sidebar.newChat')}
        </Button>
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
        <Title level={2} className="app-title">{t('common.appName')}</Title>
        
        <div className="features-container">
          <div className="feature-section">
            <div className="feature-header">
              <BulbOutlined className="feature-icon" />
              <Text className="feature-title">{t('home.tcmExamples')}</Text>
            </div>
            
            <div className="feature-cards">
              <div className="feature-card">
                <Text>{t('examples.tcmKnowledge')} →</Text>
              </div>
              <div className="feature-card">
                <Text>{t('examples.smartRecommendation')} →</Text>
              </div>
              <div className="feature-card">
                <Text>{t('examples.medicalCase')} →</Text>
              </div>
              <div className="feature-card">
                <Text>{t('examples.entityExtraction')} →</Text>
              </div>
              <div className="feature-card">
                <Text>{t('examples.admetPrediction')} →</Text>
              </div>
            </div>
          </div>
          
          <div className="feature-section">
            <div className="feature-header">
              <ThunderboltOutlined className="feature-icon" />
              <Text className="feature-title">{t('home.ability')}</Text>
            </div>
            
            <div className="feature-cards">
              <div className="feature-card">
                <Text>{t('abilities.herbsInfo')}</Text>
              </div>
              <div className="feature-card">
                <Text>{t('abilities.rememberConversations')}</Text>
              </div>
              <div className="feature-card">
                <Text>{t('abilities.allowCorrections')}</Text>
              </div>
            </div>
          </div>
        </div>
        
        <div className="input-container">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('home.inputMessage')}
            className="chat-input"
            suffix={
              <Button 
                type="text" 
                icon={<SendOutlined />} 
                className="send-button"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home; 