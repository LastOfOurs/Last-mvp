const Last = artifacts.require('LAST')

module.exports = async () => {
  try {
    let lastContract = await Last.deployed()
    let mintedLastTokens = await lastContract.balanceOf(web3.eth.accounts[1])
    if (mintedLastTokens == '3') {
      console.log(`3 Last tokens were minted correctly`)
    } else {
      throw "Last Tokens were not minted"
    }
  } catch (err) {
    throw err
  }
}