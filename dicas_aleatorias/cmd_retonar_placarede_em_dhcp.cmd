@echo off
rem BY RENATO
netsh int ip set address name="placa" source=dhcp
netsh int ip set dns "placa" dhcp
echo.
ipconfig /release
ipconfig /renew
ipconfig /flushdns
rem by carvalhaes
