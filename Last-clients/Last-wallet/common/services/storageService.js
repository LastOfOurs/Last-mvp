// import SInfo from 'react-native-sensitive-info';
// // import { Storage } from '../constants/storageConstants.js';
// import CONFIG from '../constants/storageConstants.js';

// export function getItem(key) {
//     return SInfo.getItem(key, CONFIG).then(item => item || '');
// }

// export function setItem(key, value) {
//     return SInfo.setItem(key, value || '', CONFIG);
// }


// --- The above code can only be used once app has been ejected, the below works for Expo --- //


import { SecureStore } from 'expo'
import CONFIG from '../constants/storageConstants.js'

export function getItem(key) {
    return SecureStore.getItemAsync(key, CONFIG).then(item => item || '')
}

export function setItem(key, value) {
    return SecureStore.setItemAsync(key, value || '', CONFIG)
}