import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import '../styles/CharacterSettings.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CharacterSettings: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const { t } = useTranslation();
  const [tempTitle, setTempTitle] = useState('');

  return (
    <div className="character-settings-container">
      <div className="settings-header">
        <Title level={4}>{t('settings.title')}</Title>
        <Button type="text" icon={<span>✕</span>} className="close-button" onClick={onClose} />
      </div>

      <div className="settings-content">
        <div className="prompt-section">
          <Text className="section-title">{t('settings.promptTitle')}</Text>
          <TextArea
            placeholder={t('settings.promptPlaceholder')}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            autoSize={{ minRows: 4, maxRows: 8 }}
            className="prompt-input"
          />
        </div>

        <div className="conversation-title-section">
          <Text className="section-title">{t('settings.conversationTitle')}</Text>
          <div className="title-input-container">
            <Input
              placeholder={t('settings.titlePlaceholder')}
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="title-input"
            />
            <Button type="primary">{t('settings.saveTitle')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSettings; 