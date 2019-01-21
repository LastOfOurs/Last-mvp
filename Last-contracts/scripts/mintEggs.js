const Egg = artifacts.require('EGG')

module.exports = async () => {
  try {
    let eggContract = await Egg.deployed()
    let mintedEggToken = await eggContract.mint(web3.eth.accounts[1], 1000)
    console.log(mintedEggToken)
    console.log('eggs minted')
  } catch (err) {
    throw err
  }
}