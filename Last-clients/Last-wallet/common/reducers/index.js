import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  // contracts: addTokenReducer,
  // contractMetadata: addNameAndSymbol
})

export default rootReducer