var WalletsService = require('../services/walletsService.js')
import ApiService from '../services/apiService'
import WalletsStorage from '../stores/walletsStorage'
import WalletStorage from '../stores/walletStorage'

export async function addWallet(walletName, wallet, walletDescription='') {
    WalletsStorage.isLoading(true);
    WalletsStorage.addWallet(walletName, wallet, walletDescription);
    WalletsStorage.isLoading(false);
}

export async function loadWallets() {
    WalletsStorage.isLoading(true)
    const pks = await WalletsService.loadWalletPKs();
    pks.map(({ description, name, privateKey }) => {
        const wallet = WalletUtils.loadWalletFromPrivateKey(privateKey);
        WalletsStorage.addWallet(name, wallet, description);
    });
    WalletsStorage.isLoading(false);
}

export async function updateBalance(wallet) {
    const balance = await wallet.getBalance();
    WalletsStorage.setBalance(wallet.getAddress(), balance);
}

export async function removeWallet(wallet) {
    WalletsStorage.removeWallet(wallet);
}

export async function saveWallets() {
    await WalletsService.saveWalletPKs(WalletsStorage.list);
}

export async function selectWallet(wallet) {
    WalletStorage.select(wallet);
}

export async function updateHistory(wallet) {
    WalletStorage.isLoading(true);
    const { data } = await ApiService.getHistory(wallet.getAddress());
    if (data.status == 1) WalletStorage.setHistory(data.result);
    WalletStorage.isLoading(false);
}
