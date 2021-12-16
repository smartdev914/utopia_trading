/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios'
import { getPancakeFactoryPair } from 'common/utils/tokens'
import React, { useEffect, useState, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { Img } from 'react-image'
import Image from 'next/image'
import ThemeContext from 'context/ThemeContext'
import { ethers } from 'ethers'
import ComponentWrapper from './searchAutocomplete.style'

const SearchAutocomplete = ({ onSelect, searchOptions }) => {
    const themeContext = useContext(ThemeContext)
    const [searchInput, setSearchInput] = useState('')
    const [focused, setFocused] = useState(false)
    const [unlistedToken, setUnlistedToken] = useState()
    const [loadingTokenInfo, setLoadinTokenInfo] = useState(false)
    const fallback = 'https://utopia.cc/assets/image/utopia/utopiaUDarkbg.svg'

    const addAllClasses = ['search-autocomplete']

    const filteredOptions = searchInput
        ? searchOptions.filter((option) => {
              let includeOption = false
              option.searchBy.forEach((searchByOption) => {
                  if (searchByOption.toLowerCase().includes(searchInput.toLowerCase())) {
                      includeOption = true
                  }
              })
              return includeOption
          })
        : searchOptions

    useEffect(async () => {
        // if search input is an address check if valid address and if has token pair
        if (searchInput.length === 42) {
            setLoadinTokenInfo(true)
            try {
                const pancakePair = await getPancakeFactoryPair(searchInput, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
                if (pancakePair) {
                    const tokenInfo = await axios.get('https://api.bscscan.com/api', {
                        params: {
                            module: 'token',
                            action: 'tokeninfo',
                            contractaddress: searchInput,
                            apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
                        },
                    })
                    const checkSumAddress = ethers.utils.getAddress(searchInput)
                    if (tokenInfo?.data?.result) {
                        const { contractAddress, tokenName, symbol, divisor } = tokenInfo.data.result[0]
                        if (contractAddress) {
                            setUnlistedToken({
                                address: contractAddress,
                                chainId: 56,
                                decimals: divisor,
                                logoURI: `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${checkSumAddress}/logo.png`,
                                name: tokenName,
                                symbol,
                            })
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }

            setLoadinTokenInfo(false)
        } else {
            setUnlistedToken(null)
        }
    }, [searchInput])

    return (
        <ComponentWrapper className={addAllClasses.join(' ')}>
            <div className="search-box">
                <input
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                    type="text"
                    value={searchInput}
                    className="form-control"
                    placeholder="Search token name / address"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="mag-glass">
                    <Image src={`/assets/image/icons/magGlass${themeContext.currentTheme === 'lightMode' ? 'Light' : ''}.svg`} width={18} height={18} />
                </div>
            </div>
            {focused && (
                <div className="search-dropdown-options">
                    {filteredOptions?.map((option) => (
                        <div
                            key={option.key}
                            tabIndex={0}
                            role="button"
                            className="autocomplete-option"
                            onClick={() => {
                                onSelect(option.value)
                                setFocused(false)
                            }}
                        >
                            {option.icon && <img src={option.icon} alt="icon" />}
                            <span>{option.text}</span>
                        </div>
                    ))}
                </div>
            )}
            {focused && !filteredOptions.length && (
                <>
                    {unlistedToken ? (
                        <div className="search-dropdown-options unlisted-token">
                            <div role="button" className="autocomplete-option" onClick={() => onSelect(unlistedToken)} tabIndex={0}>
                                <Img className="icon" src={[unlistedToken.logoURI, fallback]} alt={`${unlistedToken.symbol} logo`} width={40} height={40} />
                                <div>
                                    <div className="token-symbol">{unlistedToken.symbol}</div>
                                    <div className="token-address">{`${unlistedToken.address.substr(0, 30)}...`}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="search-dropdown-options">
                            {loadingTokenInfo ? (
                                <div className="spinner-container">
                                    <Spinner size="" animation="border" variant="primary" />
                                </div>
                            ) : (
                                <div role="button" className="token-option">
                                    <div>No Results Found</div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </ComponentWrapper>
    )
}

export default SearchAutocomplete
