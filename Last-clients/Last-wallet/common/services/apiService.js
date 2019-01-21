import axios from 'axios'
const URL = require('../constants/url')

export function getPrice() {
    return axios.get(`${URL.CRYPTO_COMPARE}/data/price?fsym=ETH&tsyms=USD,EUR,BRL`)
}

//This doesn't currently work if on ganache, would only work if running on testnet or mainnet.
export function getHistory(address) {
    return axios.get(`${URL.ETHERSCAN}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc`)
}

//MetaTX
export async function getEggs(address) {
  try {
    await axios.post('http://10.1.10.12:3002/api/v1/egg-tx', {
      eggAddress: "0xf32235620ce7ae274c377a27cd1a2f087c23a104",
      proxyAddress: "0xddfc2e31eeca6ed9e39ed4b7ba30f7217b3032a3",
      functionName: "transfer",
      functionTypes: ["address","uint256"],
      functionParams: [address, 1]
    })
    console.log('POST request to relayer successful')
  } catch (err) {
    console.log(err)
  }
}

export async function getEggBalance(address) {
  try {
    let balance = await axios.post('http://10.1.10.12:3003/api/v1/egg-balance', {
      userAddress: address,
    })
    return balance.data
  } catch (err) {
    console.log(err)
  }
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