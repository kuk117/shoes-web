# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
import os

def create_professional_logo(brand_name, brand_en, color, bg_color, output_file):
    """创建专业的品牌Logo卡片"""
    # 创建240x160的图片
    img = Image.new('RGBA', (240, 160), bg_color)
    draw = ImageDraw.Draw(img)

    try:
        # 使用系统字体
        font_cn = ImageFont.truetype('C:/Windows/Fonts/msyhbd.ttc', 32)  # 微软雅黑粗体
        font_en = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 18)
    except:
        font_cn = ImageFont.load_default()
        font_en = ImageFont.load_default()

    # 绘制中文品牌名（居中）
    bbox = draw.textbbox((0, 0), brand_name, font=font_cn)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (240 - text_width) // 2
    y = 50
    draw.text((x, y), brand_name, fill=color, font=font_cn)

    # 绘制英文名（如果有）
    if brand_en:
        bbox2 = draw.textbbox((0, 0), brand_en, font=font_en)
        text_width2 = bbox2[2] - bbox2[0]
        x2 = (240 - text_width2) // 2
        y2 = y + text_height + 10
        draw.text((x2, y2), brand_en, fill=color, font=font_en)

    # 保存为PNG
    img.save(output_file, 'PNG')
    print(f'Created: {brand_name} -> {output_file}')

os.chdir('D:/agent/vue-shoe-website/images/brands')

# 精选知名品牌（按知名度排序）
brands = [
    # 第一梯队：知名消费品牌
    {'name': '大黄蜂', 'en': 'DHF', 'color': '#FFD700', 'bg': '#000000', 'file': 'dhf_brand.png'},
    {'name': '乔丹', 'en': 'QIAODAN', 'color': '#FF0000', 'bg': '#FFFFFF', 'file': 'qiaodan_brand.png'},
    {'name': '华利集团', 'en': 'HLIG', 'color': '#FFFFFF', 'bg': '#0047AB', 'file': 'hlig_brand_new.png'},
    {'name': '南星', 'en': 'K-STAR', 'color': '#FFD700', 'bg': '#FFFFFF', 'file': 'kstar_brand_new.png'},

    # 第二梯队：行业知名企业
    {'name': '东方猎狼', 'en': 'Oriental Hunter', 'color': '#2C5F2D', 'bg': '#FFFFFF', 'file': 'dflw_brand.png'},
    {'name': '景珍鞋服', 'en': 'Jingzhen', 'color': '#1E40AF', 'bg': '#FFFFFF', 'file': 'jingzhen_brand.png'},
    {'name': '众翔鞋业', 'en': 'Zhongxiang', 'color': '#DC2626', 'bg': '#FFFFFF', 'file': 'zhongxiang_brand.png'},
    {'name': '富力集团', 'en': 'Fuli Group', 'color': '#0F766E', 'bg': '#FFFFFF', 'file': 'fuli_brand_new.png'},
    {'name': '亿欧外贸', 'en': 'YIOU', 'color': '#7C3AED', 'bg': '#FFFFFF', 'file': 'yiou_brand.png'},
]

# 创建Logo
for brand in brands:
    create_professional_logo(
        brand['name'],
        brand['en'],
        brand['color'],
        brand['bg'],
        brand['file']
    )

print(f'\n总共创建 {len(brands)} 个专业品牌Logo！')
