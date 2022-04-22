/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const dexTradesSlice = createSlice({
    name: 'dexTrades',
    initialState: {
        buyTrades: [],
        sellTrades: [],
    },
    reducers: {
        setBuyTrades: (state, action) => {
            state.buyTrades = action.payload
        },
        setSellTrades: (state, action) => {
            state.sellTrades = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setBuyTrades, setSellTrades } = dexTradesSlice.actions

export default dexTradesSlice.reducer
