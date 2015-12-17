var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

function erreur(request, response){
  console.log("Le gestionnaire 'erreur' est appelé.");

  console.log("Liste message post");
  var messagePost = afficheMessage(request.body);
  console.log("Liste message get");
  var messageGet = afficheMessage(request.params);

  response.setHeader('Content-Type', 'text/plain');
  response.send(404, 'Page introuvable !');
}
function start(request, response) {
    console.log("Le gestionnaire 'start' est appelé.");

     var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/postdata" method="post">'+
    '<textarea name="value1" rows="20" cols="60"></textarea>'+
    '<textarea name="value2" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Envoyer" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(body);
}

function racine(request, response){
    console.log("Le gestionnaire 'racine' est appelé.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("Bonjour racine");
}
function postdata(request, response){
    console.log("Le gestionnaire 'postdata' est appelé.");

    var message = afficheMessage(request.body);

    //console.log("parametre value : "+request.body.value1);

    response.setHeader('Content-Type', 'text/html');
    response.status(200).send('<h1>Text value methode post : value = '+message+'</h1>');
    response.end();
}
function getdata(request, response){
    console.log("Le gestionnaire 'getdata' est appelé.");

    var message = afficheMessage(request.params);

    response.setHeader('Content-Type', 'text/html');
    response.status(200).send('<h1>Text value methode get : value = '+message+'</h1>');
    response.end();
}
function getPackageJSON(request, response){
    console.log("Le gestionnaire 'getPackageJSON' est appelé.");
    response.setHeader('Content-Type', 'application/json');

    console.log("retour JSON : "+getJSONFile('package.json'));

    response.status(200).send(getJSONFile('package.json'));
    response.end();
}
  function testJSON(request, response){

    console.log("Le gestionnaire 'testJSON' est appelé.");
    response.setHeader('Content-Type', 'application/json');

    var objJson = {
      "objJson1" : {
        nom : "parant",
        prenom : "gregoire",
        age : "45",
        mail : "parant.gregoire@gmail.com"
      },
      "objJson2" : {
        nom : "parant",
        prenom : "thomas",
        age : "35",
        mail : ["parant.thomas@gmail.com","thomas57710@gmail.com"]
      }
    };

    console.log("retour JSON : "+JSON.stringify(objJson));

    response.status(200).send(JSON.stringify(objJson));
    response.end();
    //response.status(200).send(JSON.parse(fs.readFileSync('/../package.json', 'utf8')));
    //response.end();
}

function getJSONFile(file){
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function afficheMessage(objet){
    //recuperation de la liste des message
    //formatage du message
    var i = 0;var message ="";
    for (var paramPostData in objet){
        i++;
        console.log("{ param_"+i+" : " + objet[paramPostData]+" } ");
        if(message==="")
            message = message + objet[paramPostData];
        else
            message = message + "&" + objet[paramPostData];
    }
    return message;
}

exports.erreur = erreur;
exports.start = start;
exports.racine = racine;
exports.postdata = postdata;
exports.getdata = getdata;
exports.getPackageJSON = getPackageJSON;
exports.testJSON = testJSON;
