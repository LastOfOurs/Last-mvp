const WalletUtils = require('../common/utils/wallet')
const TransactionUtils = require('../common/utils/transactionUtils')
const Transactions = require('../common/services/transactionsService')
import ethers from 'ethers'

const WALLET_PK = '0xded62a7c46fc74fec0d1c79eff1cf940b2c9f6fdcd6e7361c2d9bc52c27afbe8' //Main wallet
const DESTINATION_ADDRESS = '0xf0925244aE28e7Bf4D213901D2a666AE3B9A85C1' //Test address

describe.skip('TransactionsService', () => {

  it('`sendTransaction` should break if wallet is invalid', async function() {
    const wallet = null
    const txn = {}
    try {
      await Transactions.sendTransaction(wallet, txn)
      fail('should have thrown an Error.')
    } catch (e) {
      expect(e.message).toBe('Invalid wallet')
    }
  })

  it('`sendTransaction` should break if transaction is invalid', async function() {
    const mnemonics = WalletUtils.generateMnemonics()
    const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
    try {
      await Transactions.sendTransaction(wallet, {})
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }

    try {
      await Transactions.sendTransaction(wallet, [])
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }

    try {
      await Transactions.sendTransaction(wallet, null)
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }
    
    try {
      await Transactions.sendTransaction(wallet, undefined)
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }
    
    try {
      await Transactions.sendTransaction(wallet, true)
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }
    
    try {
      await Transactions.sendTransaction(wallet, 'foo')
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }
    
    try {
      await Transactions.sendTransaction(wallet, 100)
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }
    
    try {
      await Transactions.sendTransaction(wallet, { value: 'foo', gasLimit: 'bar', to: null })
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid transaction') }
  })

  it('`sendTransaction` should break if the the wallet has insufficient funds', async function() {
    const mnemonics = WalletUtils.generateMnemonics()
    const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
    const txn = TransactionUtils.createTransaction(wallet.getAddress(), '5.0')
    try {
      await Transactions.sendTransaction(wallet, txn)
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('insufficient funds for gas * price + value') }
  })

  it('`sendTransaction` should send ether to some address when there are funds available', async function() {
    const wallet = WalletUtils.loadWalletFromPrivateKey(WALLET_PK)
    const to = DESTINATION_ADDRESS
    const value = '0.002'
    const transaction = TransactionUtils.createTransaction(to, value)
    try {
      const txn = await Transactions.sendTransaction(wallet, transaction)
      expect(txn.from).toBe(wallet.getAddress())
      expect(txn.to).toBe(to)
      expect(txn.value.toString()).toBe(ethers.utils.parseEther(value).toString())
    } catch (e) { fail(e) }
  })

  it('`sendEther` should break if the the destination address or the value are invalid', async function() {
    const mnemonics = WalletUtils.generateMnemonics()
    const wallet = WalletUtils.loadWalletFromMnemonics(mnemonics)
    try {
      await Transactions.sendEther(null, '0x12345', '5.0')
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid wallet') }

    try {
      await Transactions.sendEther(wallet, null, '5.0')
      fail('should have thrown an Error.')
    } catch (e) { expect(e.message).toBe('Invalid destination address') }
  })

  it('`sendEther` should send ether to some address when there are funds available', async function() {
    const wallet = WalletUtils.loadWalletFromPrivateKey(WALLET_PK)
    const to = DESTINATION_ADDRESS
    const value = '0.002'
    try {
      const txn = await Transactions.sendEther(wallet, to, value)
      expect(txn.from).toBe(wallet.getAddress())
      expect(txn.to).toBe(to)
      expect(txn.value.toString()).toBe(ethers.utils.parseEther(value).toString())
    } catch (e) { fail(e) }
  })
})