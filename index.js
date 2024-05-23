const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';
    
    // Set default file to serve to index.html if URL is '/'
    if (filePath === './.html') {
        filePath = './index.html';
    }

    // Serve 404.html if the requested file doesn't exist
    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile('./404.html', (err, content) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});