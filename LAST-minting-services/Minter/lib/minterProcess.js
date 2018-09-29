const contract = require("truffle-contract");
const ipfsAPI = require('ipfs-api')
const Web3 = require('web3')
const fs = require('fs');
const axios = require('axios')
//const fsPromises = fs.promises;

const config = require('../../../config.js')
const web3 = new Web3(provider)
const provider = config.web3Provider
const accessToken = config.serverAccessToken
const LastJSON = require("../../../LAST-contract/build/contracts/LAST.json")
const contractAddress = LastJSON
const LastToken = contract({LastJSON})

LastToken.setProvider(provider)

//minting token function with ID and IPFShash
async function startMintProcess(recipient, id, ipfsHash) {
  try {
    //GET animal data
    //animalData = await 
    //UPDAT animal data to minted = true

    //write JSON file to LAST-IPFS

    //IPFS adds JSON file

    //finally mint token
    let last = await LastToken.deployed()
    let mintingToken = await last.mint(recipient, id, ipfsHash, {from: web3.eth.accounts[0]})

  } catch (err) {
    console.log(err)

  }
  
}

//get message from parent
process.on('message', (message) => {
  console.log('minter received:', message)
  startMintProcess(message.recipient, message.id, message.ipfsHash)
  process.send("minting process started for animal ID: " + message.animal_id)
});


