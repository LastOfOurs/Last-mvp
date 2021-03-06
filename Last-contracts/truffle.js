/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
require('babel-register')({
  ignore: /node_modules\/(?!openzeppelin-solidity\/test\/helpers)/
})
require('babel-polyfill')

module.exports = {
  networks: {
    docker: {
      host: 'host.docker.internal',
      port: 8545,
      gas: 5000000,
      gasPrice: 65000000000,
      network_id: '*' // Match any network id
    },
    development: {
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 65000000000,
      network_id: '*' // Match any network id
    },
    compose: {
      host: 'last_ganache',
      port: 8546,
      gas: 5000000,
      gasPrice: 65000000000,
      network_id: '*' // Match any network id
    },
    test: {
      host: 'localhost',
      port: 8546,
      gas: 5000000,
      gasPrice: 65000000000,
      network_id: '*' // Match any network id
    }
  }
}
