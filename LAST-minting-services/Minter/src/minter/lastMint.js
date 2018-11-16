const Web3 = require('web3')
const contract = require('truffle-contract')
const fs = require('nano-fs')
const config = require('../../config.js')
const LastJson = fs.readFileSync('../../../LAST-contract/build/contracts/LAST.json', 'utf8')
const LastArtifacts = JSON.parse(LastJson)
const LastToken = contract(LastArtifacts)
const provider = config.web3Provider
const web3 = new Web3(new Web3.providers.HttpProvider(provider))
const ownerAddr = config.lastOwnerAddr

LastToken.setProvider(web3.currentProvider)

//TODO: find a less hacky way to make truffle-deploy library work nicely
if (typeof LastToken.currentProvider.sendAsync !== 'function') {
  LastToken.currentProvider.sendAsync = function () {
    return LastToken.currentProvider.send.apply(
      LastToken.currentProvider, arguments
    )
  }
}

/**
 * Mint Last Token
 * 
 * @param {string} animalId - id of the animal
 * @param {string} recipient - ethereum wallet address
 * @param {string} ipfsHash - ipfs hash of the animal data
 * 
 * @returns {object} Minted Token
 */
async function lastMint(animalId, recipient, ipfsHash) {
  let animalIdNo = Number(animalId)
  const LastTokenContract = await LastToken.deployed()
  let mintedToken = await LastTokenContract.mint(recipient, animalIdNo, `https://ipfs.io/ipfs/${ipfsHash}`, { from: ownerAddr, gas: 3000000 })
  return mintedToken
}

module.exports = lastMint
