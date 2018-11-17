import ethers from 'ethers'
import { put, takeEvery, call, all } from "redux-saga/effects"
import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/transactionActions"

const { utils } = ethers

const DEFAULT_GASLIMIT = 21000
const DEFAULT_GASPRICE = 8000000000 // 4 gwei

export function createTransaction(to, value, gasLimit = DEFAULT_GASLIMIT, options = {}) {
  if (!value) throw new Error('The transaction value is required.')
  else if (!(Number(value) > 0)) throw new Error('The transaction value is invalid.')
  else if (isNaN(gasLimit)) gasLimit = DEFAULT_GASLIMIT
  const gasPrice = DEFAULT_GASPRICE
  value = utils.parseEther(value)
  return { gasPrice, ...options, to, gasLimit, value }
}

export function isValidTransaction(transaction) {
  return transaction instanceof Object
    && Number(transaction.value) > 0 && Number(transaction.gasLimit) > 0 && typeof transaction.to === 'string'
}

const CRYPTOKITTIES_RINKEBY = '0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF'
const CRYPTOKITTIES_MAINNET = '0x06012c8cf97bead5deae237070f9587f8e7a266d'

//Generator for the owned tokens for specific wallet address
async function getCryptoKitties(address) {
  console.log('----------------- getting here getCryptoKitties -----------------')
  testAddress = '0x8aDa904a7Df2088024eabD0de41a880AD9ECe4d3'
  let tokens
  try {
    tokens = await fetch(
      "https://api.cryptokitties.co/kitties/all/" + testAddress
    ).then(res => res.json())
  } catch (err) {
    console.log(err)
    throw err
  }

  let kitties
  try {
    kitties = await all(
      tokens.map(token =>
        fetch("https://api.cryptokitties.co/kitties/" + token.id).then(res =>
          res.json()
        )
      )
    )
  } catch (err) {
    console.log(err)
    throw err
  }

  const returnValues = tokens.map((token, i) => ({
    _tokenId: token.id,
    link: "https://www.cryptokitties.co/kitty/" + token.id,
    token: {
      image: token.image_url_cdn,
      name: token.color,
      // description: kitties[i].bio
    }
  }))
  // console.log(returnValues)
  return returnValues
}

export function fetchTransactions(address, contractAddress) {
  console.log('----------------- getting here fetchTransactions -----------------')
  if (
    (contractAddress === CRYPTOKITTIES_MAINNET || contractAddress === CRYPTOKITTIES_RINKEBY ||
      "0xb1690c08e213a35ed9bab7b318de14420fb57d8c" === contractAddress)
  ) {
    return getCryptoKitties(address)
    }
  }

export function* fetchTransactionsBatch(action) {
  const { address, contracts } = action.payload
  let results;
  try {
    results = yield all(
      contracts.map(contract => call(fetchTransactions, address, contract))
    );
  } catch (err) {
    console.log(err)
    yield put(fetchTransactionsFailure(err))
  }
  const transactions = {};
  for (let [i, contract] of contracts.entries()) {
    transactions[contract] = results[i]
  }
  yield put(fetchTransactionsSuccess(transactions))
}

export function* fetchTransactionsWatcher() {
  yield takeEvery("FETCH_TRANSACTIONS_BEGIN", fetchTransactionsBatch)
}