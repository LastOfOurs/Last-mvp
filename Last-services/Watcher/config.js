//TODO: Add dotENV Variable to be used instead
const config = {
  ipfsNodeHost: 'last-ipfs',
  ipfsNodePort: '5001',
  web3Provider: 'http://last_ganache:8546',
  socketProvider: 'ws://last_ganache:8546',
  lastAnimalsEndpoint: 'http://last_server:3000/api/animals',
  tier1EthPerEgg: '15',
  tier2EthPerEgg: '2',
  tier3EthPerEgg: '3'
}

module.exports = config
