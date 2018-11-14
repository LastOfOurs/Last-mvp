const Egg = artifacts.require('EGG')

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

module.exports = async () => {
  try {
    let eggContract = await Egg.deployed()
    await eggContract.hatch({from: web3.eth.accounts[1]})
    await sleep(1000)
    await eggContract.hatch({from: web3.eth.accounts[1]})
    await sleep(1000)
    await eggContract.hatch({from: web3.eth.accounts[1]})
  } catch (err) {
    throw err
  }
}