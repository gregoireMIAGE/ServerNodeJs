// dépendance api express
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');

var router = require("./modules/routeur");

var requestHandlers = require("./modules/requestHandlers");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var handle = {};

handle["/"] = requestHandlers.racine;
handle["/start"] = requestHandlers.start;
handle["/postdata"] = requestHandlers.postdata;
handle["/:value/getdata"] = requestHandlers.getdata;
handle["/getpackagejson"] = requestHandlers.getPackageJSON;
handle["/testjson"] = requestHandlers.testJSON;
handle["erreur"] = requestHandlers.erreur;


// serveur html
var server= express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

server.get('/', function(request, response) {
    var pathname = getUrl(request);

    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});
server.get('/start', function(request, response) {
    var pathname = getUrl(request);
    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});
//apelle de la page get.html
server.get("/:value/getdata", function(request, response) {
    var pathname = getUrl(request);

    //envoie de la requete au route pour traitement
    router.route(handle,'/:value/getdata',request,response);

});

server.get('/getpackagejson', function(request, response) {
    var pathname = getUrl(request);

    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});

server.get('/testjson', function(request, response) {
    var pathname = getUrl(request);

    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});

server.post('/postdata', function(request, response) {
    var pathname = getUrl(request);

    //envoie de la requete au route pour traitement
    router.route(handle,pathname,request,response);

});

server.use(function(request, response, next){
    var pathname = getUrl(request);

    router.route(handle,pathname,request,response);
});

function getUrl(request){
  return decodeURI(url.parse(request.url).pathname);
}

server.listen(server_port, server_ip_address);
console.log("Listening on " + server_ip_address + ", server_port " + server_port);
