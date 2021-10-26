/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-irregular-whitespace */
import SearchAutocomplete from 'common/components/SearchAutocomplete'
import BSCContext from 'context/BSCContext'
import TokenContext from 'context/TokenContext'
import React, { useContext } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

export default function MarketPairs() {
    const bscContext = useContext(BSCContext)
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
                    <span>{`${tokenContext.currentlySelectedToken.name} (${tokenContext.currentlySelectedToken.symbol} / BNB)`}</span>
                    <span className="price">{`$${!Number.isNaN(tokenContext.currentTokenPriceInUSD) ? tokenContext.currentTokenPriceInUSD : '-'}`}</span>
                </div>
            </div>
            {window.ethereum && (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div className="underlined-button" role="button" onClick={() => bscContext.registerToken(tokenContext.currentlySelectedToken)}>
                    Add to Wallet{' '}
                </div>
            )}
        </div>
    )
}
