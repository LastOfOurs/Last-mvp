const Web3 = require('web3')
const contract = require('truffle-contract')
const fs = require('nano-fs')
const config = require('./config.js')
const amqp = require('amqplib');
const EggJson = fs.readFileSync('../../LAST-contract/build/contracts/Egg.json', 'utf8')
const EggArtifacts = JSON.parse(EggJson)
const EggToken = contract(EggArtifacts)
const provider = config.socketProvider
const web3 = new Web3(new Web3.providers.WebsocketProvider(provider))
const ownerAddr = config.lastOwnerAddr

EggToken.setProvider(web3.currentProvider)

if (typeof EggToken.currentProvider.sendAsync !== 'function') {
  EggToken.currentProvider.sendAsync = function () {
    return EggToken.currentProvider.send.apply(
      EggToken.currentProvider, arguments
    )
  }
}

async function pushHatchEvent(recipient, amount) {
  const conn = await amqp.connect({ 
    protocol: 'amqp', 
    hostname: 'localhost', 
    port: 5672, 
    username: 'user', 
    password: 'bitnami', 
    vhost: '/' 
  })
  const channel = await conn.createChannel()
  let q = 'egg-hatch'
  let msgObj = JSON.stringify({
    recipient: recipient,
    amount: amount
  })
  await channel.assertQueue(q, {durable: false})
  await channel.sendToQueue(q, Buffer.from(msgObj))
  console.log(`published ${msgObj} to queue`)
}

async function watchHatching() {
  const LastTokenContract = await EggToken.deployed()
  const event = LastTokenContract.Hatching({fromBlock: 0, toBlock: 'latest'})
  //console.log(LastTokenContract)
  event.watch((error, res) => {
    if(error) console.error(error)
    else {
      //push recipient address and amount
      pushHatchEvent(res.args.recipient, res.args.amount.toNumber())
    }
  })
}

watchHatching()