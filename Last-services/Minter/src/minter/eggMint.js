const Web3 = require('web3')
const contract = require('truffle-contract')
const fs = require('nano-fs')
const config = require('../../config.js')
const EggJson = fs.readFileSync('../../../Last-contracts/build/contracts/Egg.json', 'utf8')
const EggArtifacts = JSON.parse(EggJson)
const EggToken = contract(EggArtifacts)
const provider = config.web3Provider
const web3 = new Web3(new Web3.providers.HttpProvider(provider))
const ownerAddr = config.lastOwnerAddr

EggToken.setProvider(web3.currentProvider)

//TODO: find a less hacky way to make truffle-deploy library work nicely
if (typeof EggToken.currentProvider.sendAsync !== 'function') {
  EggToken.currentProvider.sendAsync = function () {
    return EggToken.currentProvider.send.apply(
      EggToken.currentProvider, arguments
    )
  }
}

/**
 * Mint Egg Token
 * 
 * @param {string} recipient - ethereum wallet address
 * @param {int} amount - amount of eggs to be minted
 * 
 * @returns {object} Minted Token
 */
async function eggMint(recipient, amount) {
  try {
    let eggContract = await EggToken.deployed()
    let mintedEggToken = await eggContract.mint(recipient, amount)
    console.log(mintedEggToken)
    return mintedEggToken
  } catch (err) {
    throw err
  }
}

module.exports = eggMint