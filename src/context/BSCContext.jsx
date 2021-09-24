import utopiaDexABI from 'ABI/utopiaDexABI'
import React, { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import bscPresaleABI from '../ABI/bscPresaleABI'

const BSCContext = React.createContext()

const BSCContextProvider = ({ children }) => {
    const [dexContract, setDexContract] = useState(null)
    const [presaleContract, setPresaleContract] = useState(null)
    const [currentAccountAddress, setCurrentAccountAddress] = useState('')
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
        loadBSCContract()
        loadBSCDexContract()
    }, [])

    return (
        <BSCContext.Provider
            value={{
                dexContract,
                currentAccountAddress,
                presaleContract,
                setCurrentAccountAddress,
            }}
        >
            {children}
        </BSCContext.Provider>
    )
}

export default BSCContext

export { BSCContextProvider }
