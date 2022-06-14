@echo off
rem BY RENATO
echo.
echo SCRIPT TECNICA DE PREVENCAO / CORRECAO
echo.
echo se nao tiver escrito o nome da pasta desejada e nome do grupo 
echo desejado para resetar privilegios, aperte ctrl c para sair
echo.
echo exemplo: cmd_preventiva nomepasta Administradores
echo.
echo para verificar alguns nomes de grupos digite cacls nome da pasta em questao
echo.
pause

attrib -h -r -s /s /d "%1*.*"
rem cacls Acesso /T /E /P Usuários:F
cacls Acesso /T /E /P %2:F
rem limpar temporarios descomente abaixo
rem rd %tmp% /q/s
exit
