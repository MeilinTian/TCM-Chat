import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Prompt.css';

const Prompt: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`prompt-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <div className="prompt-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="back-button"
        />
        <h1>{t('prompt.title')}</h1>
      </div>
      <div className="prompt-content">
        {/* 这里可以添加prompt调节的内容 */}
      </div>
    </div>
  );
};

export default Prompt; 