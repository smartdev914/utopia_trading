/* eslint-disable no-restricted-syntax */
import { getUnixTime, parseISO } from 'date-fns'
import fromUnixTime from 'date-fns/fromUnixTime'
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import getLastBlockSubscriptionId from './queries/getLastBlock'
import getSubscriptionId from './queries/subscription'

const channelToSubscription = new Map()

let stompClient = null

const updateCandle = (trade, candle) => {
    const newCandle = {
        ...candle,
    }
    if (trade.quotePrice > candle.high) newCandle.high = trade.quotePrice
    if (trade.quotePrice < candle.low) newCandle.low = trade.quotePrice

    return newCandle
}
export async function subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastDailyBar) {
    const bitQuerySocket = new SockJS('https://streaming.bitquery.io/stomp', null, {
        timeout: 5000,
    })
    stompClient = Stomp.over(bitQuerySocket)
    stompClient.reconnect_delay = 3000
    const [subID, lastBlockSubID] = await Promise.all([getSubscriptionId(symbolInfo.address, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'), getLastBlockSubscriptionId()])
    let lastTimeInterval = new Date(fromUnixTime(lastDailyBar.time / 1000)).toISOString()
    let nextTimeInterval = new Date((getUnixTime(parseISO(lastTimeInterval)) + parseInt(resolution, 10) * 60) * 1000).toISOString()
    const includeLastCandle = (timestamp) => getUnixTime(parseISO(lastTimeInterval)) >= getUnixTime(parseISO(timestamp)) < getUnixTime(parseISO(nextTimeInterval))
    const includeNextCandle = (timestamp) => getUnixTime(parseISO(timestamp)) >= getUnixTime(parseISO(nextTimeInterval))
    channelToSubscription.set(subscribeUID, subID)
    const successCB = (frame) => {
        stompClient.subscribe(
            subID,
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
            { id: subID }
        )
    }

    const errorCB = () => {
        stompClient = Stomp.over(bitQuerySocket)
        stompClient.reconnect_delay = 3000
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
    const subID = channelToSubscription.get(subscriberUID)

    for (const channelString of channelToSubscription.keys()) {
        console.log(channelString)

        // const handlerIndex = subscriptionItem.handlers.findIndex((handler) => handler.id === subscriberUID)

        // if (handlerIndex !== -1) {
        //     // remove from handlers
        //     subscriptionItem.handlers.splice(handlerIndex, 1)

        //     if (subscriptionItem.handlers.length === 0) {
        //         // unsubscribe from the channel, if it was the last handler
        //         console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString.toLowerCase())
        //         // socket.emit('SubRemove', { subs: [channelString] })
        //         channelToSubscription.delete(channelString.toLowerCase())
        //         break
        //     }
        // }
    }
}
