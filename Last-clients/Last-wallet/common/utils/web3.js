// import '../../global'
// var Web3 = require('web3')
// // Show web3 where it needs to look for the Ethereum node
// web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8546'));

// let tokenAddress = "0xf7b14ff60bfb7bbccce839b19bf87be836d15c0c" //Egg address

// // The minimum ABI to get ERC20 Token balance
// let minABI = [
//   // balanceOf
//   {
//     "constant":true,
//     "inputs":[{"name":"_owner","type":"address"}],
//     "name":"balanceOf",
//     "outputs":[{"name":"balance","type":"uint256"}],
//     "type":"function"
//   },
//   // decimals
//   {
//     "constant":true,
//     "inputs":[],
//     "name":"decimals",
//     "outputs":[{"name":"","type":"uint8"}],
//     "type":"function"
//   }
// ];

// export function getEggBalance(address) {
//   // Get ERC20 Token contract instance
//   let contract = web3.eth.contract(minABI).at(tokenAddress)
//     // Call balanceOf function
//   contract.balanceOf(address, (error, balance) => {
//     // Get decimals
//     contract.decimals((error, decimals) => {
//       // calculate a balance
//       balance = balance.div(10**decimals)
//       console.log(balance.toString())
//     })
//   })
//   console.log(balance)
//   return balance
// }

