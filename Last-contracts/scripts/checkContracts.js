const Last = artifacts.require('Last')
const EggFactory = artifacts.require('EggFactory')
const Egg = artifacts.require('Egg')

module.exports = async () => {
  try {
    const contracts = {
      Last: await Last.deployed(),
      EggFactory: await EggFactory.deployed(),
      Egg: await Egg.deployed(),
    }

    Object.keys(contracts).forEach(key => {
      const contract = contracts[key]
      if (typeof (contract) !== 'undefined') {
        console.log(`${key} Contract deployed at ${contract.address}`)
      } else {
        throw `Could not find deployed ${key} contract`
      }
    })
  } catch (err) {
    throw err
  }
}
