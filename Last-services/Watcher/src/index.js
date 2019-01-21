const Web3 = require('web3')
const contract = require('truffle-contract')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('nano-fs')
const config = require('../config.js')
const amqp = require('amqplib');
const EggJson = fs.readFileSync('../../Last-contracts/build/contracts/Egg.json', 'utf8')
const EggArtifacts = JSON.parse(EggJson)
const EggToken = contract(EggArtifacts)
const provider = config.socketProvider
const web3 = new Web3(new Web3.providers.WebsocketProvider(provider))
const ownerAddr = config.lastOwnerAddr
const tier1EthPerEgg = config.tier1EthPerEgg
const tier2EthPerEgg = config.tier2EthPerEgg
const tier3EthPerEgg = config.tier3EthPerEgg

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 


/**
 * Push a hatch event to queue
 * 
 * @param {object} conn - connection to rabbitmq
 * @param {string} recipient - address of wallet to mint the token to
 */
async function pushHatchEvent(conn, recipient) {
  const channel = await conn.createChannel()
  let q = 'egg-hatch'
  let msgObj = {
    recipient: recipient
  }
  await channel.assertQueue(q, {durable: true})
  await channel.sendToQueue(q, Buffer.from(JSON.stringify(msgObj), {persistent: true}))
  console.log(`published ${JSON.stringify(msgObj)} to queue`)
}

async function pushEvent(conn, queue, msgObj) {
  const channel = await conn.createChannel()
  await channel.assertQueue(queue, {durable: true})
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgObj), {persistent: true}))
  console.log(`published ${JSON.stringify(msgObj)} to queue`)
}

/**
 * POST req to call to mint new animal
 * 
 * @param {string} animal_id - ID number of the last token
 * @param {string} recipient - address of wallet to mint the token to
 */
app.post('/api/v1/mint', async (req, res) => {
  let inputRecipient = req.body.recipient
  //connect with message queue
  const conn = await amqp.connect({ 
    protocol: 'amqp', 
    hostname: 'last_rabbitmq', 
    port: 5672, 
    username: 'user', 
    password: 'bitnami', 
    vhost: '/' 
  })

  let msgObj = {
    recipient: inputRecipient
  }

  pushEvent(conn, 'egg-hatch', msgObj)
  //pushHatchEvent(conn, inputRecipient)
})

EggToken.setProvider(web3.currentProvider)

//This will correctly set web3 provider
//TODO: Find more elegant way to accept web3 provider
if (typeof EggToken.currentProvider.sendAsync !== 'function') {
  EggToken.currentProvider.sendAsync = function () {
    return EggToken.currentProvider.send.apply(
      EggToken.currentProvider, arguments
    )
  }
}

async function watchBuying() {
  try {
    // event from wallet
    const LastTokenContract = await EggToken.deployed()
    const event = LastTokenContract.Hatching()
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'last_rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    event.watch((error, res) => {
      if (error) throw new Error(error)
      else {
        //pushHatchEvent(conn, res.args.recipient)
        console.log('dddd')
        var eventName, amountOfEggs
        let ethAmount = 10//res.args.amount
        console.log(JSON.stringify(res))
        switch (res.args.tier.toString()) {
          case '1':
            console.log('EGG_TIER_1')
            eventName = 'EGG_TIER_1'
            amountOfEggs = ethAmount / tier1EthPerEgg
            break
          case '2':
            eventName = 'EGG_TIER_2'
            amountOfEggs = ethAmount / tier2EthPerEgg
            break
          case '3': 
            eventName = 'EGG_TIER_3'
            amountOfEggs = ethAmount / tier3EthPerEgg
            break
          default:
          console.log('default')
            eventName = ''
        }
        
        if (eventName != '') {
          let msgObj = {
            amount: amountOfEggs,
            recipient: res.args.recipient
          }
          pushEvent(conn, eventName, msgObj)
        }
      }
    })
  } catch (err) {
    throw new Error(err) 
  }
}

async function watchHatching() {
  try {
    const LastTokenContract = await EggToken.deployed()
    const event = LastTokenContract.Hatching()
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'last_rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    event.watch((error, res) => {
      if (error) throw new Error(error)
      else {
        //pushHatchEvent(conn, res.args.recipient)
        let msgObj = {
          recipient: res.args.recipient
        }
        
        console.log('testing')
        pushEvent(conn, 'egg-hatch', msgObj)
      }
    })
  } catch (err) {
    throw new Error(err) 
  }
}

setTimeout(function () {
  //watchHatching()
  watchBuying()
  app.listen(3001, () => {
    console.log('Running Watcher event listener on port 3001')
  })
}, 30000)
