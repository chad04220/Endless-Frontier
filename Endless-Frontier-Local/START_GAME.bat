@echo off
setlocal
cd /d "%~dp0"
py -3 -c "import sys; sys.exit(0 if sys.version_info >= (3,7) else 1)" >nul 2>&1
if not errorlevel 1 goto use_py
python -c "import sys; sys.exit(0 if sys.version_info >= (3,7) else 1)" >nul 2>&1
if not errorlevel 1 goto use_python
echo Python 3.7 or newer is required to start the local game.
echo Install Python 3, then run this launcher again. See README.md.
pause
exit /b 1
:use_py
py -3 serve.py
goto finished
:use_python
python serve.py
:finished
if errorlevel 1 pause
endlocal
