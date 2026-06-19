@echo off
cd /d %~dp0

echo [1/3] Adding files...
git add .

echo [2/3] Committing...
git commit -m "update %date% %time%"

echo [3/3] Pushing to GitHub...
git push origin main

echo Done.
pause