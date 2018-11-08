import axios from 'axios'
var URL = require('../constants/url')

export function getPrice() {
    return axios.get(`${URL.CRYPTO_COMPARE}/data/price?fsym=ETH&tsyms=USD,EUR,BRL`)
}

export function getHistory(address) {
    return axios.get(`${URL.ETHERSCAN}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc`)
}

//Fetches CryptoKitties owned by address, returns an array of the owned kitties
export async function getCryptoKitties(address) {
  //testAddress is used as we are pulling from mainnet API  
  // testAddress = '0x8aDa904a7Df2088024eabD0de41a880AD9ECe4d3'
  testAddress = '0xef2931aa6256771c1e484b52cc9bba3cd2ecec0a' //157 kitties
    let tokens = await axios.get('https://api.cryptokitties.co/kitties/all/' + testAddress)
    tokens = tokens.data
    // let kitties = tokens.map(token => axios.get('https://api.cryptokitties.co/kitties/' + token.id))
    const returnValues = tokens.map((token, i) => ({
      _tokenId: token.id,
      link: "https://www.cryptokitties.co/kitty/" + token.id,
      token: {
        image: token.image_url_cdn,
        name: token.color,
      }
    }))
    return returnValues
  }