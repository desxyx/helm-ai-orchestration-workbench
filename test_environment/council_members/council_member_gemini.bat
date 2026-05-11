@echo off
setlocal

if "%HELM_TEST_ROOT%"=="" (
  echo Set HELM_TEST_ROOT to the repository root before running this template.
  pause
  exit /b 1
)

set "ENTRY_DIR=%HELM_TEST_ROOT%\test_environment\council_members"
set "WT_TITLE=H.E.L.M Council Member Gemini"
set "MODEL_ID=gemini-model-id"
set "PROJECT_ID=YOUR_GCP_PROJECT_ID"
set "LOCATION=global"
set "INCLUDE_DIRS=%HELM_TEST_ROOT%"
set "WT_EXE=wt.exe"

where wt.exe >nul 2>nul
if not %ERRORLEVEL%==0 (
  if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe" set "WT_EXE=%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe"
)

if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe" (
  start "" "%WT_EXE%" -w 0 new-tab --title "%WT_TITLE%" -d "%ENTRY_DIR%" cmd /k "set GOOGLE_GENAI_USE_VERTEXAI=true&& set GOOGLE_CLOUD_PROJECT=%PROJECT_ID%&& set GOOGLE_CLOUD_LOCATION=%LOCATION%&& gemini.cmd -m %MODEL_ID% --include-directories %INCLUDE_DIRS%"
  exit /b
)

where wt.exe >nul 2>nul
if %ERRORLEVEL%==0 (
  start "" wt.exe -w 0 new-tab --title "%WT_TITLE%" -d "%ENTRY_DIR%" cmd /k "set GOOGLE_GENAI_USE_VERTEXAI=true&& set GOOGLE_CLOUD_PROJECT=%PROJECT_ID%&& set GOOGLE_CLOUD_LOCATION=%LOCATION%&& gemini.cmd -m %MODEL_ID% --include-directories %INCLUDE_DIRS%"
  exit /b
)

set GOOGLE_GENAI_USE_VERTEXAI=true
set GOOGLE_CLOUD_PROJECT=%PROJECT_ID%
set GOOGLE_CLOUD_LOCATION=%LOCATION%
cd /d "%ENTRY_DIR%"
gemini.cmd -m %MODEL_ID% --include-directories %INCLUDE_DIRS%
