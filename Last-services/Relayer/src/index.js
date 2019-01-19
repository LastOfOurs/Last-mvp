//exposes POST api
//on POST - Send 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const relayTx = require('./relayer/relayTx')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.post('/api/v1/egg-tx', async (req, res) => {
  //relay the transaction
  console.log("got request")
  let transaction = await relayTx(
    req.body.eggAddress, 
    req.body.proxyAddress, 
    req.body.functionName,
    req.body.functionTypes,
    req.body.functionParams
  )
  console.log(transaction)
  res.send(transaction)
})

app.listen(3002, () => console.log(`Relayer listening on port 3002!`))