const pg = require('pg');
import config from '../../components/utils/db-config'


export default (req, res) => {    
//  Only allow POST
//   if (event.httpMethod !== 'POST') {
//     return callback(null, { statusCode: 405, body: 'Method Not Allowed' });
//   }

    const client = new pg.Client(config);
    let response;
        try{
            client.connect(function (err) {
                if (err)
                    throw err;
                client.query(`UPDATE accounts
                            SET status = 'pre-application'
                            WHERE auth0_id = '609be88b80880400696208fa'
                            `,
                 [], function (err, result) {
                    if (err)
                        throw err;
                    console.log(result);
                    response = {
                        command: result.command,
                        rowCount: result.rowCount,
                    }
                    res.status(200).json({ response });
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
