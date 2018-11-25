const API = require('../common/services/apiService')

describe('ApiService', () => {

    it('should be able to get the price conversion between ETH, USD, BRL, and EUR', async function() {
        try {
            const response = await API.getPrice()
            expect(response.status).toBe(200)
            expect(response.data.USD).toBeDefined()
            expect(response.data.USD).not.toBeNaN()
            expect(response.data.EUR).toBeDefined()
            expect(response.data.EUR).not.toBeNaN()
            expect(response.data.BRL).toBeDefined()
            expect(response.data.BRL).not.toBeNaN()
        } catch (e) {
            fail(e)
        }
    }, 20000)

    it('should be able to get the transaction history for an existing wallet address', async function() {
        try {
            const walletAddress = '0x1F632c9bf21AA2F3d4cDdE706348DAb3e5BF842c'
            const response = await API.getHistory(walletAddress)
            expect(response.status).toBe(200)
            expect(response.data.status).toBe('1')
            expect(response.data.result).toBeInstanceOf(Array)
            expect(response.data.result.length).toBeGreaterThan(0)
        } catch (e) {
            fail(e)
        }
    }, 20000)

    it('should be able to get an empty transaction history for an unexisting wallet address', async function() {
        try {
            const walletAddress = 'notavalidaddress'
            const response = await API.getHistory(walletAddress)
            expect(response.status).toBe(200)
            expect(response.data.status).toBe('0')
            expect(response.data.result).toBe('Error! Invalid address format')
        } catch (e) {
            fail(e)
        }
    })
})