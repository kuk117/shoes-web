import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

os.chdir(r"D:\agent\vue-shoe-website")

# AI助手组件HTML
ai_widget = '''
    <!-- AI 咨询助手浮动按钮 -->
    <button
      type="button"
      @click="chatOpen = !chatOpen"
      class="ai-chat-button"
      aria-label="打开咨询助手">
      <svg viewBox="0 0 48 48" class="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M10 12h28v23H10z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"></path>
        <path d="M16 19h16M16 26h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
        <path d="m31 31 7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
      </svg>
    </button>

    <!-- AI 咨询助手面板 -->
    <div v-if="chatOpen" class="ai-chat-panel">
      <div class="ai-chat-header">
        <div>
          <h3 style="font-weight: 700; color: white;">正奇咨询助手</h3>
          <p style="font-size: 0.875rem; color: rgba(255,255,255,0.9); margin-top: 0.25rem;">专业鞋业管理顾问</p>
        </div>
        <button @click="chatOpen = false" aria-label="关闭" style="color: white; font-size: 1.5rem; line-height: 1; background: none; border: none; cursor: pointer;">&times;</button>
      </div>
      <div class="ai-chat-body">
        <div class="ai-message">
          <p style="font-size: 0.875rem; line-height: 1.6; color: #5d6d67;">
            您好！我是正奇咨询助手。<br><br>
            我可以帮您了解：<br>
            • 精益制造1.0 - 基础管理标准化<br>
            • 敏捷制造2.0 - iMES智能系统<br>
            • 利润制造3.0 - 成本优化管理<br>
            • 物联制造4.0 - AI智能制造<br>
            • 商学培训5.0 - 团队能力提升<br><br>
            请联系我们预约诊断：<br>
            Mobile: +86 136 5699 9381<br>
            Wechat: KW464212148
          </p>
        </div>
      </div>
    </div>
'''

# AI助手CSS样式
ai_styles = '''
  <style>
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
    background: #0f766e;
    color: white;
    border: none;
    cursor: pointer;
  }

  .ai-chat-button:hover {
    transform: translateY(-4px);
    background: #115e59;
    box-shadow: 0 25px 30px -5px rgba(15, 118, 110, 0.3);
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
    display: flex;
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
    background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
    color: white;
    border-radius: 1rem 1rem 0 0;
  }

  .ai-chat-body {
    flex: 1;
    padding: 1.25rem;
    overflow-y: auto;
    max-height: 400px;
  }

  .ai-message {
    background: #f7faf8;
    padding: 1rem;
    border-radius: 0.75rem;
    border-left: 3px solid #0f766e;
  }
  </style>'''

files = ["index.html", "about.html", "team.html", "products.html", "services.html", "cases.html", "contact.html"]

for filename in files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已经有AI助手
        if 'ai-chat-button' in content:
            print(f"SKIP {filename} - AI assistant already exists")
            continue

        # 在</div>（app的结束标签）之前添加AI助手
        # 查找最后一个</div>（app容器的结束标签）
        last_div_pos = content.rfind('  </div>\n\n  <script>')

        if last_div_pos != -1:
            # 在Vue app结束标签之前插入AI助手
            new_content = content[:last_div_pos] + ai_widget + '\n' + content[last_div_pos:]

            # 在</style>之前添加AI样式，或者在</body>之前添加
            if '</style>' in new_content:
                style_pos = new_content.rfind('</style>')
                new_content = new_content[:style_pos] + ai_styles + '\n' + new_content[style_pos:]
            else:
                body_pos = new_content.rfind('</body>')
                new_content = new_content[:body_pos] + ai_styles + '\n' + new_content[body_pos:]

            # 在data()中添加chatOpen状态
            data_pos = new_content.find('data() {\n        return {')
            if data_pos != -1:
                insert_pos = new_content.find('{', data_pos) + 1
                new_content = new_content[:insert_pos] + '\n          chatOpen: false,' + new_content[insert_pos:]

            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"OK {filename} - AI assistant added")
        else:
            print(f"ERROR {filename} - Could not find insertion point")

    except Exception as e:
        print(f"ERROR {filename} - {str(e)}")

print("\nAll pages processed!")
