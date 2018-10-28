// import ApiService from '../services/apiService'
var ApiService = require('../services/apiService')
var PricesStorage = require('../stores/pricesStorage')

export async function getPrice() {
    PricesStorage.isLoading(true)
    const { data } = await ApiService.getPrice()
    PricesStorage.setUSDRate(data.USD)
    PricesStorage.setEURRate(data.EUR)
    PricesStorage.setBRLRate(data.BRL)
    PricesStorage.isLoading(false)
}