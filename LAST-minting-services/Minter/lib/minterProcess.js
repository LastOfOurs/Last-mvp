const ipfsAPI = require('ipfs-api')
const Web3 = require('web3')
const contract = require('truffle-contract')
const fs = require('nano-fs')
const axios = require('axios')

const config = require('../config.js')
const provider = config.web3Provider
const ipfsNodeHost = config.ipfsNodeHost
const ipfsNodePort = config.ipfsNodePort
const ownerAddr = config.lastOwnerAddr
const LastEndpoint = config.lastAnimalsEndpoint
const ipfs = ipfsAPI(ipfsNodeHost, ipfsNodePort, { protocol: 'http' })

// Configure Truffle Contract
const LastJson = fs.readFileSync('../../LAST-contract/build/contracts/LAST.json', 'utf8')
const LastArtifacts = JSON.parse(LastJson)
const LastToken = contract(LastArtifacts)
const web3 = new Web3(new Web3.providers.HttpProvider(provider))
LastToken.setProvider(web3.currentProvider)

if (typeof LastToken.currentProvider.sendAsync !== 'function') {
  LastToken.currentProvider.sendAsync = function () {
    return LastToken.currentProvider.send.apply(
      LastToken.currentProvider, arguments
    )
  }
}

// minting token function with ID and IPFShash
async function startMintProcess (recipient, animalId) {
  try {
    // UPDATE animal data to minted = true
    let animal = await axios.patch(`${LastEndpoint}/${animalId}`,
      { 'minted': true }
    )

    let animalData = animal.data

    // write JSON file to LAST-IPFS
    await fs.writeFile(`../../LAST-IPFS/export/LAST_ANIMAL_${animalId}.json`, JSON.stringify(animalData.ipfsData))

    // IPFS adds JSON file
    let Ipfscontent = await fs.readFileSync(`../../LAST-IPFS/export/LAST_ANIMAL_${animalId}.json`)
    console.log(Ipfscontent)
    Ipfscontent = Buffer.from(Ipfscontent)

    let files = {
      path: `../../LAST-IPFS/export/LAST_ANIMAL_${animalId}.json`,
      content: Ipfscontent
    }

    let ipfsAdded = await ipfs.add(files)

    // finally mint token in smart contract
    let animalIdNo = Number(animalId)

    const LastTokenContract = await LastToken.deployed()
    console.log(recipient + animalIdNo + ipfsAdded[0].hash)
    let mintedToken = await LastTokenContract.mint(recipient, animalIdNo, ipfsAdded[0].hash, { from: ownerAddr, gas: 3000000 })
    console.log(mintedToken)
    return mintedToken
  } catch (err) {
    // on error- should send message to req
    console.error(err)
  }
}

// get message from parent
process.on('message', (message) => {
  console.log('minter received:', message)
  startMintProcess(message.recipient, message.animal_id)
  process.send('minting process started for animal ID: ' + message.animal_id)
})
