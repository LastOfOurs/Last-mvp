var WalletStorage = require('../../common/stores/walletStorage.js')
var WalletsStorage = require('../../common/stores/walletsStorage.js')
var WalletUtils = require('../../common/utils/wallet.js')

export async function addWallet(walletName, wallet, walletDescription = '') {
    WalletsStore.isLoading(true);
    WalletsStore.addWallet(walletName, wallet, walletDescription);
    WalletsStore.isLoading(false);
}

export async function loadWallets() {
    WalletsStorage.isLoading(true);
    const pks = await WalletsService.loadWalletPKs();
    pks.map(({ description, name, privateKey }) => {
        const wallet = WalletUtils.loadWalletFromPrivateKey(privateKey);
        WalletsStore.addWallet(name, wallet, description);
    });
    WalletsStore.isLoading(false);
}

export async function updateBalance(wallet) {
    const balance = await wallet.getBalance();
    WalletsStorage.setBalance(wallet.getAddress(), balance);
}

export async function removeWallet(wallet) {
    WalletsStorage.removeWallet(wallet);
}

export async function saveWallets() {
    await WalletsService.saveWalletPKs(WalletsStore.list);
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
