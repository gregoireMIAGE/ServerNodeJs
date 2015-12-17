function route(handle, pathname, request, response) {
        console.log("{ URL : " + pathname + " } ");
      if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
      }else {
        handle["erreur"](request, response);
      }
}

exports.route = route;
