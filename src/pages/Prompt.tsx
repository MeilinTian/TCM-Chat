import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Input, Typography, Divider } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';
import '../styles/Prompt.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

const Prompt: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [promptText, setPromptText] = useState('请生成一份天麻钩藤颗粒治疗原发性高血压的临床试验方案。\n受试人群的中医证型为阴上亢。\n试验组1: 天麻钩藤颗粒联合厄贝沙坦。\n试验组2: 天麻钩藤颗粒联合厄贝沙坦安慰剂。\n试验组3: 天麻钩藤颗粒安慰剂联合厄贝沙坦。\n对照组1: 天麻钩藤颗粒单用。\n对照组2: 厄贝沙坦单用。\n干预时间: 4周。\n随访时间: 8周，4周一访视。');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  const showConfirmModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    // 这里可以处理确认逻辑
    setIsModalVisible(false);
    // 可以添加成功提示或其他操作
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
        <Title level={3}>{t('prompt.title')}</Title>
      </div>
      
      <div className="prompt-content-wrapper">
        <div className="prompt-left-panel">
          <div className="prompt-input-section">
            <Text className="section-title">{t('prompt.instructions')}</Text>
            <TextArea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder={t('prompt.placeholder')}
              autoSize={{ minRows: 10, maxRows: 20 }}
              className="prompt-textarea"
            />
            <div className="prompt-actions">
              <Button 
                type="primary" 
                onClick={showConfirmModal}
                icon={<SendOutlined />}
                className="send-button"
              >
                {t('prompt.send')}
              </Button>
            </div>
          </div>
          
          <Divider className="prompt-divider" />
          
          <div className="prompt-examples-section">
            <Text className="section-title">{t('prompt.examplesTitle')}</Text>
            <div className="example-buttons">
              <Button 
                className="example-button" 
                onClick={() => setPromptText('请生成一份天麻钩藤颗粒治疗原发性高血压的临床试验方案。\n受试人群的中医证型为阴上亢。\n试验组1: 天麻钩藤颗粒联合厄贝沙坦。\n试验组2: 天麻钩藤颗粒联合厄贝沙坦安慰剂。\n试验组3: 天麻钩藤颗粒安慰剂联合厄贝沙坦。\n对照组1: 天麻钩藤颗粒单用。\n对照组2: 厄贝沙坦单用。\n干预时间: 4周。\n随访时间: 8周，4周一访视。')}
              >
                高血压临床试验
              </Button>
              <Button 
                className="example-button" 
                onClick={() => setPromptText('请生成一份中药治疗糖尿病的临床研究方案。\n受试人群：2型糖尿病患者，中医辨证为气阴两虚型。\n试验组：黄芪桂枝五物汤加减。\n对照组：二甲双胍。\n疗程：12周。\n主要观察指标：空腹血糖、餐后2小时血糖、糖化血红蛋白。')}
              >
                糖尿病临床研究
              </Button>
              <Button 
                className="example-button" 
                onClick={() => setPromptText('请设计一个中药复方治疗失眠的临床试验方案。\n受试人群：原发性失眠患者，中医辨证为心脾两虚型。\n试验组：酸枣仁汤加减。\n对照组：艾司唑仑片。\n疗程：4周。\n随访：治疗结束后随访8周。\n评价指标：匹兹堡睡眠质量指数(PSQI)、中医症状积分、不良反应发生率。')}
              >
                失眠临床试验
              </Button>
            </div>
          </div>
        </div>
        
        <div className="prompt-right-panel">
          <div className="preview-header">
            <Text className="preview-title">{t('prompt.preview')}</Text>
          </div>
          <div className="markdown-preview">
            <ReactMarkdown>
              {promptText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
      <Modal
        title={t('prompt.confirmTitle')}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText={t('prompt.ok')}
        cancelText={t('prompt.cancel')}
        className={`prompt-modal ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
      >
        <p>{t('prompt.confirmMessage')}</p>
        <div className="modal-content">
          {promptText}
        </div>
      </Modal>
    </div>
  );
};

export default Prompt; 