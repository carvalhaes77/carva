@echo off
rem BY CARVA
rem mude as configuracoes desejadas de ips, mascara, gateway conforme sua rede, 
rem e referencie sua placa exatamente como se chama no seu windows
rem ou apenas faça no modo grafico com comando ncpa.cpl

netsh int ip set address name="placa" source=static 192.168.0.101 255.255.255.0 192.168.0.1 1
netsh int ip set dns "placa" static 8.8.8.8
cls
pause
ping 8.8.8.8
ping www.google.com.br
