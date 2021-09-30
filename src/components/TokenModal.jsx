/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'

const TokenModal = ({ show, onTokenSelect }) => {
    const [searchInput, setSearchInput] = useState('')

    const options = supportedPancakeTokens.tokens.map((token) => ({
        text: token.name,
        value: token,
        icon: token.logoURI,
        key: token.address,
        searchBy: [token.address, token.symbol, token.name],
    }))

    const filteredOptions = searchInput
        ? options.filter((option) => {
              let includeOption = false
              option.searchBy.forEach((searchByOption) => {
                  if (searchByOption.toLowerCase().includes(searchInput.toLowerCase())) {
                      includeOption = true
                  }
              })
              return includeOption
          })
        : options

    return (
        show && (
            <div className="token-modal-container">
                <div className="modal-backdrop" />

                <div className="token-modal">
                    <h2>Select Token to Swap</h2>
                    <hr />
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Search token name / address..."
                        aria-describedby="inputGroup-sizing-sm"
                    />
                    {filteredOptions.map((token) => (
                        <>
                            <div role="button" className="token-option" onClick={() => onTokenSelect(token.value)} tabIndex={0}>
                                <img className="icon" src={token.value.logoURI} width={40} height={40} alt={`${token.value.symbol} logo`} />
                                <div>
                                    <div className="token-symbol">{token.value.symbol}</div>
                                    <div className="token-address">{`${token.value.address.substr(0, 30)}...`}</div>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))}
                </div>
            </div>
        )
    )
}
export default TokenModal
