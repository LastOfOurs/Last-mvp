const Last = artifacts.require('Last')
const Egg = artifacts.require('Egg')

module.exports = async () => {
  try {
    let lastContract = await Last.deployed()
    let eggContract = await Egg.deployed()
    if (typeof(lastContract) !== "undefined" || typeof(eggContract) !== "undefined"){
      console.log(`Last Contract deployed at ${lastContract.address}`)
      console.log(`Egg Contract deployed at ${eggContract.address}`)
    } else {
      throw "Could not find deployed contract"
    }
  } catch (err) {
    throw err
  }
}