/* eslint-disable jsx-a11y/click-events-have-key-events */
import { supportedTokens } from 'common/data/exchangeData'
import React from 'react'

const TokenModal = ({ show, onTokenSelect }) =>
    show && (
        <div className="token-modal-container">
            <div className="modal-backdrop" />

            <div className="token-modal">
                <h2>Select Token to Swap</h2>
                <hr />
                {supportedTokens.map((token) => (
                    <div role="button" className="token-option" onClick={() => onTokenSelect(token)} tabIndex={0}>
                        <div className="token-symbol">{token.tokenSymbol}</div>
                        <div className="token-address">{token.tokenAddress}</div>
                    </div>
                ))}
            </div>
        </div>
    )

export default TokenModal
