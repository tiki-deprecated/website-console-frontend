const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // add your secret key here

export default (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({message: 'Method Not Allowed'})
  }

  const data = JSON.parse(req.body);

  if (!data.paymentMethod || parseInt(data.amount) < 1 || !data.email || !data.billingInfo) {
    res.status(400).json({message: 'Some required fields were not supplied.'})
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
    res.status(400).json({message:  `Error: ${err.message}`})
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
      res.status(200).json({status})
    })
    .catch(err => {
      res.status(400).json({message:  `Error: ${err.message}`})
    });
};