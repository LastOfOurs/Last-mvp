//relay signed message transaction
const Web3 = require('web3')
const lightwallet = require('eth-signer')
const contract = require('truffle-contract')
const fs = require('nano-fs')
const IdentityJson = fs.readFileSync('../../../Last-contracts/build/contracts/IdentityProxy.json', 'utf8')
const IdentityArtifacts = JSON.parse(IdentityJson)
const Identity = contract(IdentityArtifacts)
const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider))
const config = require('../config.js')

Identity.setProvider(web3.currentProvider)

//TODO: find a less hacky way to make truffle-deploy library work nicely
if (typeof Identity.currentProvider.sendAsync !== 'function') {
  Identity.currentProvider.sendAsync = function () {
    return Identity.currentProvider.send.apply(
      Identity.currentProvider, arguments
    )
  }
}

//address of Gas service
let fromAccount = config.gasAccount

async function relayTx(
  destAddr, 
  proxy, 
  funcName,
  typeArr,
  dataArr) {
  const LastIdentityContract = await Identity.deployed()
  let data = lightwallet.txutils._encodeFunctionTxData(funcName,typeArr,dataArr)
  // call forward request to a smart contract
  await LastIdentityContract.forward(destAddr, 0, '0x' + data, {from: fromAccount})
}

module.exports = relayTx