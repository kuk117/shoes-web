#!/bin/bash

# 批量更新所有HTML文件的logo路径和联系信息

cd "D:\agent\vue-shoe-website"

# 要处理的HTML文件列表
files=("index.html" "about.html" "team.html" "products.html" "services.html" "cases.html" "contact.html")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "处理 $file..."

        # 1. 替换navbar中的logo为红色logo
        sed -i 's|<img src="正奇logo透明底.png" alt="正奇咨询" style="height: 42px|<img src="images/正奇logo透明底.png" alt="正奇咨询" style="height: 42px|g' "$file"
        sed -i 's|<img src="logo智能.png" alt="正奇咨询" style="height: 42px|<img src="images/正奇logo透明底.png" alt="正奇咨询" style="height: 42px|g' "$file"

        # 2. 替换footer中的logo为绿色logo（48px高度的是footer）
        sed -i 's|<img src="正奇logo透明底.png" alt="正奇咨询" style="height: 48px|<img src="images/logo智能.png" alt="正奇咨询" style="height: 48px|g' "$file"
        sed -i 's|<img src="logo智能.png" alt="正奇咨询" style="height: 48px|<img src="images/logo智能.png" alt="正奇咨询" style="height: 48px|g' "$file"

        # 3. 替换联系信息
        sed -i 's|福建省莆田市荔城区|莆田市正奇企业管理咨询|g' "$file"
        sed -i 's|400-XXX-XXXX|Mobile: +86 136 5699 9381|g' "$file"
        sed -i 's|contact@zhengqi-shoe.com|Wechat: KW464212148|g' "$file"

        echo "$file 处理完成"
    fi
done

echo "所有文件处理完成！"
