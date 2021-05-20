const fs = require('fs');
const path = require('path');

// assumes file is at project root
const certPath = path.join(__dirname.split('pages')[0], '/ca.pem').replace('.next/server/', '');

module.exports = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { ca: fs.readFileSync(certPath) },
    user: process.env.DB_USER,
};