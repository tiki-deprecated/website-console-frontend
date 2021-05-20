const pg = require('pg');
import config from '../../components/utils/db-config'

const randomNum = Math.floor(Math.random() * 1000000000);
const randomId = 'FAKE_' + randomNum;


export default (req, res) => {    
    const client = new pg.Client(config);
    let response;
        try{
            client.connect(function (err) {
                if (err)
                    throw err;
                client.query(`INSERT INTO accounts
                            (auth0_id, status)
                            VALUES('${randomId}', 'pre-application')
                            `,
                 [], function (err, result) {
                    if (err)
                        throw err;
                    console.log(result);
                    response = {
                        command: result.command,
                        rowCount: result.rowCount
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
