const fs = require('fs');

module.exports = {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: { ca: fs.readFileSync('/home/akin/dev/tiki/expert-hub/server-side-approach/biz-app/pages/api/ca.pem') },
        user: process.env.DB_USER,
    };