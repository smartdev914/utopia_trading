import axios from 'axios'
import BigNumber from 'bignumber.js'

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
        return BNpriceInUSD.dividedBy(BNUSDInBNB).toFormat(10)
    }
    return BNpriceInUSD.dividedBy(BNUSDInBNB).toFormat(2)
}
