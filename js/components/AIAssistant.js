export default {
  name: 'AIAssistant',
  data() {
    return {
      isOpen: false,
      message: '',
      messages: [],
      isTyping: false,
      streamingContent: '',
      abortController: null,
      quickQuestions: [
        '交期经常延期，应该先查哪里？',
        '效率波动大，适合做哪类诊断？',
        '成本压力明显，沟通前需要准备什么？'
      ]
    };
  },

  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    streamingContent() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },

  methods: {
    scrollToBottom() {
      const chatEnd = this.$refs.chatEnd;
      if (chatEnd) {
        chatEnd.scrollIntoView({ behavior: 'smooth' });
      }
    },

    async handleSend(preset) {
      const text = (preset || this.message).trim();
      if (!text || this.isTyping) return;

      const userMessage = { role: 'user', content: text };
      this.messages.push(userMessage);
      this.message = '';
      this.isTyping = true;
      this.streamingContent = '';

      const systemPrompt = \`你是莆田正奇鞋业咨询的网站咨询助手。

公司定位：面向鞋厂老板、经营管理团队和鞋类品牌客户，提供现场诊断、改善方案、陪跑落地和经营复盘服务。
服务范围：交付改善、效率改善、品质稳定、成本复盘、库存周转、团队协作和数字化管理建议。
回答要求：使用中文，专业克制，先给判断路径，不夸大承诺。无法确认的信息，引导用户留下联系方式由顾问进一步沟通。\`;

      try {
        this.abortController = new AbortController();
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'system', content: systemPrompt }, ...this.messages]
          }),
          signal: this.abortController.signal
        });

        if (!response.ok) throw new Error('咨询助手暂时无法连接');

        const reader = response.body?.getReader();
        if (!reader) throw new Error('无法读取响应');

        let fullContent = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const textChunk = new TextDecoder().decode(value);
          const lines = textChunk.split('\\n').filter((line) => line.startsWith('data:'));
          for (const line of lines) {
            const data = line.replace('data:', '').trim();
            if (!data || data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullContent += content;
                this.streamingContent = fullContent;
              }
            } catch {
              continue;
            }
          }
        }

        this.messages.push({
          role: 'assistant',
          content: fullContent || '已收到，我建议先留下联系方式，由顾问进一步判断。'
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          this.messages.push({
            role: 'assistant',
            content: '抱歉，当前无法完成回复。你可以直接联系顾问：400-XXX-XXXX / contact@zhengqi-shoe.com。'
          });
        }
      } finally {
        this.isTyping = false;
        this.streamingContent = '';
        this.abortController = null;
      }
    },

    handleStop() {
      if (this.abortController) {
        this.abortController.abort();
      }
      if (this.streamingContent) {
        this.messages.push({ role: 'assistant', content: this.streamingContent });
        this.streamingContent = '';
      }
      this.isTyping = false;
    },

    handleKeyDown(event) {
      if (event.key === 'Enter') {
        this.handleSend();
      }
    }
  },

  template: \`
    <div>
      <button
        type="button"
        @click="isOpen = !isOpen"
        :class="[
          'fixed z-50 grid h-14 w-14 place-items-center rounded-full shadow-2xl transition',
          isOpen ? 'bg-[#17231f] text-white' : 'bg-[#14b8a6] text-white hover:-translate-y-1 hover:bg-[#0d9488]'
        ]"
        style="bottom: 1.5rem; right: 1.5rem;"
        :aria-label="isOpen ? '关闭咨询助手' : '打开咨询助手'"
      >
        <span v-if="isOpen" style="font-size: 1.5rem; line-height: 1;">×</span>
        <svg v-else viewBox="0 0 48 48" style="height: 1.75rem; width: 1.75rem;" fill="none" aria-hidden="true">
          <path d="M10 12h28v23H10z" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
          <path d="M16 19h16M16 26h10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          <path d="m31 31 7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
      </button>

      <section
        v-if="isOpen"
        style="position: fixed; bottom: 6rem; right: 1rem; z-index: 50; display: flex; flex-direction: column; overflow: hidden; border-radius: 0.5rem; border: 1px solid #d9e6df; background: white; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25); height: 560px; width: calc(100vw - 2rem); max-width: 400px;"
      >
        <header style="background: #14b8a6; padding: 1.25rem; color: white;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="display: grid; place-items: center; height: 2.5rem; width: 2.5rem; border-radius: 0.5rem; background: rgba(255, 255, 255, 0.15);">
              <svg viewBox="0 0 48 48" style="height: 1.75rem; width: 1.75rem;" fill="none">
                <path d="M10 12h28v23H10z" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
                <path d="M16 19h16M16 26h10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                <path d="m31 31 7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
            </span>
            <div>
              <h2 style="font-size: 1.125rem; font-weight: 900;">正奇咨询助手</h2>
              <p style="font-size: 0.75rem; color: rgb(204, 251, 241);">鞋厂管理改善初步沟通</p>
            </div>
          </div>
        </header>

        <div style="flex: 1; overflow-y: auto; background: #f7faf8; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div v-if="messages.length === 0 && !streamingContent" style="padding-block: 1rem;">
            <h3 style="text-align: center; font-size: 1.25rem; font-weight: 900; color: #17231f;">先描述一个现场问题</h3>
            <p style="margin: 0.5rem auto 0; max-width: 20rem; text-align: center; font-size: 0.875rem; line-height: 1.5; color: #5d6d67;">
              我可以帮你初步拆解交期、效率、品质、成本和团队协作相关问题。
            </p>
            <div style="margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <button
                v-for="question in quickQuestions"
                :key="question"
                type="button"
                @click="handleSend(question)"
                style="width: 100%; border-radius: 0.5rem; border: 1px solid #d9e6df; background: white; padding: 0.75rem 1rem; text-align: left; font-size: 0.875rem; font-weight: 600; color: #31423d; transition: all 0.2s;"
                @mouseenter="$event.target.style.borderColor = '#14b8a6'; $event.target.style.color = '#14b8a6';"
                @mouseleave="$event.target.style.borderColor = '#d9e6df'; $event.target.style.color = '#31423d';"
              >
                {{ question }}
              </button>
            </div>
          </div>

          <div
            v-for="(msg, index) in messages"
            :key="\`\${msg.role}-\${index}\`"
            :style="{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }"
          >
            <div
              :style="{
                maxWidth: '85%',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                lineHeight: '1.75',
                background: msg.role === 'user' ? '#14b8a6' : 'white',
                color: msg.role === 'user' ? 'white' : '#31423d',
                border: msg.role === 'user' ? 'none' : '1px solid #d9e6df'
              }"
            >
              <div style="white-space: pre-wrap;">{{ msg.content }}</div>
            </div>
          </div>

          <div v-if="streamingContent" style="display: flex; justify-content: flex-start;">
            <div style="max-width: 85%; border-radius: 0.5rem; border: 1px solid #d9e6df; background: white; padding: 0.75rem 1rem; font-size: 0.875rem; line-height: 1.75; color: #31423d;">
              {{ streamingContent }}
              <span style="display: inline-block; margin-left: 0.25rem; height: 1rem; width: 2px; background: #14b8a6; vertical-align: middle; animation: pulse 1s infinite;"></span>
            </div>
          </div>
          <div ref="chatEnd"></div>
        </div>

        <footer style="border-top: 1px solid #d9e6df; background: white; padding: 1rem;">
          <button
            v-if="isTyping"
            type="button"
            @click="handleStop"
            style="margin-bottom: 0.5rem; width: 100%; border-radius: 0.5rem; background: rgb(254, 226, 226); padding: 0.5rem; font-size: 0.875rem; font-weight: 700; color: rgb(185, 28, 28);"
          >
            停止生成
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <input
              v-model="message"
              @keydown="handleKeyDown"
              :disabled="isTyping"
              :placeholder="isTyping ? '正在分析...' : '输入你的问题...'"
              style="min-width: 0; flex: 1; border-radius: 0.5rem; border: 1px solid #d9e6df; padding: 0.75rem; font-size: 0.875rem;"
            />
            <button
              type="button"
              @click="handleSend()"
              :disabled="!message.trim() || isTyping"
              style="border-radius: 0.5rem; background: #14b8a6; padding: 0 1rem; font-size: 0.875rem; font-weight: 900; color: white;"
              :style="{
                cursor: (!message.trim() || isTyping) ? 'not-allowed' : 'pointer',
                opacity: (!message.trim() || isTyping) ? '0.5' : '1'
              }"
            >
              发送
            </button>
          </div>
        </footer>
      </section>

      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (min-width: 768px) {
          button[aria-label] {
            bottom: 2rem;
            right: 2rem;
          }
          section {
            right: 2rem;
          }
        }
      </style>
    </div>
  \`
};
