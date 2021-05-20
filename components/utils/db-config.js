const fs = require('fs');
const path = require('path');

const certPath = path.join(__dirname, '/ca.pem').replace('.next/server/', '');


module.exports = {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: { ca: fs.readFileSync(certPath) },
        user: process.env.DB_USER,
    };