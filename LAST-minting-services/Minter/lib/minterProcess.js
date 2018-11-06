//Spawned Minter Worker/process
const axios = require('axios')
const ipfsAdd = require('./minter/ipfsAdd')
const lastMint = require('./minter/lastMint')
const config = require('../config.js')
const LastEndpoint = config.lastAnimalsEndpoint

/**
 * Start minting process
 * 
 * @param {string} recipient - hex string of Ethereum Address
 * 
 * @returns {object} Minted Token
 */
async function startMintProcess (recipient) {

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
 * Listener for Message sent
 * @param {object} message - consist of `recipient` and `animal_id` (string, string)
 */
process.on('message', async (message) => {
  try {
    await startMintProcess(message.recipient)
    process.send('minted a random animal token')
  } catch(err) {
    process.send(`error has occured trying to start random mint, error: ${err}`)
  }
})
