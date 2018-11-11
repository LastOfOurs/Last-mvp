// Expose a REST API for spawning new process
// on POST: Fetch a certain animal based on its ID
// IMPORTANT: this will be depracated in the future in favor of Event Sourcing
const process = require('child_process')
const amqp = require('amqplib');
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

/**
 * POST req for new animal
 * 
 * @param {string} animal_id - ID number of the last token
 * @param {string} recipient - address of wallet to mint the token to
 */
app.post('/api/v1/mint', function (req, res) {
  let inputRecipient = req.body.recipient
  // fork minter process
  //TODO: use message queue instead of forked message
  let minterProcess = process.fork('./lib/minterProcess.js')
  // send data to minter process
  minterProcess.send({
    recipient: inputRecipient
  })
  // once minter returns message, output it back to the API req
  minterProcess.on('message', (message) => {
    res.send(message)
  })
})

//ADD Message queue Logic
//on egg-hatch message, fork a process and send input recipient to it

app.listen(3001, function () {
  console.log('Running Minter listener on port 3001')
})

async function subscribeToHatchEvent() {
  try {
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    const channel = await conn.createChannel()
    let q = 'egg-hatch'
    await channel.assertQueue(q, {durable: false})
    channel.consume(q, function(msg) {
      console.log("content is", msg.content.toString())
      console.log("content is", typeof msg.content)
    }, {noAck: true})
  } catch (err) {
    throw new Error(err)
    process.exit(1)
  }
} 

//using setTimeout here so process waits for rabbitmq to initialize
setTimeout(function () {
  subscribeToHatchEvent()
}, 18000); 
