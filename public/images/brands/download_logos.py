# -*- coding: utf-8 -*-
import requests
import os

# 使用Logo.dev API或直接使用品牌网站的Logo
logos = [
    {
        'name': 'fila',
        'url': 'https://logo.clearbit.com/fila.com',
        'cn': '斐乐'
    },
    {
        'name': 'anta',
        'url': 'https://logo.clearbit.com/anta.com',
        'cn': '安踏'
    },
    {
        'name': 'lining',
        'url': 'https://logo.clearbit.com/li-ning.com.cn',
        'cn': '李宁'
    },
    {
        'name': 'xtep',
        'url': 'https://logo.clearbit.com/xtep.com',
        'cn': '特步'
    },
    {
        'name': 'peak',
        'url': 'https://logo.clearbit.com/peaksport.com',
        'cn': '匹克'
    },
    {
        'name': 'belle',
        'url': 'https://logo.clearbit.com/belle.com.cn',
        'cn': '百丽'
    },
]

# 下载Logo
for logo in logos:
    try:
        filename = f'{logo["name"]}_clean.png'
        url = logo['url']

        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f'Downloaded: {logo["cn"]} -> {filename}')
        else:
            print(f'Failed: {logo["cn"]} (HTTP {response.status_code})')
    except Exception as e:
        print(f'Error: {logo["cn"]} - {e}')

print('Done!')
