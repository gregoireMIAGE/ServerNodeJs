function route(handle, pathname, request, response) {
        console.log("Début du traitement de l'URL " + pathname + ".");
      if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
      }
}

exports.route = route;