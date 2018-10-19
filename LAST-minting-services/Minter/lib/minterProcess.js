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
 * @param {string} animalId - id of the chosen animal to mint
 * 
 * @returns {object} Minted Token
 */
async function startMintProcess (recipient, animalId) {

  // UPDATE animal data to minted = true
  let animal = await axios.patch(`${LastEndpoint}/${animalId}`, { 'minted': true })
  let animalData = animal.data
  //add file to IPFS
  let ipfsHash = await ipfsAdd(animalId, animalData)
  // finally mint token in smart contract
  let mintedToken = await lastMint(animalId, recipient, ipfsHash)
  return mintedToken
}

/**
 * Listener for Message sent
 * @param {object} message - consist of `recipient` and `animal_id` (string, string)
 */
process.on('message', async (message) => {
  try {
    await startMintProcess(message.recipient, message.animal_id)
    process.send('minted token for animal ID: ' + message.animal_id)
  } catch(err) {
    process.send(`error has occured for animal ${message.animal_id}, error: ${err}`)
  }
})
