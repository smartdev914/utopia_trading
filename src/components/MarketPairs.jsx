import SearchAutocomplete from 'common/components/SearchAutocomplete'
import TokenContext from 'context/TokenContext'
import React, { useContext } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

export default function MarketPairs() {
    const tokenContext = useContext(TokenContext)

    const options = supportedPancakeTokens.tokens.map((token) => ({
        text: token.name,
        value: token,
        icon: token.logoURI,
        key: token.address,
        searchBy: [token.address, token.symbol, token.name],
    }))

    return (
        <div className="market-pairs">
            <div className="input-group">
                <SearchAutocomplete searchOptions={options} onSelect={(e) => tokenContext.setCurrentlySelectedToken(e)} />
            </div>
            <div className="selected-token">
                <img src={tokenContext.currentlySelectedToken.logoURI} alt="token logo" />
                <div className="selected-token-info">
                    <span>{`${tokenContext.currentlySelectedToken.name} (${tokenContext.currentlySelectedToken.symbol} / BNB)`}</span>
                    <span className="price">{`$${tokenContext.currentTokenPriceInUSD ? tokenContext.currentTokenPriceInUSD : '-'}`}</span>
                </div>
            </div>
        </div>
    )
}
