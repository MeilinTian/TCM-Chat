import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import CharacterSettings from '../components/CharacterSettings';
import '../styles/Chat.css';

const { Text } = Typography;

const Chat: React.FC = () => {
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const initialMessage = searchParams.get('message') || '';
  const [inputValue, setInputValue] = useState('');
  const [showSettings, setShowSettings] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // 如果有初始消息，可以在这里处理
    if (initialMessage) {
      // 这里可以添加发送初始消息的逻辑
      console.log('Initial message:', initialMessage);
    }
  }, [initialMessage]);

  const handleCloseSettings = () => {
    // 如果不是新聊天，才允许关闭设置面板
    if (chatId !== 'new') {
      setShowSettings(false);
    } else {
      // 如果是新聊天但尝试关闭设置，则返回主页
      navigate('/');
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // 这里添加发送消息的逻辑
      console.log('Sending message:', inputValue);
      setInputValue('');
    }
  };

  console.log('Chat chatId:', chatId);
  console.log('Chat showSettings:', showSettings);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-messages">
          {/* 这里将来会显示聊天消息 */}
          <div className="empty-chat-message">
            <Text>{t('chat.startNewConversation')}</Text>
          </div>
        </div>
        
        <div className="input-container">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('home.inputMessage')}
            className="chat-input"
            onPressEnter={handleSendMessage}
            suffix={
              <Button 
                type="text" 
                icon={<SendOutlined />} 
                className="send-button"
                onClick={handleSendMessage}
              />
            }
          />
        </div>
      </div>
      
      <CharacterSettings 
        visible={showSettings}
        onClose={handleCloseSettings}
        isNewChat={chatId === 'new'} 
      />
    </div>
  );
};

export default Chat; 