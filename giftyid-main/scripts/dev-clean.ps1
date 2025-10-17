# Script để dọn dẹp và khởi động dev server
Write-Host "🧹 Dọn dẹp cache và khởi động dev server..." -ForegroundColor Green

# Dừng tất cả process Node.js
Write-Host "⏹️ Dừng Node.js processes..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null

# Xóa cache
Write-Host "🗑️ Xóa cache .next..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Xóa node_modules/.cache nếu có
Write-Host "🗑️ Xóa node_modules cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Khởi động dev server
Write-Host "🚀 Khởi động dev server..." -ForegroundColor Green
npm run dev 