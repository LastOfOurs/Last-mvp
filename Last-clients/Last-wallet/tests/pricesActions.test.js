const PricesActions = require('../common/actions/pricesActions')
import PricesStorage from '../common/stores/pricesStorage'

describe('PricesActions', () => {

    it('should add the prices to storage', async function() {
        try {
            await PricesActions.getPrice()
            expect(PricesStorage.usd).toBeGreaterThan(0)
            expect(PricesStorage.eur).toBeGreaterThan(0)
        } catch (e) {
            fail(e)
        }
    }, 20000)
})