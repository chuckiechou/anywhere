const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');

const tplPath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : false,
                files,
            }

            res.end(template(data));

        }
    } catch ($ex) {
        console.error($ex)
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`${filePath} is not diresctory or file`);
    }
}
