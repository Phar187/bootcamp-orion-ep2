const http = require('node:http');

const server = http.createServer((_request, response) => {
  response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
  response.end('Hello from Docker!\n');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Hello Container ouvindo na porta 3000');
});
