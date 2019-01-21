const Egg = artifacts.require('EGG')

module.exports = async () => {
  try {
    let eggContract = await Egg.deployed()
    // let mintedEggToken = await eggContract.mint(web3.eth.accounts[1], 1000)
    let mintedEggToken = await eggContract.mint('0xddfc2e31eeca6ed9e39ed4b7ba30f7217b3032a3', 1000)
    console.log(mintedEggToken)
  } catch (err) {
    throw err
  }
}