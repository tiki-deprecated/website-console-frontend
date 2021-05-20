const pg = require('pg');
import config from '../../../components/utils/db-config'

// { query: { auth0_id } }

const test_id = process.env.TESTER1_ID;

export default (req, res) => {    
    console.log(req.method);
    let auth0_id = req.url;
    auth0_id = auth0_id.split('accts/')[1];
    auth0_id = auth0_id.replace(/[\[\]']+/g,'');
    console.log(auth0_id);
    
    const client = new pg.Client(config);

    if (req.method === 'GET') {
        try{
            client.connect(function (err) {
                if (err)
                    throw err;
                client.query(`SELECT * FROM accounts 
                            WHERE auth0_id = '${auth0_id}'
                            `, 
                    [], function (err, result) {
                    if (err)
                        throw err;
                    const response = {
                        data: result.rows[0],
                        rowCount: result.rowCount
                    }
                    console.log('-- getAcct api --');
                    console.log(response);
                    res.status(200).json(response);
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

    if (req.method === 'POST') {
        try{
            client.connect(function (err) {
                if (err)
                    throw err;
                client.query(`INSERT INTO accounts
                            (auth0_id, status)
                            VALUES('${auth0_id}', 'pre-application')
                            `,
                 [], function (err, result) {
                    if (err)
                        throw err;
                    console.log(result);           
                    const response = {
                        data: {
                            auth0_id,
                            status: 'pre-application'
                        },
                        command: result.command,
                        rowCount: result.rowCount
                    }
                    res.status(200).json(response);
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
}
