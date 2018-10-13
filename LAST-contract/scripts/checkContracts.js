const Last = artifacts.require('LAST')

module.exports = async () => {
  try {
    let lastContract = await Last.deployed()
    if (typeof(lastContract) !== "undefined"){
      console.log(`Last Contract deployed at ${lastContract.address}`)
    } else {
      throw "Could not find deployed contract"
    }
  } catch (err) {
    throw err
  }
}