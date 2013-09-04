var fs = require('fs');

exports.index = function(request, result) {
    fs.readFile('index.html', function(error, fileData) {
        if (error) throw error;
        else {
            result.writeHead({'content-type': 'text/html'});
            result.end(fileData);
        }
    });
};


exports.serveResource = function(request, result) {

    var resourcePath = request.path.replace("/..", "").substr(1);

    console.log("Resource path is: [" + resourcePath + "]");
    fs.readFile(resourcePath, function(error, fileData) {
        if (error) {
            result.writeHead(404);
            result.end();
        }
        else {
            // TODO: do something smarter?
            // result.writeHead({'content-type': 'text/html'});
            result.end(fileData);
        }
    })
};