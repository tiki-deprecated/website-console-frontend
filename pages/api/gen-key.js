const Str = require('@supercharge/strings')


export default (req, res) => {
  const random = Str.random(50) 
  res.status(200).json({ key: random })
}
  