@ECHO OFF
rem apenas exemplo simples no windows a partir de um notebook
netsh wlan set hostednetwork mode=allow ssid=Renato key=r1234567 keyUsage=persistent
netsh wlan start hostednetwork
rem by carva 22-05-2015

netsh wlan show hostednetwork