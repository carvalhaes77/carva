@echo off
rem exemplo a adaptar sua rede nas variaveis de caminhos de server
:inicio
cls
echo.
echo COMUNICACOES:
ECHO.
ECHO PENDRIVE
ECHO.
ECHO 1) bloquear
ECHO 2) permitir
ECHO 3) SAIR
ECHO.
set choice=
set /p choice= digite a opcao: 
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='1' goto bloquear
if '%choice%'=='2' goto permitir
if '%choice%'=='3' goto sair
ECHO "%choice%" nao eh valido, digite o numero certo
ECHO.
goto inicio

:bloquear
cls
REM VIA REDE
regedit /s \\server\util\usb-block.reg
REM regedit /s usb-block.reg
REM LOCAL
goto inicio

:permitir
cls
REM VIA REDE
regedit /s \\server\util\usb-allow.reg
REM LOCAL
REM regedit /s usb-allow.reg
GOTO inicio

:sair
