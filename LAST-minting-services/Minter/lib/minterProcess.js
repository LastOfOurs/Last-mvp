
const ipfsAPI = require('ipfs-api')
const Web3 = require('web3')
const contract = require("truffle-contract");
const fs = require('nano-fs');
const axios = require('axios')

const config = require('../../../config.js')
const provider = config.web3Provider
const ipfsNodeHost = config.ipfsNodeHost
const ipfsNodePort = config.ipfsNodePort
const contractAddr = config.lastAddr
const ownerAddr = config.lastOwnerAddr
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

//minting token function with ID and IPFShash
async function startMintProcess(recipient, animal_id) {
  try {
    //http://localhost:8090/api/animals/0?access_token=R5EmrwmX8mmklghDqc3DP7GEHStGNqJBMjRE20qbvJm2Zyg6MN6b0fEbAirUXLeL
    //UPDATE animal data to minted = true
    let animal = await axios.patch(`${LastEndpoint}/${animal_id}?access_token=${accessToken}`,
      {"minted": true}
    )

    let animalData = animal.data

    //write JSON file to LAST-IPFS
    let writeIpfsFile = await fs.writeFile(`../../LAST-IPFS/export/LAST_ANIMAL_${animal_id}.json`, JSON.stringify(animalData.ipfsData))

    //IPFS adds JSON file
    let Ipfscontent = await fs.readFileSync(`../../LAST-IPFS/export/LAST_ANIMAL_${animal_id}.json`);
    console.log(Ipfscontent)
    Ipfscontent = new Buffer(Ipfscontent)

    let files = {
      path: `../../LAST-IPFS/export/LAST_ANIMAL_${animal_id}.json`,
      content: Ipfscontent
    }
      
    let ipfsAdded = await ipfs.add(files)   
    
    //finally mint token
    let animal_id_no = Number(animal_id)

    const LastTokenContract = LastToken.at(contractAddr)
    //console.log(recipient + animal_id_no + ipfsAdded[0].hash)
    let mintedToken = await LastTokenContract.mint(recipient, animal_id_no, ipfsAdded[0].hash, {from: ownerAddr, gas:3000000}) 
    console.log(mintedToken)
    //return mintToken
  } catch (err) {
    //on error- should send message to req
    console.log(err)
  }
  
}

//get message from parent
process.on('message', (message) => {
  console.log('minter received:', message)
  let minted = startMintProcess(message.recipient, message.animal_id)
  process.send("minting process started for animal ID: " + message.animal_id)
});


