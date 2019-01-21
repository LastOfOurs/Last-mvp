import { action, observable } from 'mobx'
// var TransactionUtils = require('../../common/utils/transactionUtils.js')
import ethers from 'ethers'

const INITIAL = {
    item: null,
    history: [],
    pendingTransactions: [],
    loading: false,
    NFTs: [],
}

export class WalletStorage {

    @observable item = INITIAL.item
    @observable history = INITIAL.history
    @observable pendingTransactions = INITIAL.pendingTransactions
    @observable loading = INITIAL.loading

    @action isLoading(state) {
        this.loading = Boolean(state)
    }

    @action select(wallet) {
        if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid Wallet')
        this.item = wallet
    }

    @action setHistory(history) {
        if (!this.item) throw new Error(`Can't update the history. No wallet was selected.`)
        if (!(history instanceof Array)) throw new Error('The history must be an array.')
        this.history = history
    }

    @action setNFTs(NFTs) {
        if (!this.item) throw new Error(`Can't load NFTs. No wallet was selected.`)
        if (!(NFTs instanceof Array)) throw new Error('The NFTs must be in an array.')
        this.NFTs = NFTs
        console.log(this.NFTs)
    }

    @action setEggBalance(balance) {
        if (!this.item) throw new Error(`Can't fetch egg balance. No wallet was selected.`)
        // if (!(NFTs instanceof Array)) throw new Error('The NFTs must be in an array.')
        this.eggBalance = balance
        console.log('This wallet\'s egg balance is ' + this.eggBalance)
    }

    @action addPendingTransaction(txn) {
        this.pendingTransactions.push(txn)
    }

    @action moveToHistory(txn) {
        const pending = this.pendingTransactions.filter(tx => txn.hash !== tx.hash)
        this.pendingTransactions = pending
        this.history.push(txn)
    }

    @action reset() {
        this.item = INITIAL.item
        this.history = INITIAL.history
        this.pendingTransactions = INITIAL.pendingTransactions
        this.loading = INITIAL.loading
    }
}

export default new WalletStorage()