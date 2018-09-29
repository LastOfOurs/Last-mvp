const contract = require("truffle-contract");
const ipfsAPI = require('ipfs-api')
const Web3 = require('web3')
const fs = require('nano-fs');
const axios = require('axios')
//const fsPromises = fs.promises;

const config = require('../../../config.js')
const provider = config.web3Provider
const ipfsNodeHost = config.ipfsNodeHost
const ipfsNodePort = config.ipfsNodePort
const web3 = new Web3(provider)
const accessToken = config.serverAccessToken
const LastJSON = require("../../../LAST-contract/build/contracts/LAST.json")
const contractAddress = LastJSON
const Last = contract({LastJSON})
const LastEndpoint = config.lastAnimalsEndpoint
const ipfs = ipfsAPI(`${ipfsNodeHost}`, `${ipfsNodePort}`, {protocol: 'http'})

Last.setProvider(provider)

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
      
    let ipfsHash = await ipfs.add(files, function (err, res){
      if(err) throw err;
      console.log(res[0].hash)
      return res[0].hash
    })
    

    
    //finally mint token
    /* let LastContract = await Last.deployed()
    let mintingToken = await LastContract.mint(recipient, id, ipfsHash, {from: web3.eth.accounts[0]}) */

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


