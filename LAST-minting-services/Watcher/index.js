const Web3 = require('web3')
const contract = require('truffle-contract')
const fs = require('nano-fs')
const config = require('./config.js')
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

async function watchHatching() {
  const LastTokenContract = await EggToken.deployed()
  const event = LastTokenContract.Hatching({fromBlock: 0, toBlock: 'latest'})
  event.watch((error, res) => {
    //push to message queue
    console.log(res)
  })
}

watchHatching()


/* EggToken.Hatch().watch(function(error, result) {
  if (!err) {
      console.log(result);
  } else {
      console.log("Error! +");
  } 
}); */
//console.log(EggToken.events.Hatching)
