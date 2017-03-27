var http = require('http');
var url = require('url');
var qr = require('../');

http.createServer(function (request, response) {
    if(request.method === 'GET' && request.url.substring(0, 9) == '/qr?text='){
        var text = decodeURI(url.parse(request.url, true).query.text);
        try {
            console.log(text);
            var img = qr.image(text);
            response.writeHead(200, {'Content-Type': 'image/png'});
            img.pipe(response);
        } catch (e) {
            response.writeHead(414, {'Content-Type': 'text/html'});
            response.end('<h1>414 Request-URI Too Large</h1>');
        }
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(5152);
