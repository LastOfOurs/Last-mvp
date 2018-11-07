import { put, takeEvery, call, all } from "redux-saga/effects"
import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/fetchTransactions"
import Utils from "web3-utils"
import ERC721 from "../abis/ERC721.json"

const CRYPTOKITTIES_RINKEBY = '0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF'
const CRYPTOKITTIES_MAINNET = '0x06012c8cf97bead5deae237070f9587f8e7a266d'

//Generator for the owned tokens for specific wallet address
function* getCryptoKitties(address) {
  console.log('----------------- getting here getCryptoKitties -----------------')
  let tokens
  try {
    tokens = yield fetch(
      "https://api.cryptokitties.co/kitties/all/" + address
    ).then(res => res.json())
  } catch (err) {
    console.log(err)
    throw err
  }

  let kitties
  try {
    kitties = yield all(
      tokens.map(token =>
        fetch("https://api.cryptokitties.co/kitties/" + token.id).then(res =>
          res.json()
        )
      )
    );
  } catch (err) {
    console.log(err)
    throw err
  }

  const returnValues = tokens.map((token, i) => ({
    _tokenId: token.id,
    link: "https://www.cryptokitties.co/kitty/" + token.id,
    token: {
      image: token.image_url_cdn,
      name: kitties[i].name,
      description: kitties[i].bio
    }
  }))
  return returnValues
}

function* fetchTransactions(address, contractAddress) {
  console.log('----------------- getting here fetchTransactions -----------------')
  if (
    (contractAddress === CRYPTOKITTIES_MAINNET || contractAddress === CRYPTOKITTIES_RINKEBY ||
      "0xb1690c08e213a35ed9bab7b318de14420fb57d8c" === contractAddress) &&
    networkId === 1
  ) {
    return yield getCryptoKitties(address)
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
