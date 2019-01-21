//exposes POST api
//on POST - Send 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const relayTx = require('./web3-rn-helper')

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

app.listen(3003, () => console.log(`Relayer listening on port 3003!`))