var http = require('http');
var url = require('url');
var fs = require ('fs');
var server = http.createServer();

server.on('request', function(request, response){
    var path = url.parse(request.url).pathname;
    path = 'html/' + 'index.html'; 

    fs.readFile(path,function(err,data){
        if(err){
            console.log("ERROR")
            response.writeHead(404,{'Content-Type': 'text/plain'})
            response.end('not found');
        }
        else{
            console.log('SUCCESS');
            response.writeHead(200,{'Content-Type' : 'text/html'})
            response.write(data.toString());
        }
    })
}).listen(8080);

