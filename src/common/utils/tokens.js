import { useContext } from 'react'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import pancakeFactoryABI from 'ABI/pancakeFactoryABI'
import BSCContext from '../../context/BSCContext'
import getContract from './getContract'
import { getBalanceAmount } from './numbers'

const Contract = require('web3-eth-contract')
// set provider for all later instances to use
Contract.setProvider('wss://ws-nd-219-979-765.p2pify.com/c2317b27ad9bde72c2d30764cf359fa3')

const pancakeSwapFactoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
/* eslint-disable no-underscore-dangle */
export const calculateSlippage = async (tokenContract) => {
    const feeNames = [
        '_liquidityFee',
        '_charityFee',
        '_marketingAndDevFee',
        '_redistributionFee',
        ...(tokenContract?._address.toLowerCase() !== '0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c'.toLowerCase() ? ['_taxFee'] : []),
    ]
    const feePromises = []
    let totalSlippage = 0
    if (tokenContract && tokenContract?._address.toLowerCase() !== '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()) {
        // eslint-disable-next-line no-restricted-syntax
        for (const method of feeNames) {
            if (tokenContract.methods[method]) {
                feePromises.push(tokenContract.methods[method]().call())
            }
        }
        await Promise.all(feePromises).then((result) => {
            const total = result?.reduce((p, c) => parseFloat(p) + parseFloat(c), 0)
            totalSlippage += total
        })
    }
    return totalSlippage
}

export const getTokenPriceInUSD = async (tokenAddress, decimals) => {
    const pricingResponse = await axios.get(`https://price-retriever-dot-utopia-315014.uw.r.appspot.com/retrievePrice/${tokenAddress}`)
    const usdToBnb = await axios.get(`https://price-retriever-dot-utopia-315014.uw.r.appspot.com/retrievePrice/0x55d398326f99059fF775485246999027B3197955`)
    const BNpriceInUSD = new BigNumber(pricingResponse.data)
    const BNUSDInBNB = new BigNumber(usdToBnb.data)
    if (decimals === 9) {
        return BNpriceInUSD.dividedBy(BNUSDInBNB).toFixed(10)
    }
    return BNpriceInUSD.dividedBy(BNUSDInBNB).toFixed(3)
}

const getAmountOut = (amountIn, reserveIn, reserveOut) => {
    const amountInBN = new BigNumber(amountIn)
    const amountInWithFee = amountInBN.multipliedBy(9975)
    const numerator = amountInWithFee.multipliedBy(new BigNumber(reserveOut))

    const reserveInBN = new BigNumber(reserveIn)
    const denominator = reserveInBN.multipliedBy(10000).plus(amountInWithFee)
    return numerator.dividedBy(denominator)
}

const getPancakeFactoryPair = async (tokenA, tokenB) => {
    const currentContract = new Contract(pancakeFactoryABI, pancakeSwapFactoryAddress)
    const tokenPair = await currentContract.methods.getPair(tokenA.address, tokenB.address).call()
    const pairContract = await getContract(tokenPair)
    return pairContract
}

export const getQuote = async (tokenA, tokenB, amountIn) => {
    const tokenPair = await getPancakeFactoryPair(tokenA, tokenB)
    if (tokenPair && amountIn) {
        const token0 = await tokenPair.methods.token0().call()
        const reserves = await tokenPair.methods.getReserves().call()
        if (token0.toLowerCase() === tokenA.address.toLowerCase()) {
            const quote = getBalanceAmount(getAmountOut(amountIn, reserves[0], reserves[1]), tokenB.decimals)
            return tokenB.decimals === 9 ? quote.toFixed(0) : quote.toFixed(8)
        }
        const quote = getBalanceAmount(getAmountOut(amountIn, reserves[1], reserves[0]), tokenB.decimals)
        return tokenB.decimals === 9 ? quote.toFixed(0) : quote.toFixed(8)
    }
    return 0
}
