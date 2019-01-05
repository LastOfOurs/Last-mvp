import WalletStorage from '../common/stores/walletStorage'
import ethers from 'ethers'
const TransactionUtils = require('../common/utils/transactionUtils')
const WalletUtils = require('../common/utils/wallet')
const TransactionActions = require('../common/actions/transactionActions')

const WALLET_PK = '0xded62a7c46fc74fec0d1c79eff1cf940b2c9f6fdcd6e7361c2d9bc52c27afbe8' //Main wallet
const DESTINATION_ADDRESS = '0xf0925244aE28e7Bf4D213901D2a666AE3B9A85C1' //Test address

describe('TransactionActions', () => {

  beforeEach(() => WalletStorage.reset())

  it('`sendEther` should break if the the destination address or value are invalid', async function() {
    const mnemonics = WalletUtils.generateMnemonics()
    const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
    try {
      await TransactionActions.sendEther(null, '0x12345', '5.0')
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid wallet') }

    try {
      await TransactionActions.sendEther(wallet, null, '5.0')
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid destination address') }
  })

  it.skip('`sendEther` should send ether to some address when there are funds available', async function() {
    jest.setTimeout(60000);
    const wallet = WalletUtils.loadWalletFromPrivateKey(WALLET_PK)
    const value = '0.002'
    try {
      const txn = await TransactionActions.sendEther(wallet, DESTINATION_ADDRESS, value)
      expect(txn.from).toBe(wallet.getAddress())
      expect(txn.to).toBe(DESTINATION_ADDRESS)
      expect(txn.value.toString()).toBe(ethers.utils.parseEther(value).toString())
      expect(WalletStorage.history.length).toBe(1)
    } catch (e) { fail(e) }
  })

  it('`sendTransaction` should break if the the wallet or the transaction is invalid', async function() {
    const mnemonics = WalletUtils.generateMnemonics()
    const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
    try {
      await TransactionActions.sendTransaction(null)
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid wallet') }

    try {
      await TransactionActions.sendEther(wallet, {})
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid destination address') }
  })

  it.skip('`sendTransaction` should send ether to some address when there are funds available', async function() {
    jest.setTimeout(60000)
    const wallet = WalletUtils.loadWalletFromPrivateKey(WALLET_PK)
    const value = '0.002'
    let txn = TransactionUtils.createTransaction(DESTINATION_ADDRESS, value)
    try {
      txn = await TransactionActions.sendTransaction(wallet, txn)
      expect(txn.from).toBe(wallet.getAddress())
      expect(txn.to).toBe(DESTINATION_ADDRESS)
      expect(txn.value.toString()).toBe(ethers.utils.parseEther(value).toString())
      expect(WalletStorage.history.length).toBe(1)
    } catch (e) { fail(e) }
  })
})