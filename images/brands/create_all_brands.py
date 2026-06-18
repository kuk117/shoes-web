# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
import os

def create_brand_logo(name, cn_name, color, output_file):
    img = Image.new('RGB', (200, 120), 'white')
    draw = ImageDraw.Draw(img)

    try:
        font_large = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 40)
        font_small = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 16)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # 绘制品牌名
    bbox = draw.textbbox((0, 0), name, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (200 - text_width) // 2
    y = 35
    draw.text((x, y), name, fill=color, font=font_large)

    # 绘制中文名
    if cn_name:
        bbox2 = draw.textbbox((0, 0), cn_name, font=font_small)
        text_width2 = bbox2[2] - bbox2[0]
        x2 = (200 - text_width2) // 2
        y2 = y + text_height + 8
        draw.text((x2, y2), cn_name, fill='#666666', font=font_small)

    img.save(output_file)
    print(f'Created: {cn_name or name} -> {output_file}')

# 完整的品牌列表（从图片1和图片2提取的真实合作品牌）
brands = [
    # 国际知名运动品牌
    {'file': 'nike.png', 'name': 'NIKE', 'cn': '', 'color': '#000000'},
    {'file': 'adidas.png', 'name': 'adidas', 'cn': '', 'color': '#000000'},
    {'file': 'puma.png', 'name': 'PUMA', 'cn': '', 'color': '#000000'},
    {'file': 'newbalance.png', 'name': 'New Balance', 'cn': '', 'color': '#ED1C24'},
    {'file': 'skechers.png', 'name': 'SKECHERS', 'cn': '', 'color': '#0089CF'},
    {'file': 'converse.png', 'name': 'Converse', 'cn': '', 'color': '#000000'},

    # 国内知名品牌
    {'file': 'fila.png', 'name': 'FILA', 'cn': '斐乐', 'color': '#C8102E'},
    {'file': 'anta.png', 'name': 'ANTA', 'cn': '安踏', 'color': '#FF6600'},
    {'file': 'lining.png', 'name': 'LI-NING', 'cn': '李宁', 'color': '#E4002B'},
    {'file': 'xtep.png', 'name': 'XTEP', 'cn': '特步', 'color': '#D4002A'},
    {'file': 'peak.png', 'name': 'PEAK', 'cn': '匹克', 'color': '#000000'},
    {'file': '361.png', 'name': '361°', 'cn': '', 'color': '#FF0000'},

    # 制造企业
    {'file': 'hlig.png', 'name': 'HLIG', 'cn': '华利集团', 'color': '#0047AB'},
    {'file': 'belle.png', 'name': 'Belle', 'cn': '百丽', 'color': '#000000'},
    {'file': 'daphne.png', 'name': 'Daphne', 'cn': '达芙妮', 'color': '#8B4513'},
]

os.chdir('D:/agent/vue-shoe-website/images/brands')

for brand in brands:
    create_brand_logo(brand['name'], brand['cn'], brand['color'], brand['file'])

print(f'\n总共创建了 {len(brands)} 个品牌Logo！')
