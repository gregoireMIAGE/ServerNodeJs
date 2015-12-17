# Server nodjs API Express

## Creation d'un server nodejs avec l'api express

Le serveur a été déployé sur deux cloud, [OpenShift](www.openshift.com) & [Hekoru](https://dashboard.heroku.com/)

### API Express
Pour utiliser l'API rest express dans un server nodejs 
Importer le module, MAC, LINUX : utilisé npm en ligne de commande `npm install express`

Declarer le module dans votre server.js : `var express = require('express');`

Plusieur façon de l'utiliser dans votre code, pour moi se sera : 
> var server= express();
* Méthode GET
> server.get('/', function(request, response) {..}
* Méthode POST
> server.post('/postdata', function(request, response) {..}
* Autre méthode
> server.use(function(request, response, next){..}



## Ficher

### RequestHandler.js

Ce fichier contient toutes les fonctions exécutées suivant la requête http. 
* Vous renverra un formulaire html. Une fois cliqué sur envoyé, une méthode POST via '/postdata' permettra au serveur récupérer les valeurs des champs et de les afficher.
>function start(request, response){..}
* Permet de récupérer les valeurs envoyées via une méthode html POST
>function postdata(request, response){..}
* Permet au serveur de récupérer une valeur(:value) passé en paramètre et de l'afficher via la méthode html GET.
>function getdata(request, response){..}
* Permet de récupérer et afficher le fichier package.json
> function getPackageJSON(request, response){..}

Fonction exporter permettant d'être directement utiliser dans server.js : 
> exports.erreur = erreur;
> exports.start = start;
> exports.racine = racine;
> exports.postdata = postdata;
> exports.getdata = getdata;
> exports.getPackageJSON = getPackageJSON;
> exports.testJSON = testJSON;

Importer le module RequestHandler
> var requestHandlers = require("./modules/requestHandlers");

Declaration d'un handler dans votre server.js
> var handle = {};
>
> handle["/"] = requestHandlers.racine;
> handle["/start"] = requestHandlers.start;
> handle["/postdata"] = requestHandlers.postdata;
> handle["/:value/getdata"] = requestHandlers.getdata;
> handle["/getpackagejson"] = requestHandlers.getPackageJSON;
> handle["/testjson"] = requestHandlers.testJSON;
> handle["erreur"] = requestHandlers.erreur;


### Router.js

Pour ma part, j'ai créer un module router. Mais l'API Express fournie deja un module router que vous pouvez intégrer dans votre code js. Mon fichier routeur permet d'executer la fonction correspondant a l'appelle demandé. 

Une seule fonction exporté : `exports.route = route;` permettant d'appeler directement cette fonction dans le code server.js

Code de la fonction de routage : 

> function route(handle, pathname, request, response) {
>       console.log("{ URL : " + pathname + " } ");
>        if (typeof handle[pathname] === 'function') {
>           handle[pathname](request, response);
>         }else {
>           handle["erreur"](request, response);
>         }
>}

`if (typeof handle[pathname] === 'function')` permet de verifier que la demande http correspond bien a une fonction définie dans votre handler.

` handle[pathname](request, response);` permet d'executer la fonction correspondant a la demande html

Paramètres :  
* handle : Contient toute les fonctions don le routeur a besoin pour executer la commande correspondant à la demande.
* pathname : Le nom de l'URL récupérer avec le code suivant : `url.parse(request.url).pathname`.
* Request : la requête http.
* Response : la réponse http.

Utilisation : 
Importer le router dans votre server.js : `var router = require("./modules/routeur");`

Dans votre fonction server.get, appler router.route(..) exemple : 

> server.get('/', function(request, response) {
>     var pathname = getUrl(request);
>
>     router.route(handle,pathname,request,response);
>
> });

### Server.js

Contient le code principale de votre serveur nodejs. Initialiser l'écoute : 
exemple d'utilisation
> `var server_port = 8080
> var server_ip_address = '127.0.0.1'
>
> server.listen(server_port, server_ip_address);
> console.log("Listening on " + server_ip_address + ", server_port " + server_port);`

Pour un déploiement sur le cloud OpenShift : 
> var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
> var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1
>
> server.listen(server_port, server_ip_address);
> console.log("Listening on " + server_ip_address + ", server_port " + server_port);

Pour un déploiement sur le cloud Hekoru : 
> var server_port = process.env.PORT || 5000;

> server.listen(server_port);
> console.log("Demarage du serveur sur le port "+server_port);



### Listening

Mon serveur est sur plusieurs cloud : 
* déployé sur OpenShift à l'adresse : [serverjs OpenShift](http://servernodejs-parantgregoire.rhcloud.com/)
* déployé sur Heroku à l'adresse : [server nodejs Hekoru](applicationdistribuegreg.herokuapp.com)

### Utilisation

Le server a été configuré pour répondre a quelques adresses.
* /start : vous renverra un formulaire html. Une fois cliqué sur envoyé, une méthode POST via /postdata permettra au server récupérera les valeurs des champs et de les afficher.
* /postdata : permet de récupérer les valeurs envoyées via une méthode html POST
* /:value/getdata : permet au serveur de récupérer une valeur(:value) passé en paramètre et de l'afficher.
* /getpackagejson : permet de récupérer et afficher le fichier package.json