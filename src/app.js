const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir)
const config = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
  const filePath = path.join(config.root, req.url);


  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`${filePath} is not directory or not found`);
      return;
    }
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(files.join(','));
      })
    }
  })
});

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});
