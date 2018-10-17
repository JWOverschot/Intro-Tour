## Dev omgeving opzetten

### v-host opzetten
1. Open kladblok als administrator
2. Ga naar open bestand
3. Open bestand C:/Windows/System32/drivers/etc/hosts
4. Voeg deze regel toe: 127.0.0.1 intro-tour.local

### Apache v-hosts opzetten

1. Open file httpd-v-hosts.conf
    * wamp: {wamp64:install-dir}\bin\apache\apache2.4.27\conf\extra\httpd-v-hosts.conf
    * xamp: {xamp:install-dir}\apache\conf\extra\httpd-v-hosts.conf
2. Voeg deze regels toe:
 ```
 <VirtualHost *:80>
    DocumentRoot "{project root}/public"
    ServerName "intro-tour.local"
</VirtualHost>
```
3. Start apache opnieuw op

### Laravel Configureren

1. Maak ``.env`` bestand aan in de root folder van het project
2. Kopieer inhoud van ``.env.example`` in het nieuw aangemaakte ``.env`` bestand
3. Verander regel 5 naar ``APP_URL=http://intro-tour.local``
4. Run command ``php artisan key:generate``
5. Run command ``composer update``

# Angular werkend krijgen

1. install node.js
2. run command ``npm install`` in intro-tour-client map (if this does not work load node installer and run repair) 
3. run command ``npm start``

### Angular enviroments runnen

#### Development
``ng serve -o``
#### Test
``ng serve --configuration=test -o``
#### Production
``ng serve prod -o``
