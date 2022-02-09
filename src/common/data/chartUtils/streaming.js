/* eslint-disable no-restricted-syntax */
import BigNumber from 'bignumber.js'
import { getUnixTime, millisecondsToSeconds, parseISO } from 'date-fns'
import fromUnixTime from 'date-fns/fromUnixTime'
import { io } from 'socket.io-client'
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { parseFullSymbol } from './helpers'
import getLastBlockSubscriptionId from './queries/getLastBlock'
import getSubscriptionId from './queries/subscription'

// const socket = io('https://price-retriever-dot-utopia-315014.uw.r.appspot.com', { origins: '*', transports: ['websocket'] })
// // const socket = io('localhost:3001'); // For local testing

const channelToSubscription = new Map()

// socket.on('connect', () => {
//     console.log('[socket] Connected')
// })

// socket.on('disconnect', (reason) => {
//     console.log('[socket] Disconnected:', reason)
// })

// socket.on('error', (error) => {
//     console.log('[socket] Error:', error)
// })
let stompClient = null
// const bitQuerySocket = new SockJS('https://streaming.bitquery.io/stomp')
// stompClient = Stomp.over(bitQuerySocket)
// stompClient.reconnect = 5000

const updateCandle = (trade, candle) => {
    if (trade.quotePrice > candle.high) candle.high = trade.quotePrice
    if (trade.quotePrice < candle.low) candle.low = trade.quotePrice
}
export async function subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastDailyBar) {
    const bitQuerySocket = new SockJS('https://streaming.bitquery.io/stomp')
    stompClient = Stomp.over(bitQuerySocket)
    stompClient.reconnect = 5000
    const [subID, lastBlockSubID] = await Promise.all([getSubscriptionId(symbolInfo.address, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'), getLastBlockSubscriptionId()])
    console.log(lastDailyBar)
    let lastTimeInterval = new Date(fromUnixTime(lastDailyBar.time / 1000)).toISOString()
    let nextTimeInterval = new Date((getUnixTime(parseISO(lastTimeInterval)) + parseInt(resolution, 10) * 60) * 1000).toISOString()
    console.log({ lastTimeInterval, nextTimeInterval })
    const includeLastCandle = (timestamp) => getUnixTime(parseISO(lastTimeInterval)) >= getUnixTime(parseISO(timestamp)) < getUnixTime(parseISO(nextTimeInterval))
    const includeNextCandle = (timestamp) => getUnixTime(parseISO(timestamp)) >= getUnixTime(parseISO(nextTimeInterval))
    const successCB = (frame) => {
        stompClient.subscribe(subID, (update) => {
            const data = JSON.parse(update.body).data.ethereum.dexTrades

            const lastCandle = lastDailyBar
            let nextCandle = {
                time: getUnixTime(parseISO(nextTimeInterval)) * 1000,
            }
            for (let i = data.length - 1; i >= 0; i -= 1) {
                if (includeLastCandle(data[i].block.timestamp.time)) {
                    updateCandle(data[i], lastCandle)
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
                        updateCandle(data[i], nextCandle)
                    }
                }
            }
            onResetCacheNeededCallback()
            nextCandle = {}
        })
    }

    const errorCB = () => {
        stompClient = Stomp.over(bitQuerySocket)
        stompClient.reconnect = 5000
        stompClient.connect({}, successCB, errorCB)
    }

    stompClient.connect({}, successCB, errorCB)
}

// socket.on('m', (data) => {
//     console.log('[socket] Message:', data)
//     const [eventTypeStr, exchange, fromSymbol, toSymbol, , , tradeTimeStr, , tradePriceClose, tradePriceOpen, tradePriceLow, tradePriceHigh] = data.split('~')

//     if (parseInt(eventTypeStr, 10) !== 0) {
//         // skip all non-TRADE events
//         return
//     }
//     const tradePriceC = new BigNumber(tradePriceClose)
//     const tradePriceO = new BigNumber(tradePriceOpen)
//     const tradePriceL = new BigNumber(tradePriceLow)
//     const tradePriceH = new BigNumber(tradePriceHigh)
//     const tradeTime = parseInt(tradeTimeStr, 10)
//     const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`
//     const subscriptionItem = channelToSubscription.get(channelString.toLowerCase())
//     if (subscriptionItem === undefined) {
//         return
//     }
//     const { lastDailyBar } = subscriptionItem
//     let bar
//     if (tradeTime >= millisecondsToSeconds(lastDailyBar?.time)) {
//         bar = {
//             time: tradeTime * 1000,
//             open: tradePriceO.toFixed(),
//             high: tradePriceH.toFixed(),
//             low: tradePriceL.toFixed(),
//             close: tradePriceC.toFixed(),
//         }
//         // console.log('[socket] Generate new bar', bar)
//     } else {
//         bar = {
//             ...lastDailyBar,
//             high: Math.max(lastDailyBar?.high, tradePriceH.toFixed()),
//             low: Math.min(lastDailyBar?.low, tradePriceL.toFixed()),
//             close: tradePriceC.toFixed(),
//         }
//         console.log('[socket] Update the latest bar by price', tradePriceC.toFixed())
//     }

//     subscriptionItem.lastDailyBar = bar

//     // send data to every subscriber of that symbol
//     subscriptionItem.handlers.forEach((handler) => handler.callback(bar))
// })
export function unsubscribeFromStream(subscriberUID) {
    // find a subscription with id === subscriberUID

    for (const channelString of channelToSubscription.keys()) {
        const subscriptionItem = channelToSubscription.get(channelString.toLowerCase())
        const handlerIndex = subscriptionItem.handlers.findIndex((handler) => handler.id === subscriberUID)

        if (handlerIndex !== -1) {
            // remove from handlers
            subscriptionItem.handlers.splice(handlerIndex, 1)

            if (subscriptionItem.handlers.length === 0) {
                // unsubscribe from the channel, if it was the last handler
                console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString.toLowerCase())
                // socket.emit('SubRemove', { subs: [channelString] })
                channelToSubscription.delete(channelString.toLowerCase())
                break
            }
        }
    }
}
