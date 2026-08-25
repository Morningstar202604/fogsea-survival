@echo off
chcp 65001 >nul
title 全民求生：迷雾降临 - 网页版
cd /d "%~dp0web"
echo.
echo   正在启动《全民求生：迷雾降临》网页版...
echo   浏览器将自动打开 http://localhost:5173
echo   （若已打开过一次，直接刷新浏览器页面即可）
echo.
start "" /min cmd /c "npx vite --port 5173 --strictPort --host"
timeout /t 5 /nobreak >nul
start "" "http://localhost:5173"
echo   完成。停止游戏服务：关闭最小化的 vite 窗口即可。
timeout /t 8 >nul
