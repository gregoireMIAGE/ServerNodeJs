var url = require('url');
var querystring = require('querystring');

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

function afficheMessage(objet){
    //recuperation de la liste des message
    //formatage du message
    var i = 0;var message ="";
    for (var paramPostData in objet){
        i++;
        console.log("parametre "+i+" : " + objet[paramPostData]);
        if(message==="")
            message = message + objet[paramPostData];
        else
            message = message + "&" + objet[paramPostData];
    }
    return message;
}

exports.start = start;
exports.racine = racine;
exports.postdata = postdata;
exports.getdata = getdata;