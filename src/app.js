const http = require('http');
const chalk = require('chalk');
const config = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<body>');
  res.write('Hello World!');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
