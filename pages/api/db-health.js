// import postgres from 'postgres';
// const pgp = require('pg-promise')({
//     noWarnings: true
// })
const fs = require('fs');
const pg = require('pg');

export default (req, res) => {
    console.log(req);
    const config = {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: { ca: fs.readFileSync('/home/akin/dev/tiki/expert-hub/server-side-approach/biz-app/pages/api/ca.pem') },
        user: process.env.DB_USER,
    };
    
    const client = new pg.Client(config);
    let response;
        try{
            client.connect(function (err) {
                if (err)
                    throw err;
                client.query('SELECT 1 AS value', [], function (err, result) {
                    if (err)
                        throw err;
            
                    console.log(result.rows[0]);
                    response = result.rows[0];
                    res.status(200).json({ status: 'Connected to db', response });
                    client.end(function (err) {
                        if (err)
                            throw err;
                    });
                });
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({ message: err.message, error: err });
        }
  }
