//exposes GET api for blockchain and web3
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const getEggBalance = require('./web3-rn-helper')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.post('/api/v1/egg-balance', async (req, res) => {
  console.log("got egg balance request")
  let balance = await getEggBalance(
    req.body.userAddress, 
  )
  console.log(balance)
  res.send(balance)
})

app.listen(3003, () => console.log(`web3 service listening on port 3003!`))