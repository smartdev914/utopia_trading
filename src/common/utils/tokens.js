import axios from 'axios'
import BigNumber from 'bignumber.js'
import pancakeFactoryABI from 'ABI/pancakeFactoryABI'
import { getContract, getContractNoABI } from './getContract'
import { getBalanceAmount } from './numbers'

const pancakeSwapFactoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
/* eslint-disable no-underscore-dangle */
export const calculateSlippage = async (tokenContract) => {
    let totalSlippage = 0
    if (tokenContract) {
        const feeNames = [
            '_liquidityFee',
            '_charityFee',
            '_marketingAndDevFee',
            '_redistributionFee',
            ...(tokenContract?.address?.toLowerCase() !== '0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c'.toLowerCase() ? ['_taxFee'] : []),
        ]
        const feePromises = []
        if (tokenContract && tokenContract?.address?.toLowerCase() !== '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()) {
            // eslint-disable-next-line no-restricted-syntax
            for (const method of feeNames) {
                if (tokenContract[method]) {
                    feePromises.push(tokenContract[method]())
                }
            }
            await Promise.all(feePromises).then((result) => {
                const total = result?.reduce((p, c) => parseFloat(p) + new BigNumber(c, 16).toNumber(), 0)
                totalSlippage += total
            })
        }
    }

    return totalSlippage < 100 ? totalSlippage : null
}

export const getTokenPriceInUSD = async (tokenAddress, decimals) => {
    try {
        const usdToBnb = await axios.get(`https://price-retriever-dot-utopia-315014.uw.r.appspot.com/retrievePrice/0x55d398326f99059fF775485246999027B3197955`, {
            timeout: 4000,
        })

        if (tokenAddress.toLowerCase() === '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'.toLowerCase()) {
            return new BigNumber(1).dividedBy(new BigNumber(usdToBnb.data)).toFixed(10)
        }

        const pricingResponse = await axios.get(`https://price-retriever-dot-utopia-315014.uw.r.appspot.com/retrievePrice/${tokenAddress}`, { timeout: 4000 })
        const BNpriceInUSD = new BigNumber(pricingResponse.data)
        const BNUSDInBNB = new BigNumber(usdToBnb.data)
        if (decimals === 9) {
            return BNpriceInUSD.dividedBy(BNUSDInBNB).toFixed(10)
        }
        return BNpriceInUSD.dividedBy(BNUSDInBNB).toFixed(10)
    } catch (err) {
        return 0
    }
}

const getAmountOut = (amountIn, reserveIn, reserveOut) => {
    const amountInBN = new BigNumber(amountIn)
    const amountInWithFee = amountInBN.multipliedBy(9975)
    const numerator = amountInWithFee.multipliedBy(new BigNumber(reserveOut.toString()))

    const reserveInBN = new BigNumber(reserveIn.toString())
    const denominator = reserveInBN.multipliedBy(10000).plus(amountInWithFee)
    return numerator.dividedBy(denominator)
}

export const getPancakeFactoryPair = async (tokenAAddress, tokenBAddress) => {
    const currentContract = getContract(pancakeFactoryABI, pancakeSwapFactoryAddress)
    const tokenPair = await currentContract.getPair(tokenAAddress, tokenBAddress)
    if (tokenPair && tokenPair !== '0x0000000000000000000000000000000000000000') {
        const pairContract = await getContractNoABI(tokenPair)
        return pairContract
    }
    return null
}

export const getQuote = async (tokenPair, tokenA, tokenB, amountIn) => {
    if (tokenPair && amountIn) {
        const token0 = await tokenPair.token0()
        const reserves = await tokenPair.getReserves()
        if (token0.toLowerCase() === tokenA.address.toLowerCase()) {
            const quote = getBalanceAmount(getAmountOut(amountIn, reserves[0], reserves[1]), tokenB.decimals)

            return tokenB.decimals === 9 ? quote.toFixed(0) : quote.toFixed(12)
        }
        const quote = getBalanceAmount(getAmountOut(amountIn, reserves[1], reserves[0]), tokenB.decimals)
        return tokenB.decimals === 9 ? quote.toFixed(0) : quote.toFixed(12)
    }
    return 0
}
