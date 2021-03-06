import Snackbar from 'react-native-snackbar'
import * as store from '../stores'

export async function notify(title, duration, driver=Snackbar) {
    switch (duration) {

        case 'long':
            duration = driver.LENGTH_LONG
            break;

        case 'indefinite':
            duration = driver.LENGTH_INDEFINITE
            break

        case 'short':
        default:
            duration = driver.LENGTH_SHORT
            break
    }
    
    driver.show({ title, duration })
}

export function eraseAllData() {
    store.prices.reset()
    store.recents.reset()
    store.wallet.reset()
    store.wallets.reset()
}

// The above code utilizes the react-native SnackBar library which only works after ejecting the app //