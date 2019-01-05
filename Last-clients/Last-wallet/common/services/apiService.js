import axios from 'axios'
const URL = require('../constants/url')

export function getPrice() {
    return axios.get(`${URL.CRYPTO_COMPARE}/data/price?fsym=ETH&tsyms=USD,EUR,BRL`)
}

export function getHistory(address) {
    return axios.get(`${URL.ETHERSCAN}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc`)
}

export async function getAnimals(address) {
  let tokens = await axios.get('http://192.168.86.234:3000/api/animals')
  tokens = tokens.data
  const returnValues = tokens.map((token, i) => ({
    id: token.id,
    token: {
      image: token.image,
      name: token.ipfsData.Name,
      favoriteActivity: token.ipfsData.favoriteActivity,
      description: token.ipfsData.description,
    }
  }))
  return returnValues
}

//Fetches CryptoKitties owned by address, returns an array of the owned kitties
export async function getCryptoKitties(address) {
  //testAddress is used as we are pulling from mainnet API  
  testAddress = '0xef2931aa6256771c1e484b52cc9bba3cd2ecec0a' //a mainnet address with 157 kitties to test for display
    let tokens = await axios.get('https://api.cryptokitties.co/kitties/all/' + testAddress)
    tokens = tokens.data
    let kitties = await tokens.map((kitty) => axios.get('https://api.cryptokitties.co/kitties/' + kitty.id))
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