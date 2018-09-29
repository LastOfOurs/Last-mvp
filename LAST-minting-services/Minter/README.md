TODO:
x Express server
x Spawn new Node JS process
x Truffle-Contract from  
x LAST-contract dir
x Add IPFS JSON to LAST-IPFS
Call Minting Contract via web3

LOL 0 Id not allowed

const ipfsAPI = require('ipfs-api')
const Web3 = require('web3')
const contract = require("truffle-contract");
const fs = require('nano-fs');
const axios = require('axios')

const config = require('../../../config.js')
const provider = config.web3Provider
const ipfsNodeHost = config.ipfsNodeHost
const ipfsNodePort = config.ipfsNodePort
const accessToken = config.serverAccessToken
const LastEndpoint = config.lastAnimalsEndpoint
const ipfs = ipfsAPI(`${ipfsNodeHost}`, `${ipfsNodePort}`, {protocol: 'http'})

//Configure Truffle Contract
const LastJson = fs.readFileSync("../../LAST-contract/build/contracts/LAST.json", 'utf8')
const LastArtifacts = JSON.parse(LastJson)
//const LastJSON = require("../../../LAST-contract/build/contracts/LAST.json")
const LastToken = contract(LastArtifacts)
const web3 = new Web3(new Web3.providers.HttpProvider(provider))
LastToken.setProvider(web3.currentProvider)

if (typeof LastToken.currentProvider.sendAsync !== "function") {
  LastToken.currentProvider.sendAsync = function() {
      return LastToken.currentProvider.send.apply(
          LastToken.currentProvider, arguments
      );
  };
}