const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// 千问API配置
const QIANWEN_API_KEY = process.env.QIANWEN_API_KEY || 'sk-88df006c6b7f44aea1cb03f747187fda';
const QIANWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 系统提示词 - 正奇咨询助手
const SYSTEM_PROMPT = `你是正奇咨询的AI助手，专注于鞋业制造管理咨询。你的知识包括：
1. 精益制造1.0 - 基础管理标准化
2. 敏捷制造2.0 - iMES智能系统
3. 利润制造3.0 - 成本优化管理
4. 物联制造4.0 - AI智能制造
5. 商学培训5.0 - 团队能力提升

你擅长帮助鞋厂老板和管理团队解决以下问题：
- 交付不稳：订单计划、物料齐套、产线节拍、异常响应
- 效率波动：瓶颈工序识别、班组指标管理
- 成本看不清：返工、损耗、报价、库存、利润分析
- 团队难协同：负责人、时间表、复盘节点、检查标准

请用专业但易懂的语言回答问题，必要时建议客户联系正奇咨询进行现场调研。
联系方式：Mobile: +86 136 5699 9381, Wechat: KW464212148`;

// 聊天API端点
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: '消息格式错误' });
    }

    // 准备API请求
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    const response = await fetch(QIANWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QIANWEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('千问API错误:', errorData);
      return res.status(500).json({ error: 'AI服务暂时不可用，请稍后重试' });
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      res.json({ reply });
    } else {
      res.status(500).json({ error: 'AI服务返回异常' });
    }
  } catch (error) {
    console.error('聊天API错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器（本地开发）
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`正奇咨询网站服务器运行在 http://localhost:${PORT}`);
  });
}

// Vercel Serverless 导出
module.exports = app;
