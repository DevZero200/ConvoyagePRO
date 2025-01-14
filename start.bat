@echo off
echo Starting ConvoyagePRO...

echo Starting backend server...
start cmd /k "cd server && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak

echo Starting frontend...
start cmd /k "npm run dev"

echo ConvoyagePRO is running!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
