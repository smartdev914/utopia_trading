/* eslint-disable no-restricted-syntax */
import BigNumber from 'bignumber.js'
import { millisecondsToSeconds } from 'date-fns'
import { io } from 'socket.io-client'
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { parseFullSymbol } from './helpers'

const socket = io('https://price-retriever-dot-utopia-315014.uw.r.appspot.com', { origins: '*', transports: ['websocket'] })
// const socket = io('localhost:3001'); // For local testing

const channelToSubscription = new Map()

socket.on('connect', () => {
    console.log('[socket] Connected')
})

socket.on('disconnect', (reason) => {
    console.log('[socket] Disconnected:', reason)
})

socket.on('error', (error) => {
    console.log('[socket] Error:', error)
})

let stompClient = null

const bitQuerySocket = new SockJS('https://streaming.bitquery.io/stomp')
stompClient = Stomp.over(bitQuerySocket)
stompClient.connect({}, (frame) => {
    stompClient.subscribe('<PLACE subId HERE!!>', (update) => {
        showUpdate(update.body)
    })
})

export function subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastDailyBar) {
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name)
    const channelString = `0~${parsedSymbol.exchange}~${symbolInfo.address}~0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
    const handler = {
        id: subscribeUID,
        callback: onRealtimeCallback,
    }

    let subscriptionItem = channelToSubscription.get(channelString.toLowerCase())
    if (subscriptionItem) {
        // already subscribed to the channel, use the existing subscription
        subscriptionItem.handlers.push(handler)
        return
    }
    subscriptionItem = {
        subscribeUID,
        resolution,
        lastDailyBar,
        handlers: [handler],
    }
    channelToSubscription.set(channelString.toLowerCase(), subscriptionItem)
    console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString)
    socket.emit('SubAdd', { subs: [channelString] })
}

socket.on('m', (data) => {
    console.log('[socket] Message:', data)
    const [eventTypeStr, exchange, fromSymbol, toSymbol, , , tradeTimeStr, , tradePriceClose, tradePriceOpen, tradePriceLow, tradePriceHigh] = data.split('~')

    if (parseInt(eventTypeStr, 10) !== 0) {
        // skip all non-TRADE events
        return
    }
    const tradePriceC = new BigNumber(tradePriceClose)
    const tradePriceO = new BigNumber(tradePriceOpen)
    const tradePriceL = new BigNumber(tradePriceLow)
    const tradePriceH = new BigNumber(tradePriceHigh)
    const tradeTime = parseInt(tradeTimeStr, 10)
    const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`
    const subscriptionItem = channelToSubscription.get(channelString.toLowerCase())
    if (subscriptionItem === undefined) {
        return
    }
    const { lastDailyBar } = subscriptionItem
    let bar
    if (tradeTime >= millisecondsToSeconds(lastDailyBar?.time)) {
        bar = {
            time: tradeTime * 1000,
            open: tradePriceO.toFixed(),
            high: tradePriceH.toFixed(),
            low: tradePriceL.toFixed(),
            close: tradePriceC.toFixed(),
        }
        // console.log('[socket] Generate new bar', bar)
    } else {
        bar = {
            ...lastDailyBar,
            high: Math.max(lastDailyBar?.high, tradePriceH.toFixed()),
            low: Math.min(lastDailyBar?.low, tradePriceL.toFixed()),
            close: tradePriceC.toFixed(),
        }
        console.log('[socket] Update the latest bar by price', tradePriceC.toFixed())
    }

    subscriptionItem.lastDailyBar = bar

    // send data to every subscriber of that symbol
    subscriptionItem.handlers.forEach((handler) => handler.callback(bar))
})
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
                socket.emit('SubRemove', { subs: [channelString] })
                channelToSubscription.delete(channelString.toLowerCase())
                break
            }
        }
    }
}
