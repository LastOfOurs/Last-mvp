// Expose a REST API for spawning new process
// on POST: Fetch a certain animal based on its ID
// IMPORTANT: this will be depracated in the future in favor of Event Sourcing
const process = require('child_process')
const amqp = require('amqplib');
const axios = require('axios')
const ipfsAdd = require('./minter/ipfsAdd')
const lastMint = require('./minter/lastMint')
const eggMint = require('./minter/eggMint')
const config = require('../config.js')
const LastEndpoint = config.lastAnimalsEndpoint


/**
 * Start minting process
 * 
 * @param {string} recipient - hex string of Ethereum Address
 * 
 * @returns {object} Minted Token
 */
async function mintLast (recipient) {
  // GET a random unminted Animal
  let animalToMint = await axios.get(`${LastEndpoint}/unminted`) 
  // UPDATE animal data to minted = true
  let animal = await axios.patch(`${LastEndpoint}/${animalToMint.data.id}`, { 'minted': true })
  let animalData = animal.data
  //add file to IPFS
  let ipfsHash = await ipfsAdd(animalToMint.data.id, animalData)
  // finally mint token in smart contract
  let mintedToken = await lastMint(animalToMint.data.id, recipient, ipfsHash)
  return mintedToken
}

/**
 * Start minting process
 * 
 * @param {string} recipient - hex string of Ethereum Address
 * 
 * @param {int} amount - amount of eggs to be minted
 * 
 * @returns {object} Minted Egg Token
 */
async function mintEgg (recipient, amount) {
  let mintedEggToken = await eggMint(recipient, amount)
  return mintedEggToken
}


//ADD Message queue Logic
//on egg-hatch message, fork a process and send input recipient to it

async function subscribeToHatchEvent() {
  try {
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'last_rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    const channel = await conn.createChannel()
    let q = 'egg-hatch'
    await channel.assertQueue(q, {durable: true})
    channel.consume(q, async (msg) => {
      let msgObj = JSON.parse(msg.content.toString())
      let lastMinted = await mintLast(msgObj.recipient)
      channel.ack(msg)
    }, {noAck: false})
  } catch (err) {
    throw new Error(err)
  }
} 

async function subscribeToEggTier1Event() {
  try {
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'last_rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    const channel = await conn.createChannel()
    let q = 'EGG_TIER_1'
    await channel.assertQueue(q, {durable: true})
    channel.consume(q, async (msg) => {
      let msgObj = JSON.parse(msg.content.toString())
      let eggMinted = await mintEgg(msgObj.recipient, msgObj.amount)
      channel.ack(msg)
    }, {noAck: false})
  } catch (err) {
    throw new Error(err)
  }
}

async function subscribeToEggTier2Event() {
  try {
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'last_rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    const channel = await conn.createChannel()
    let q = 'EGG_TIER_2'
    await channel.assertQueue(q, {durable: true})
    channel.consume(q, async (msg) => {
      let msgObj = JSON.parse(msg.content.toString())
      let eggMinted = await mintEgg(msgObj.recipient, msgObj.amount)
      channel.ack(msg)
    }, {noAck: false})
  } catch (err) {
    throw new Error(err)
  }
}

async function subscribeToEggTier3Event() {
  try {
    const conn = await amqp.connect({ 
      protocol: 'amqp', 
      hostname: 'last_rabbitmq', 
      port: 5672, 
      username: 'user', 
      password: 'bitnami', 
      vhost: '/' 
    })

    const channel = await conn.createChannel()
    let q = 'EGG_TIER_3'
    await channel.assertQueue(q, {durable: true})
    channel.consume(q, async (msg) => {
      let msgObj = JSON.parse(msg.content.toString())
      let eggMinted = await mintEgg(msgObj.recipient, msgObj.amount)
      channel.ack(msg)
    }, {noAck: false})
  } catch (err) {
    throw new Error(err)
  }
}

//using setTimeout here so process waits for rabbitmq to initialize
setTimeout(function () {
  subscribeToHatchEvent()
  subscribeToEggTier1Event()
}, 20000)
