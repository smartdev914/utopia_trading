/* eslint-disable no-restricted-syntax */
import { getUnixTime, parseISO } from 'date-fns'
import fromUnixTime from 'date-fns/fromUnixTime'
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'
// import getLastBlockSubscriptionId from './queries/getLastBlock'
import getSubscriptionId from './queries/subscription'
import getTransactionSubscriptionId from './queries/transactions'
import store from '../../../../redux/store'
import { setBuyTrades, setSellTrades } from '../../../../redux/reducers/tradeReducer'

const channelToSubscription = new Map()

let stompClient = null
let bitQuerySocket = null
let disconnectSet = false

const updateCandle = (trade, candle) => {
    const newCandle = {
        ...candle,
    }
    if (trade.quotePrice > candle.high) newCandle.high = trade.quotePrice
    if (trade.quotePrice < candle.low) newCandle.low = trade.quotePrice

    return newCandle
}

if (!bitQuerySocket) {
    bitQuerySocket = new SockJS('https://streaming.bitquery.io/stomp', null, {
        timeout: 5000,
    })
    stompClient = Stomp.over(bitQuerySocket)
    stompClient.reconnect = 5000
}

const successCB = () => {
    if (!disconnectSet) {
        if (window) {
            window.addEventListener('unload', () => {
                if (stompClient.connected) {
                    stompClient.disconnect()
                }
            })
            disconnectSet = true
        }
    }
}

const errorCB = () => {
    stompClient = Stomp.over(bitQuerySocket)
    stompClient.reconnect_delay = 3000
    stompClient.connect({}, successCB, errorCB)
}

stompClient.connect({}, successCB, errorCB)

export async function subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastDailyBar) {
    try {
        const [subIDBuy, subIDTransactions] = await Promise.all([
            getSubscriptionId(symbolInfo.address, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'),
            getTransactionSubscriptionId('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', symbolInfo.address),
            // getLastBlockSubscriptionId(),
        ])
        let lastTimeInterval = lastDailyBar?.time ? new Date(fromUnixTime(lastDailyBar.time / 1000)).toISOString() : new Date().toISOString()
        let nextTimeInterval = new Date((getUnixTime(parseISO(lastTimeInterval)) + parseInt(resolution, 10) * 60) * 1000).toISOString()
        const includeLastCandle = (timestamp) => getUnixTime(parseISO(lastTimeInterval)) >= getUnixTime(parseISO(timestamp)) < getUnixTime(parseISO(nextTimeInterval))
        const includeNextCandle = (timestamp) => getUnixTime(parseISO(timestamp)) >= getUnixTime(parseISO(nextTimeInterval))
        channelToSubscription.set(subscribeUID, subIDBuy)
        stompClient.subscribe(
            subIDBuy,
            (update) => {
                const data = JSON.parse(update.body).data.ethereum.dexTrades
                let lastCandle = lastDailyBar
                let nextCandle = {
                    time: getUnixTime(parseISO(nextTimeInterval)) * 1000,
                }
                for (let i = data.length - 1; i >= 0; i -= 1) {
                    if (includeLastCandle(data[i].block.timestamp.time)) {
                        const updatedCandle = updateCandle(data[i], lastCandle)
                        lastCandle = updatedCandle
                        if (i === 0) {
                            lastCandle.close = data[i].quotePrice
                            onRealtimeCallback(lastCandle)
                        }
                    }
                    if (includeNextCandle(data[i].block.timestamp.time)) {
                        if (i === 0) {
                            nextCandle.close = data[i].quotePrice
                            lastTimeInterval = new Date((getUnixTime(parseISO(lastTimeInterval)) + parseInt(resolution, 10) * 60) * 1000).toISOString()
                            nextTimeInterval = new Date((getUnixTime(parseISO(nextTimeInterval)) + parseInt(resolution, 10) * 60) * 1000).toISOString()
                            onRealtimeCallback(nextCandle)
                        }
                        if (includeLastCandle(data[i + 1] && data[i + 1].block.timestamp.time)) {
                            nextCandle.open = data[i].quotePrice
                            nextCandle.high = data[i].quotePrice
                            nextCandle.low = data[i].quotePrice
                        }
                        if ('open' in nextCandle) {
                            const newCandle = updateCandle(data[i], nextCandle)
                            nextCandle = newCandle
                        }
                    }
                }
                onResetCacheNeededCallback()
                nextCandle = {}
            },
            { id: subIDBuy }
        )

        stompClient.subscribe(
            subIDTransactions,
            (update) => {
                const data = JSON.parse(update.body).data.ethereum.dexTrades
                console.log(data)
                store.dispatch(setBuyTrades(data))
            },
            { id: subIDTransactions }
        )
    } catch (error) {
        console.log(error)
    }
}
export function unsubscribeFromStream(subscriberUID) {
    // console.log('Unsubbing from: ', subscriberUID)
    // console.log(channelToSubscription)
    // // const subID = channelToSubscription.get(subscriberUID)
    // // stompClient.unsubscribe(subID)
    // // channelToSubscription.delete(subscriberUID)
    // console.log(channelToSubscription)
    // for (const channelString of channelToSubscription.keys()) {
    //     console.log(channelString)
    //     // const handlerIndex = subscriptionItem.handlers.findIndex((handler) => handler.id === subscriberUID)
    //     // if (handlerIndex !== -1) {
    //     //     // remove from handlers
    //     //     subscriptionItem.handlers.splice(handlerIndex, 1)
    //     //     if (subscriptionItem.handlers.length === 0) {
    //     //         // unsubscribe from the channel, if it was the last handler
    //     //         console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString.toLowerCase())
    //     //         // socket.emit('SubRemove', { subs: [channelString] })
    //     //         channelToSubscription.delete(channelString.toLowerCase())
    //     //         break
    //     //     }
    //     // }
    // }
}
