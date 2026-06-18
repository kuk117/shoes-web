import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

import os
os.chdir(r"D:\agent\vue-shoe-website")

files = ["index.html", "about.html", "team.html", "products.html", "services.html", "cases.html", "contact.html"]

for filename in files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # 移除AI助手HTML代码（从按钮到面板结束）
        pattern1 = r'\s*<!-- AI 咨询助手浮动按钮 -->.*?</div>\s*\n\s*</div>\s*\n\s*<script'
        new_content = re.sub(pattern1, '\n  </div>\n\n  <script', content, flags=re.DOTALL)

        # 移除chatOpen状态
        pattern2 = r',?\s*chatOpen:\s*false,?'
        new_content = re.sub(pattern2, '', new_content)

        # 移除AI助手CSS样式
        pattern3 = r'\s*<style>\s*/\* 动态效果样式 \*/.*?\.ai-message \{[^}]+\}\s*</style>'
        new_content = re.sub(pattern3, '', new_content, flags=re.DOTALL)

        # 另一种CSS移除模式
        pattern4 = r'\s*<style>\s*\.ai-chat-button \{.*?\.ai-message \{[^}]+\}\s*</style>'
        new_content = re.sub(pattern4, '', new_content, flags=re.DOTALL)

        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"OK {filename} - AI code removed")
        else:
            print(f"SKIP {filename} - no AI code found")

    except Exception as e:
        print(f"ERROR {filename} - {str(e)}")

print("\nCleanup completed!")
