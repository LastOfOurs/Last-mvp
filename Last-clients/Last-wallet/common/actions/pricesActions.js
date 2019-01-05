var ApiService = require('../services/apiService')
import PricesStorage from '../stores/pricesStorage'

//Fetches the price from CryptoCompare
export async function getPrice() {
    PricesStorage.isLoading(true)
    const { data } = await ApiService.getPrice()
    PricesStorage.setUSDRate(data.USD)
    PricesStorage.setEURRate(data.EUR)
    PricesStorage.isLoading(false)
}