import ethers from 'ethers'
// import { notify } from './generalActions'
var TransactionsService = require('../services/transactionsService')
import WalletStore from '../stores/walletStorage'

//ERC721
export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN"
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS"
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE"

export const fetchTransactionsBegin = (address, contracts) => ({
  type: FETCH_TRANSACTIONS_BEGIN,
  payload: { address, contracts }
})

export const fetchTransactionsSuccess = transactions => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions }
})

export const fetchTransactionsFailure = error => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
})

async function waitForTransaction(wallet, txn) {
  await wallet.provider.waitForTransaction(txn.hash)
  WalletStore.moveToHistory(txn)
  console.log('transaction confirmed')
  // notify('Transaction confirmed')
}

export async function sendEther(wallet, destination, amount, options) {
  const txn = await TransactionsService.sendEther(wallet, destination, amount, options)
  WalletStore.addPendingTransaction(txn)
  waitForTransaction(wallet, txn)
  return txn
}

export async function sendTransaction(wallet, txn) {
  if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet')
  txn = await TransactionsService.sendTransaction(wallet, txn)
  WalletStore.addPendingTransaction(txn)
  waitForTransaction(wallet, txn)
  return txn
}