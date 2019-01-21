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
    const amount = parseInt(process.argv[3]) || parseInt(process.argv[6]) || 1

    let eggContract = await Egg.deployed()
    let eggOne = await eggContract.hatch(amount, {from: web3.eth.accounts[1]})
    let eggTwo = await eggContract.hatch(amount, {from: web3.eth.accounts[1]})
    let eggThree = await eggContract.hatch(amount, {from: web3.eth.accounts[1]})
    console.log(eggOne, eggTwo, eggThree)
    console.log(`eggs hatched`)
  } catch (err) {
    throw err
  }
}
