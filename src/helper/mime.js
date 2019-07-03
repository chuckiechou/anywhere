const path = require('path');

const mimeTypes = {
    'css': 'text/css',
    'gif': 'image/gif',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'json': 'application/json',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'js': 'application/javascript',
    'txt': 'text/plain',
    'html': 'text/html',
};

module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLowerCase();
    if (!ext) {
        ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt']
};

