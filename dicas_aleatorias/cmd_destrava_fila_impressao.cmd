@echo off
rem BY CARVA
echo.
echo parando servico de impressao, aguarde...
echo.
net stop spooler
cd\WINDOWS\system32\spool\PRINTERS
echo.
echo limpando arquivos da fila, caso houverem...
echo.
attrib -r -s -h -a %systemroot%\system32\spool\PRINTERS\*.*
rem del c:\WINDOWS\system32\spool\PRINTERS\*.* /s /q
del c:\WINDOWS\system32\spool\PRINTERS\*.*.shd /s /q
del c:\WINDOWS\system32\spool\PRINTERS\*.*.spl /s /q
echo.
echo iniciando servico de impressao novamente
net start spooler
rem outras medidas, caso quiser destravar, escolha o processo
rem taskkill /IM "explorer.exe" /f
rem explorer
exit