const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // add your secret key here

//NEEDS TO BE REWRITTEN TO FIT API FORMAT

exports.handler = async function(event, context, callback) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return callback(null, { statusCode: 405, body: 'Method Not Allowed' });
  }

  const data = JSON.parse(event.body);

  if (!data.paymentMethod || parseInt(data.amount) < 1 || !data.email || !data.billingInfo) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Some required fields were not supplied.',
      }),
    });
  }

  //Create the Customer
  const customer = await stripe.customers.create({
    name: data.name,
    email: data.email,
    address: {
      line1: data.billingInfo.address,
      city: data.billingInfo.city,
      state: data.billingInfo.state,
      postal_code: data.billingInfo.zip,
    },
    payment_method: data.paymentMethod,
  }).catch(err => {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error: ${err.message}`,
      }),
    });
  });


  stripe.charges
    .create({
      amount: parseInt(data.amount),
      currency: 'usd',
      description: 'Account Setup Payment',
      source: data.paymentMethod,
      customer: customer.id,
    })
    .then(({ status }) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ status }),
      });
    })
    .catch(err => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: `Error: ${err.message}`,
        }),
      });
    });
};