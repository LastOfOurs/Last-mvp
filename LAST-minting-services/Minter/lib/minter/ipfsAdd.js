const ipfsAPI = require('ipfs-api')
const fs = require('nano-fs')
const config = require('../../config.js')
const ipfsNodeHost = config.ipfsNodeHost
const ipfsNodePort = config.ipfsNodePort
const ipfs = ipfsAPI(ipfsNodeHost, ipfsNodePort, { protocol: 'http' })

/**
 * write to disk and add file to IPFS
 * 
 * @param {string} animalId 
 * @param {object} animalData 
 */
async function ipfsAdd(animalId, animalData) {
  await fs.writeFile(`../../LAST-IPFS/export/LAST_ANIMAL_${animalId}.json`, JSON.stringify(animalData.ipfsData))
  let Ipfscontent = await fs.readFileSync(`../../LAST-IPFS/export/LAST_ANIMAL_${animalId}.json`)
  let IpfsData = Buffer.from(Ipfscontent)
  let files = {
    path: `../../../LAST-IPFS/export/LAST_ANIMAL_${animalId}.json`,
    content: IpfsData
  }
  let ipfsAdded = await ipfs.add(files)
  console.log(ipfsAdded[0].hash)
  return ipfsAdded[0].hash
}

module.exports = ipfsAdd 