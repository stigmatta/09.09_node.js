const http = require('http');
const url = require('url');
const fs = require('fs');

const file_path = 'user.txt';

const server = http.createServer((request, response) => {
    const path = url.parse(request.url).pathname;
    
    if (path === '/') {
        fs.readFile('html/index.html', (err, data) => {
            if (err) {
                console.log("ERROR");
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('not found');
            } else {
                console.log('SUCCESS');
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else if (path === '/data' && request.method === 'POST') {
        let body = '';
        
        request.on('data', chunk => {
            body += chunk.toString();
        });
        
        request.on('end', () => {
            try {
                const parsedData = JSON.parse(body);
                fs.writeFile(file_path, JSON.stringify(parsedData), (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ error: 'Failed to save data' }));
                    } else {
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ message: 'Authorization successful' }));
                        console.log('Authorization successful!');
                    }
                });
            } catch (error) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('not found');
    }
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
