import { configureStore } from '@reduxjs/toolkit'
import tradeReducer from './reducers/tradeReducer'

export default configureStore({
    reducer: {
        trades: tradeReducer,
    },
})
