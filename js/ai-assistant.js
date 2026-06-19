// 正奇咨询AI助手组件 - 完整聊天功能
(function() {
  // ========== 配置区 ==========
  // 通义千问API配置
  const API_KEY = 'sk-88df006c6b7f44aea1cb03f747187fda';
  const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
  const MODEL = 'qwen-turbo';
  
  // 系统提示词 - 定义AI助手的角色和知识
  const SYSTEM_PROMPT = `你是正奇咨询的专业鞋业管理顾问助手。你的职责是帮助客户了解正奇咨询的服务：

核心服务：
• 精益制造1.0 - 基础管理标准化（5S、标准化作业、目视化管理）
• 敏捷制造2.0 - iMES智能系统（生产执行、数据采集、排程优化）
• 利润制造3.0 - 成本优化管理（BOM分析、工艺降本、质量成本控制）
• 物联制造4.0 - AI智能制造（设备联网、预测维护、智能排产）
• 商学培训5.0 - 团队能力提升（精益道场、实战训练、管理认证）

联系方式：+86 136 5699 9381
工作时间：周一至周五 9:00-18:00

回答要求：
1. 简洁专业，突出价值
2. 如需深入了解，引导客户联系顾问
3. 保持友好专业的语气`;

  // 聊天状态
  let chatOpen = false;
  let messages = [];
  let isLoading = false;

  // 创建AI助手按钮
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'ai-chat-button';
  button.setAttribute('aria-label', '打开咨询助手');
  button.innerHTML = `
    <svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="3" stroke="white" stroke-width="2"/>
      <circle cx="9" cy="12" r="1.5" fill="white"/>
      <circle cx="15" cy="12" r="1.5" fill="white"/>
      <path d="M10 16h4" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M12 2v2" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="2" r="1" fill="white"/>
    </svg>
  `;

  // 创建AI助手面板
  const panel = document.createElement('div');
  panel.className = 'ai-chat-panel';
  panel.style.display = 'none';
  panel.innerHTML = `
    <div class="ai-chat-header">
      <div>
        <h3 style="font-weight: 700; color: white; margin: 0;">正奇咨询助手</h3>
        <p style="font-size: 0.875rem; color: rgba(255,255,255,0.9); margin: 0.25rem 0 0 0;">专业鞋业管理顾问</p>
      </div>
      <button class="ai-close-btn" aria-label="关闭">&times;</button>
    </div>
    <div class="ai-chat-body" id="ai-chat-body">
      <div class="ai-message ai-message-system">
        <p style="font-size: 0.875rem; line-height: 1.6; color: #5d6d67; margin: 0;">
          您好！我是正奇咨询助手。<br><br>
          我可以帮您了解：<br>
          • 精益制造1.0 - 基础管理标准化<br>
          • 敏捷制造2.0 - iMES智能系统<br>
          • 利润制造3.0 - 成本优化管理<br>
          • 物联制造4.0 - AI智能制造<br>
          • 商学培训5.0 - 团队能力提升<br><br>
          请输入您的问题，我会尽力为您解答。
        </p>
      </div>
    </div>
    <div class="ai-chat-footer">
      <input
        type="text"
        class="ai-chat-input"
        placeholder="输入您的问题..."
      />
      <button class="ai-send-btn" aria-label="发送">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
        </svg>
      </button>
    </div>
  `;

  // 添加到页面
  document.body.appendChild(button);
  document.body.appendChild(panel);

  // 获取DOM元素
  const chatBody = panel.querySelector('#ai-chat-body');
  const chatInput = panel.querySelector('.ai-chat-input');
  const sendBtn = panel.querySelector('.ai-send-btn');

  // 切换面板显示
  button.addEventListener('click', function() {
    chatOpen = !chatOpen;
    panel.style.display = chatOpen ? 'flex' : 'none';
    if (chatOpen) {
      chatInput.focus();
    }
  });

  // 关闭按钮
  panel.querySelector('.ai-close-btn').addEventListener('click', function() {
    chatOpen = false;
    panel.style.display = 'none';
  });

  // 发送消息
  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    // 添加用户消息
    addMessage(text, 'user');
    chatInput.value = '';
    
    // 显示加载状态
    isLoading = true;
    sendBtn.disabled = true;
    const loadingMsg = addMessage('正在思考中...', 'assistant', true);

    try {
      // 通过CORS代理调用通义千问API
      const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(API_URL);
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      
      // 移除加载消息
      loadingMsg.remove();
      
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        addMessage(reply, 'assistant');
        messages.push({ role: 'assistant', content: reply });
      } else {
        addMessage('抱歉，暂时无法回答您的问题。请稍后重试或联系我们：+86 136 5699 9381', 'assistant');
      }
    } catch (error) {
      console.error('API调用错误:', error);
      loadingMsg.remove();
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        addMessage('网络连接出现问题，请检查网络后重试。', 'assistant');
      } else if (error.message.includes('401')) {
        addMessage('API Key无效，请检查配置。', 'assistant');
      } else {
        addMessage('服务暂时不可用，请稍后重试。', 'assistant');
      }
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
    }
  }

  // 添加消息到界面
  function addMessage(content, role, isLoading = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${role}`;
    
    if (isLoading) {
      messageDiv.classList.add('ai-loading');
    }

    const contentP = document.createElement('p');
    contentP.style.cssText = 'font-size: 0.875rem; line-height: 1.6; color: #5d6d67; margin: 0; white-space: pre-wrap;';
    contentP.textContent = content;
    
    messageDiv.appendChild(contentP);
    chatBody.appendChild(messageDiv);
    
    // 滚动到底部
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // 保存到消息历史
    if (!isLoading) {
      messages.push({ role, content });
    }
    
    return messageDiv;
  }

  // 事件监听
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .ai-chat-button {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 50;
      display: grid;
      place-items: center;
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 9999px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
      background: #14b8a6;
      color: white;
      border: none;
      cursor: pointer;
    }

    .ai-chat-button:hover {
      transform: translateY(-4px);
      background: #0d9488;
      box-shadow: 0 25px 30px -5px rgba(15, 118, 110, 0.3);
    }

    .ai-chat-button .h-7 {
      height: 1.75rem;
      width: 1.75rem;
    }

    @media (min-width: 768px) {
      .ai-chat-button {
        bottom: 2rem;
        right: 2rem;
      }
    }

    .ai-chat-panel {
      position: fixed;
      bottom: 6.5rem;
      right: 1.5rem;
      z-index: 50;
      width: 380px;
      max-width: calc(100vw - 3rem);
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      flex-direction: column;
      max-height: 600px;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (min-width: 768px) {
      .ai-chat-panel {
        bottom: 7.5rem;
        right: 2rem;
      }
    }

    .ai-chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
      color: white;
      border-radius: 1rem 1rem 0 0;
    }

    .ai-close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ai-close-btn:hover {
      opacity: 0.8;
    }

    .ai-chat-body {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ai-message {
      padding: 1rem;
      border-radius: 0.75rem;
      border-left: 3px solid #14b8a6;
      background: #f7faf8;
    }

    .ai-message-user {
      background: #e6f7f5;
      border-left: 3px solid #0d9488;
      margin-left: 2rem;
    }

    .ai-message-assistant {
      background: #f7faf8;
      border-left: 3px solid #14b8a6;
      margin-right: 2rem;
    }

    .ai-message-system {
      background: #f0f9ff;
      border-left: 3px solid #3b82f6;
      margin: 0;
    }

    .ai-loading {
      opacity: 0.7;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 0.4; }
    }

    .ai-chat-footer {
      display: flex;
      gap: 0.75rem;
      padding: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .ai-chat-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #d9e6df;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .ai-chat-input:focus {
      border-color: #14b8a6;
      box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.1);
    }

    .ai-send-btn {
      padding: 0.75rem 1.25rem;
      background: #14b8a6;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ai-send-btn:hover {
      background: #0d9488;
    }

    .ai-send-btn:disabled {
      background: #94a3b8;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
})();
