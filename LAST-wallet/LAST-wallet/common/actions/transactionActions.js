import ethers from 'ethers'
import { notify } from './generalActions'
import WalletStore from '../stores/walletStorage'
import TransactionsService from '../services/transactionsService'

async function waitForTransaction(wallet, txn) {
  await wallet.provider.waitForTransaction(txn.hash);
  WalletStore.moveToHistory(txn);
  notify('Transaction confirmed');
}

export async function sendEther(wallet, destination, amount, options) {
  const txn = await TransactionsService.sendEther(wallet, destination, amount, options);
  WalletStore.addPendingTransaction(txn);
  waitForTransaction(wallet, txn);
  return txn;
}

export async function sendTransaction(wallet, txn) {
  if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet');
  txn = await TransactionsService.sendTransaction(wallet, txn);
  WalletStore.addPendingTransaction(txn);
  waitForTransaction(wallet, txn);
  return txn;
}