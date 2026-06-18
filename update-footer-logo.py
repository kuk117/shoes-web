import re
import os
import sys

# 设置stdout编码为utf-8
sys.stdout.reconfigure(encoding='utf-8')

os.chdir(r"D:\agent\vue-shoe-website")

files = ["index.html", "about.html", "services.html", "cases.html", "contact.html"]

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 在footer中查找并替换logo
    # 匹配footer标签后的第一个logo图片（42px高度的）
    pattern = r'(<footer[^>]*>.*?<img src=")images/正奇logo透明底\.png(".*?height: 42px)'
    replacement = r'\1images/logo智能.png\2'

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"OK {filename} - footer logo updated")
    else:
        print(f"SKIP {filename} - no match found")

print("\nAll pages processed!")
