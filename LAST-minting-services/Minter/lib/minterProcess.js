//Plasma contract
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const contract = require("truffle-contract");
const LastJSON = require("../../../LAST-contract/build/contracts/LAST.json")
const config = require('../../../config.js')

const contractAddress = LastJSON
const LastToken = contract({LastJSON})
LastToken.setProvider('http://localhost:8545')

async function mintToken() {
  await LastToken.deployed().mint
}


//get message from parent
process.on('message', (m) => {
  console.log('minter received:', m);
  process.send("minting process starts for animal ID: " + m.animal_id);
});


