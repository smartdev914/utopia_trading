import utopiaDexABI from 'ABI/utopiaDexABI'
import React, { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import bscPresaleABI from '../ABI/bscPresaleABI'

const BSCContext = React.createContext()

const BSCContextProvider = ({ children }) => {
    const [dexContract, setDexContract] = useState(null)
    const [presaleContract, setPresaleContract] = useState(null)
    const [currentAccountAddress, setCurrentAccountAddress] = useState('')
    const [loadDexContract, setLoadDexContract] = useState(false)
    const [loadPresaleContract, setLoadPresaleContract] = useState(false)
    const UtopiaPresaleBSCAddress = '0x97fB38850D535a8DC81c3773e2566134A2E3C100'
    const utopiaDexContractAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

    const loadBSCContract = useCallback(() => {
        window.web3.eth.net.getId().then((netId) => {
            if (netId !== 56) {
                console.log('Please connect to the BSC Mainnet')
            }
        })
        const UtopiaContract = new window.web3.eth.Contract(bscPresaleABI, UtopiaPresaleBSCAddress)
        setPresaleContract(UtopiaContract)
    }, [UtopiaPresaleBSCAddress])

    const setToBSCNet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                })
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x38',
                                    chainName: 'Binance Smart Chain',
                                    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                    blockExplorerUrls: ['https://bscscan.com/'],
                                },
                            ],
                        })
                    } catch (addError) {
                        // eslint-disable-next-line no-alert
                        window.alert('Error adding Binance Smart Chain')
                    }
                }
                // handle other "switch" errors
            }
        }
    }

    const loadBSCDexContract = async () => {
        if (window.web3) {
            const currentDexContract = new window.web3.eth.Contract(utopiaDexABI, utopiaDexContractAddress)
            if (!dexContract) {
                setDexContract(currentDexContract)
            }
        }
    }

    useEffect(() => {
        if (typeof window.web3 !== 'undefined') {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8545'))
        }
        if (loadPresaleContract) {
            loadBSCContract()
            setToBSCNet()
        }
        if (loadDexContract) {
            loadBSCDexContract()
            setToBSCNet()
        }
    }, [])

    return (
        <BSCContext.Provider
            value={{
                dexContract,
                currentAccountAddress,
                presaleContract,
                setCurrentAccountAddress,
                setLoadDexContract,
                setLoadPresaleContract,
            }}
        >
            {children}
        </BSCContext.Provider>
    )
}

export default BSCContext

export { BSCContextProvider }
