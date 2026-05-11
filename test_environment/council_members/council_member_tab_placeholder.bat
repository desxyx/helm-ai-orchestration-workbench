@echo off
setlocal

set "ROLE_NAME=%~1"
if "%ROLE_NAME%"=="" set "ROLE_NAME=council_member"

if "%HELM_TEST_ROOT%"=="" (
  set "HELM_TEST_ROOT=%CD%\..\.."
)

title %ROLE_NAME%
cd /d "%HELM_TEST_ROOT%\test_environment\council_members"
cls
echo ============================================================
echo  %ROLE_NAME%
echo  H.E.L.M Council layer / Council member workspace
echo  Public template: no model CLI is launched from this tab.
echo ============================================================
echo.
echo Current directory:
echo   %CD%
echo.
echo This tab is reserved for %ROLE_NAME%.
echo Close this tab when done.
echo.
cmd /k
