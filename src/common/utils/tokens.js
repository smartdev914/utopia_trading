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

export default []
