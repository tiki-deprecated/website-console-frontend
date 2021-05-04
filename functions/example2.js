const axios = require('axios');exports.handler = (event, context, callback) => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => {
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          header: 'The following text is from a 3rd Party API (jsonplaceholder)',
          message: res.data.title
        }),
      });
  })
  .catch((err) => {
    callback(err);
  });
};