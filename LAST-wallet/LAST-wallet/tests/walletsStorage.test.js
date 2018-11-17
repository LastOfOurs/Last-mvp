import { WalletsStorage } from '../common/stores/walletsStorage'
const WalletUtils = require('../common/utils/wallet')

describe('WalletsStorage', () => {

    let walletsStore

    beforeEach(() => walletsStore = new WalletsStorage())

    it('should be able to update the loading status', () => {
        walletsStore.isLoading(true)
        expect(walletsStore.loading).toBe(true)
    })
    
    it('should be able to add a new wallet to the store list', () => {
        const mnemonics = WalletUtils.generateMnemonics()
        const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
        expect(walletsStore.list.length).toBe(0)
        walletsStore.addWallet('walletName', wallet, 'description')
        expect(walletsStore.list.length).toBe(1)
        expect(walletsStore.list[0].name).toBe('walletName')
        expect(walletsStore.list[0].description).toBe('description')
        expect(walletsStore.list[0].getAddress()).toBe(wallet.getAddress())
    })
    
    it('should be able to the balance of a selected wallet', () => {
        const mnemonics1 = WalletUtils.generateMnemonics()
        const wallet1 = WalletUtils.loadWalletFromMnemonics(mnemonics1)
        const mnemonics2 = WalletUtils.generateMnemonics()
        const wallet2 = WalletUtils.loadWalletFromMnemonics(mnemonics2)
        walletsStore.addWallet('wallet1', wallet1)
        walletsStore.addWallet('wallet2', wallet2)
        expect(walletsStore.list.length).toBe(2)
        expect(walletsStore.list[1].getAddress()).toBe(wallet2.getAddress())
        walletsStore.setBalance(wallet2.getAddress(), 100)
        expect(walletsStore.list[1].balance).toBe(100)
    })
    
    it('should be able to remove selected wallet from the wallet store', () => {
        const mnemonics = WalletUtils.generateMnemonics()
        const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
        walletsStore.addWallet('wallet1', wallet)
        expect(walletsStore.list.length).toBe(1)
        walletsStore.removeWallet(wallet)
        expect(walletsStore.list.length).toBe(0)
    })
    
    it('should be able to reset the storage state', () => {
        const mnemonics = WalletUtils.generateMnemonics()
        const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
        expect(walletsStore.list.length).toBe(0)
        walletsStore.addWallet('wallet1', wallet)
        walletsStore.isLoading(true)
        walletsStore.reset()
        expect(walletsStore.list.length).toBe(0)
        expect(walletsStore.loading).toBeFalsy()
    })
})