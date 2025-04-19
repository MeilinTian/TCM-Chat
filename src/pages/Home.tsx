import { useState, useRef, useEffect } from 'react';
import { Button, Input, Typography, Avatar } from 'antd';
import { SendOutlined, BulbOutlined, ThunderboltOutlined, SunOutlined, MoonOutlined, GlobalOutlined, SettingOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import CharacterSettings from '../components/CharacterSettings';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;

// 定义消息类型
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatMode, setIsChatMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleFeatureCardClick = (cardType: string) => {
    setInputValue(t(`inputExamples.${cardType}`));
  };

  const handlePromptSettings = () => {
    navigate('/prompt');
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // 创建用户消息
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        isUser: true,
        timestamp: new Date()
      };

      // 添加到消息列表
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // 清空输入框
      setInputValue('');
      
      // 切换到聊天模式
      setIsChatMode(true);
      
      // 模拟AI回复
      setTimeout(() => {
        // TCM相关的模拟回复
        const botResponses = [
          "根据传统中医理论，您描述的症状可能与肝气郁结有关。建议尝试疏肝理气的中药方剂，如柴胡疏肝散。",
          "您好，中医认为这种情况可能是脾胃虚弱导致的。建议可以适当服用健脾和胃的中药，如参苓白术散。",
          "从中医角度看，这些症状可能与肾阴虚有关。可以考虑滋补肾阴的中药，如六味地黄丸。",
          "您的情况似乎是风寒感冒的典型症状。传统中医推荐使用荆防败毒散或桑菊感冒片来缓解症状。",
          "中医讲究'以人为本'，您的体质偏向湿热，可以考虑使用清热利湿的中药调理，如龙胆泻肝汤。",
          "根据您的描述，这可能是气血两虚的表现。中医上常用八珍汤来调补气血，您可以咨询医师后尝试。",
          "经络不通可能导致您提到的这些症状，建议可以考虑艾灸或针灸等治疗方法来疏通经络。",
          "桂枝茯苓丸是一个很好的选择，它主要用于活血化瘀，对于您提到的症状可能有一定缓解作用。"
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botMessage: Message = {
          id: Date.now().toString(),
          content: randomResponse,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

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
          onClick={() => {
            setMessages([]);
            setIsChatMode(false);
            setInputValue('');
            setShowSettings(false);
          }}
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
          <div className="sidebar-item" onClick={handlePromptSettings}>
            <SettingOutlined style={{ marginRight: '8px' }} />
            <span>{t('sidebar.promptSettings')}</span>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        {!isChatMode ? (
          <>
            <Title level={2} className="app-title">{t('common.appName')}</Title>
            
            <div className="features-container">
              <div className="feature-section">
                <div className="feature-header">
                  <BulbOutlined className="feature-icon" />
                  <Text className="feature-title">{t('home.tcmExamples')}</Text>
                </div>
                
                <div className="feature-cards">
                  <div className="feature-card" onClick={() => handleFeatureCardClick('tcmKnowledge')}>
                    <Text>{t('examples.tcmKnowledge')} →</Text>
                  </div>
                  <div className="feature-card" onClick={() => handleFeatureCardClick('smartRecommendation')}>
                    <Text>{t('examples.smartRecommendation')} →</Text>
                  </div>
                  <div className="feature-card" onClick={() => handleFeatureCardClick('medicalCase')}>
                    <Text>{t('examples.medicalCase')} →</Text>
                  </div>
                  <div className="feature-card" onClick={() => handleFeatureCardClick('entityExtraction')}>
                    <Text>{t('examples.entityExtraction')} →</Text>
                  </div>
                  <div className="feature-card" onClick={() => handleFeatureCardClick('admetPrediction')}>
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
              <div className="textarea-with-icon">
                <TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('home.inputMessage')}
                  className="chat-input"
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <SendOutlined 
                  className="send-icon"
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="chat-container">
            <div className="chat-messages">
              {messages.length > 0 ? (
                <>
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message-container ${message.isUser ? 'user-message' : 'bot-message'}`}
                    >
                      <div className="message-avatar">
                        {message.isUser ? (
                          <Avatar icon={<UserOutlined />} />
                        ) : (
                          <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1677ff' }} />
                        )}
                      </div>
                      <div className="message-content">
                        <div className="message-bubble">
                          {message.content}
                        </div>
                        <div className="message-time">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="empty-chat-message">
                  <Text>{t('chat.startNewConversation')}</Text>
                </div>
              )}
            </div>
            
            <div className="input-container">
              <div className="textarea-with-icon">
                <TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('home.inputMessage')}
                  className="chat-input"
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <SendOutlined 
                  className="send-icon"
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showSettings && (
        <div className="settings-panel">
          <CharacterSettings onClose={handleCloseSettings} />
        </div>
      )}
    </div>
  );
};

export default Home; 