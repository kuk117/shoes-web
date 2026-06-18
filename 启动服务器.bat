@echo off
chcp 65001 >nul
echo ========================================
echo   莆田正奇鞋业咨询网站 - 开发服务器
echo ========================================
echo.
echo 正在启动服务器...
echo 服务器地址: http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python -m http.server 8080
