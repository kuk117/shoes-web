# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
import os

# 创建品牌Logo的函数
def create_brand_logo(name, cn_name, color, output_file):
    # 创建200x120的白色背景图片
    img = Image.new('RGB', (200, 120), 'white')
    draw = ImageDraw.Draw(img)

    # 尝试使用系统字体
    try:
        font_large = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 36)
        font_small = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 16)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # 绘制品牌英文名（大字）
    bbox = draw.textbbox((0, 0), name, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (200 - text_width) // 2
    y = 30
    draw.text((x, y), name, fill=color, font=font_large)

    # 绘制品牌中文名（小字，如果有）
    if cn_name:
        bbox2 = draw.textbbox((0, 0), cn_name, font=font_small)
        text_width2 = bbox2[2] - bbox2[0]
        x2 = (200 - text_width2) // 2
        y2 = y + text_height + 10
        draw.text((x2, y2), cn_name, fill='#666666', font=font_small)

    # 保存
    img.save(output_file)
    print(f'Created: {output_file}')

# 品牌列表（从PPT图片中提取的真实合作品牌）
brands = [
    {'file': 'fila.png', 'name': 'FILA', 'cn': '斐乐', 'color': '#C8102E'},
    {'file': 'anta.png', 'name': 'ANTA', 'cn': '安踏', 'color': '#FF6600'},
    {'file': 'lining.png', 'name': 'LI-NING', 'cn': '李宁', 'color': '#E4002B'},
    {'file': 'xtep.png', 'name': 'XTEP', 'cn': '特步', 'color': '#D4002A'},
    {'file': 'peak.png', 'name': 'PEAK', 'cn': '匹克', 'color': '#000000'},
    {'file': '361.png', 'name': '361°', 'cn': '', 'color': '#FF0000'},
    {'file': 'belle.png', 'name': 'Belle', 'cn': '百丽', 'color': '#000000'},
    {'file': 'daphne.png', 'name': 'Daphne', 'cn': '达芙妮', 'color': '#8B4513'},
    {'file': 'hlig.png', 'name': 'HLIG', 'cn': '华利集团', 'color': '#0047AB'},
    {'file': 'pouchen.png', 'name': 'Pou Chen', 'cn': '裕元集团', 'color': '#1E3A8A'},
]

# 创建Logo
os.chdir('D:/agent/vue-shoe-website/images/brands')

for brand in brands:
    create_brand_logo(brand['name'], brand['cn'], brand['color'], brand['file'])

print(f'\nTotal: {len(brands)} brand logos created!')
