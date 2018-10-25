import * as StorageService from './storageService'
import STORAGE_KEY from '../constants/walletConstants'

export async function loadWalletPKs() {
    const pks = await StorageService.getItem(Wallet.STORAGE_KEY)
    return pks ? JSON.parse(pks) : []
}

export async function saveWalletPKs(wallets) {
    const map = wallets.map(({ description, name, privateKey }) => ({ description, name, privateKey }))
    await StorageService.setItem(STORAGE_KEY, JSON.stringify(map))
}