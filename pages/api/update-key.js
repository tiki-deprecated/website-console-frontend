const pg = require('pg');
import config from '../../components/utils/db-config'
const Str = require('@supercharge/strings')


export default (req, res) => {

  if (req.method !== 'PUT') {
    return callback(null, { statusCode: 405, body: 'Method Not Allowed' });
  }

  const { auth0_id, api_key } = req.body;

  const client = new pg.Client(config); 

  try{
      client.connect(function (err) {
          if (err)
              throw err;
              client.query(`UPDATE accounts
                      SET api_key = crypt('${api_key}', gen_salt('bf'))
                      WHERE auth0_id = '${auth0_id}'
                      `,
           [], function (err, result) {
              if (err)
                  throw err;
              console.log(result);           
              const response = {
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
  