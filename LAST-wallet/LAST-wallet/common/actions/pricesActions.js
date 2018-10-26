import ApiService from '../services/apiService'
import PricesStorage from '../stores/pricesStorage'

export async function getPrice() {
    PricesStore.isLoading(true);
    const { data } = await ApiService.getPrice();
    PricesStorage.setUSDRate(data.USD);
    PricesStorage.setEURRate(data.EUR);
    PricesStorage.setBRLRate(data.BRL);
    PricesStorage.isLoading(false);
}