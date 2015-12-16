// dépendance api express
var express = require('express');
//var bodyParser = require("body-parser");
var url = require('url');

var router = require("./modules/routeur");

var requestHandlers = require("./modules/requestHandlers");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var handle = {};

handle["/"] = requestHandlers.racine;
handle["/start"] = requestHandlers.start;
handle["/postdata"] = requestHandlers.postdata;
handle["/:value/getdata"] = requestHandlers.getdata;


// serveur html
var server= express();
//server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', function(request, response) {
    var pathname = url.parse(request.url).pathname;

    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});
server.get('/start', function(request, response) {
    var pathname = url.parse(request.url).pathname;
    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});
//apelle de la page get.html
server.get('/:value/getdata', function(request, response) {
    var pathname = url.parse(request.url).pathname;

    //envoie de la requete au route pour traitement
    router.route(handle,'/:value/getdata',request,response);

});

server.post('/postdata', function(request, response) {
    var pathname = url.parse(request.url).pathname;

    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});

server.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

server.listen(server_port, server_ip_address);
console.log("Demarage du serveur sur le port "+server_port+ " a l'adresse : "+server_ip_address);
