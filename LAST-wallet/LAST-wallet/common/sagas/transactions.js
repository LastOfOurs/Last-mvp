// @format
import { put, takeEvery, call, all } from "redux-saga/effects"
import {
  fetchTransactionsSuccess,
  fetchTransactionsFailure
} from "../actions/fetchTransactions"
import Utils from "web3-utils"
import ERC721 from "../abis/ERC721.json"

//Generator for the owned tokens for specific wallet address
function* getCryptoKitties(address, contractAddress, web3) {
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
  const web3 = config.web3
  const networkId = yield web3.eth.net.getId()

  if (
    ("0x06012c8cf97bead5deae237070f9587f8e7a266d" === contractAddress ||
      "0xb1690c08e213a35ed9bab7b318de14420fb57d8c" === contractAddress) &&
    networkId === 1
  ) {
    return yield getCryptoKitties(address, contractAddress, web3);
  } else {
    const contract = new web3.eth.Contract(ERC721, contractAddress, web3)
    const outputs = yield call(
      contract.getPastEvents.bind(contract),
      "Transfer",
      {
        fromBlock: 0,
        toBlock: "latest",
        topics: [
          Utils.sha3("Transfer(address,address,uint256)"),
          Utils.padLeft(address, 64),
          null
        ]
      }
    );
    const inputs = yield call(
      contract.getPastEvents.bind(contract),
      "Transfer",
      {
        fromBlock: 0,
        toBlock: "latest",
        topics: [
          Utils.sha3("Transfer(address,address,uint256)"),
          null,
          Utils.padLeft(address, 64)
        ]
      }
    )

    for (let i = 0; i < outputs.length; i++) {
      const outputTokenId = outputs[i].returnValues._tokenId
      for (let j = 0; j < inputs.length; j++) {
        const inputTokenId = inputs[j].returnValues._tokenId
        if (outputTokenId === inputTokenId) {
          inputs.splice(j, 1)
        }
      }
    }

    const returnValues = inputs.map(event => event.returnValues);
    const tokenURIPromises = returnValues.map(({ _tokenId }) =>
      contract.methods.tokenURI(_tokenId).call()
    );
    let tokenURIs;
    try {
      tokenURIs = yield call(Promise.all.bind(Promise), tokenURIPromises);
    } catch (e) {
      // TODO: This isn't the right way to overcome this error. What to do?
      tokenURIs = [];
      for (let promises in tokenURIPromises) {
        tokenURIs.push("https://cantdecodestring.com")
      }
    }

    const tokenNamePromises = returnValues.map(() =>
      contract.methods.name().call()
    );
    const tokenNames = yield call(Promise.all.bind(Promise), tokenNamePromises);

    const tokenJSONPromises = tokenURIs.map(uri =>
      fetch(uri)
        .then(res => res.json())
        .catch(err => null)
    );
    const tokenJSON = yield call(Promise.all.bind(Promise), tokenJSONPromises);
    for (let i = 0; i < returnValues.length; i++) {
      returnValues[i].token = tokenJSON[i];
      returnValues[i].name = tokenNames[i];
      returnValues[i].contract = contractAddress;
    }

    return returnValues;
  }
}

export function* fetchTransactionsBatch(action) {
  const { address, contracts } = action.payload;
  let results;
  try {
    results = yield all(
      contracts.map(contract => call(fetchTransactions, address, contract))
    );
  } catch (err) {
    console.log(err)
    yield put(fetchTransactionsFailure(err));
  }
  const transactions = {};
  for (let [i, contract] of contracts.entries()) {
    transactions[contract] = results[i];
  }
  yield put(fetchTransactionsSuccess(transactions));
}

export function* fetchTransactionsWatcher() {
  yield takeEvery("FETCH_TRANSACTIONS_BEGIN", fetchTransactionsBatch)
}
