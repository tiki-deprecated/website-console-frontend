const pg = require('pg');
import config from '../../components/utils/db-config'


export default (req, res) => {    
    const client = new pg.Client(config);
    let response;
        try{
            client.connect(function (err) {
                if (err)
                    throw err;
                client.query(`SELECT * FROM accounts`, [], function (err, result) {
                    if (err)
                        throw err;
            
                    console.log(result.rows[0]);
                    response = result.rows;
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
