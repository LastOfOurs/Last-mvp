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
    let eggOne = await eggContract.hatch(1, {from: web3.eth.accounts[1]})
    let eggTwo = await eggContract.hatch(12, {from: web3.eth.accounts[1]})
    let eggThree = await eggContract.hatch(36, {from: web3.eth.accounts[1]})
    console.log(eggOne, eggTwo, eggThree)
    console.log(`eggs hatched`)
  } catch (err) {
    throw err
  }
}
