@echo off
setlocal

if "%HELM_TEST_ROOT%"=="" (
  echo Set HELM_TEST_ROOT to the repository root before running this template.
  echo Example:
  echo   set HELM_TEST_ROOT=C:\path\to\ai_council_public
  pause
  exit /b 1
)

set "COUNCIL_DIR=%HELM_TEST_ROOT%\test_environment\council_members"
set "TAB_BAT=%COUNCIL_DIR%\council_member_tab_placeholder.bat"
set "WT_EXE=wt.exe"

where wt.exe >nul 2>nul
if not %ERRORLEVEL%==0 (
  if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe" set "WT_EXE=%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe"
)

start "" "%WT_EXE%" --window 0 ^
  new-tab --title "council_slot_a" --tabColor "#0B3D91" -d "%COUNCIL_DIR%" cmd /k ""%TAB_BAT%" council_slot_a" ^; ^
  new-tab --title "council_slot_b" --tabColor "#1D4ED8" -d "%COUNCIL_DIR%" cmd /k ""%TAB_BAT%" council_slot_b" ^; ^
  new-tab --title "council_slot_c" --tabColor "#38BDF8" -d "%COUNCIL_DIR%" cmd /k ""%TAB_BAT%" council_slot_c"
