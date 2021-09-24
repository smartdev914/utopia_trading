/* eslint-disable jsx-a11y/click-events-have-key-events */
import { usePancakeSwapTokenList } from 'api'
import React from 'react'
import backupTokenData from 'common/data/backupTokenData'

const TokenModal = ({ show, onTokenSelect }) => {
    const { data, isLoading, isError } = usePancakeSwapTokenList()

    return (
        show && (
            <div className="token-modal-container">
                <div className="modal-backdrop" />

                <div className="token-modal">
                    <h2>Select Token to Swap</h2>
                    <hr />
                    <input type="text" className="form-control" placeholder="Search token name / address..." aria-describedby="inputGroup-sizing-sm" />
                    {(!isLoading || !isError ? data : backupTokenData.tokens).map((token) => (
                        <>
                            <div role="button" className="token-option" onClick={() => onTokenSelect(token)} tabIndex={0}>
                                <img className="icon" src={token.logoURI.replace('exchange.', '').replace('coins', 'tokens')} width={40} height={40} alt={`${token.symbol} logo`} />
                                <div>
                                    <div className="token-symbol">{token.symbol}</div>
                                    <div className="token-address">{token.address}</div>
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
