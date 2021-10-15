/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'
// import axios from 'axios'
// import { Spinner } from 'react-bootstrap'
// import getContract from 'common/utils/getContract'
// import { getPancakeFactoryPair } from 'common/utils/tokens'

const TokenModal = ({ show, onTokenSelect }) => {
    const [searchInput, setSearchInput] = useState('')
    // const [unlistedToken, setUnlistedToken] = useState()
    // const [loadingTokenInfo, setLoadinTokenInfo] = useState(false)

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

    // useEffect(async () => {
    //     // if search input is an address check if valid address and if has token pair
    //     if (searchInput.length === 42) {
    //         setLoadinTokenInfo(true)
    //         const pancakePair = await getPancakeFactoryPair(searchInput, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
    //         if (pancakePair) {
    //             const tokenInfo = await axios.get('https://api.bscscan.com/api', {
    //                 params: {
    //                     module: 'token',
    //                     action: 'tokeninfo',
    //                     contractaddress: searchInput,
    //                     apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
    //                 },
    //             })
    //             if (tokenInfo?.data?.result) {
    //                 const { contractAddress, tokenName, symbol, divisor } = tokenInfo.data.result[0]
    //                 if (contractAddress) {
    //                     setUnlistedToken({
    //                         address: contractAddress,
    //                         chainId: 56,
    //                         decimals: divisor,
    //                         logoURI: 'https://utopia.cc/assets/image/utopia/utopiaUDarkbg.svg',
    //                         name: tokenName,
    //                         symbol,
    //                     })
    //                 }
    //             }
    //         }

    //         setLoadinTokenInfo(false)
    //     } else {
    //         setUnlistedToken(null)
    //     }
    // }, [searchInput])

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
                    {/* {!filteredOptions.length && (
                        <>
                            {unlistedToken ? (
                                <div role="button" className="token-option" onClick={() => onTokenSelect(unlistedToken)} tabIndex={0}>
                                    <img className="icon" src={unlistedToken.logoURI} width={40} height={40} alt={`${unlistedToken.symbol} logo`} />
                                    <div>
                                        <div className="token-symbol">{unlistedToken.symbol}</div>
                                        <div className="token-address">{`${unlistedToken.address.substr(0, 30)}...`}</div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {loadingTokenInfo ? (
                                        <div className="spinner-container">
                                            <Spinner size="" animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <div role="button" className="token-option">
                                            <div>No Results Found</div>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )} */}
                </div>
            </div>
        )
    )
}
export default TokenModal
