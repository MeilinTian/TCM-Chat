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
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  const showConfirmModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    // 关闭确认对话框
    setIsModalVisible(false);
    
    // 模拟API请求
    setIsLoading(true);
    
    // 模拟延迟后获取结果
    setTimeout(() => {
      const mockResult = `# 天麻钩藤颗粒治疗原发性高血压临床试验方案

## 1. 研究背景

原发性高血压是一种常见的慢性疾病，在中医理论中，阴上亢证型高血压与肝阳上亢、肝肾阴虚等病机相关。天麻钩藤颗粒是一种传统中药复方，具有平肝息风、清热平肝的功效，临床上常用于治疗肝阳上亢型高血压。厄贝沙坦是一种血管紧张素II受体拮抗剂，是西医治疗高血压的常用药物。

## 2. 研究目的

评估天麻钩藤颗粒单用及其与厄贝沙坦联合使用在治疗阴上亢证型原发性高血压患者中的有效性和安全性。

## 3. 研究设计

### 3.1 研究类型
随机、双盲、安慰剂对照、多中心临床试验

### 3.2 受试人群
- **纳入标准**：
  - 年龄：18-75岁
  - 符合原发性高血压诊断标准（收缩压≥140mmHg和/或舒张压≥90mmHg）
  - 中医辨证为阴上亢证型
  - 签署知情同意书

- **排除标准**：
  - 继发性高血压
  - 严重心、肝、肾功能不全
  - 妊娠或哺乳期妇女
  - 对试验药物过敏
  - 近1个月内参与其他临床试验

### 3.3 分组方案
受试者将被随机分配到以下5个组：
- 试验组1：天麻钩藤颗粒联合厄贝沙坦
- 试验组2：天麻钩藤颗粒联合厄贝沙坦安慰剂
- 试验组3：天麻钩藤颗粒安慰剂联合厄贝沙坦
- 对照组1：天麻钩藤颗粒单用
- 对照组2：厄贝沙坦单用

### 3.4 样本量
每组60例，共计300例，考虑到20%的脱落率，计划入组360例。

## 4. 干预措施

### 4.1 给药方案
- 天麻钩藤颗粒：每次1袋（5g），每日3次，饭后服用
- 天麻钩藤颗粒安慰剂：外观、气味与真药相似，用法用量同真药
- 厄贝沙坦：150mg，每日1次，晨起服用
- 厄贝沙坦安慰剂：外观与真药相似，用法用量同真药

### 4.2 干预时间
所有受试者接受4周的药物治疗。

## 5. 观察指标

### 5.1 主要终点指标
- 血压控制率（收缩压<140mmHg且舒张压<90mmHg）
- 血压下降幅度（与基线相比）

### 5.2 次要终点指标
- 中医证候积分变化
- 生活质量评分
- 不良反应发生率

## 6. 随访计划
治疗期结束后进行8周随访，每4周随访一次。

## 7. 统计分析
采用SPSS 25.0软件进行数据分析，计量资料以均数±标准差表示，组间比较采用t检验或方差分析；计数资料以百分比表示，组间比较采用χ²检验。P<0.05为差异有统计学意义。

## 8. 伦理考虑
本研究方案需经医学伦理委员会批准，所有受试者均需签署知情同意书。研究过程中严格保护受试者隐私。`;
      
      setResultText(mockResult);
      setIsLoading(false);
    }, 1500);
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
                loading={isLoading}
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
            <Text className="preview-title">{t('prompt.result')}</Text>
          </div>
          <div className="markdown-result">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>正在生成结果...</p>
              </div>
            ) : (
              resultText ? (
                <ReactMarkdown>
                  {resultText}
                </ReactMarkdown>
              ) : (
                <div className="empty-result">
                  <p>点击"发送"按钮生成结果</p>
                </div>
              )
            )}
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