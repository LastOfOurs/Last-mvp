import SensitiveInfoStorage from 'react-native-sensitive-info';
import { Storage } from '../constants/storageConstants.js';

export function getItem(key) {
    return SensitiveInfoStorage.getItem(key, Storage.CONFIG).then(item => item || '');
}

export function setItem(key, value) {
    return SensitiveInfoStorage.setItem(key, value || '', Storage.CONFIG);
}