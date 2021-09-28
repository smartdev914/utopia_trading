import utopiaDexABI from 'ABI/utopiaDexABI'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import bscPresaleABI from '../ABI/bscPresaleABI'

const BSCContext = React.createContext()

const BSCContextProvider = ({ children }) => {
    const [dexContract, setDexContract] = useState(null)
    const [pancakeSwapContract, setPancakeswapContract] = useState(null)
    const [presaleContract, setPresaleContract] = useState(null)
    const [currentAccountAddress, setCurrentAccountAddress] = useState('')
    const [loadDexContract, setLoadDexContract] = useState(false)
    const [loadPresaleContract, setLoadPresaleContract] = useState(false)
    const [hasDappBrowser, setHasDappBrowser] = useState(false)
    const [currentBnbBalance, setBNBBalance] = useState('')
    const UtopiaPresaleBSCAddress = '0x97fB38850D535a8DC81c3773e2566134A2E3C100'
    const utopiaDexContractAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    const pancakeSwapV2ContractAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

    const loadUTPPresaleContract = useCallback(() => {
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

    const loadPancakeSwapV2Contract = async () => {
        if (window.web3) {
            const contractABI = await axios.get('https://api.bscscan.com/api', {
                params: {
                    module: 'contract',
                    action: 'getabi',
                    address: pancakeSwapV2ContractAddress,
                    apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
                },
            })
            const currentContract = new window.web3.eth.Contract(JSON.parse(contractABI.data.result), pancakeSwapV2ContractAddress)
            if (!pancakeSwapContract) {
                setPancakeswapContract(currentContract)
            }
        }
    }

    const triggerDappModal = async () => {
        const providerOptions = {
            walletconnect: {
                display: {
                    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzAwcHgiIGhlaWdodD0iMTg1cHgiIHZpZXdCb3g9IjAgMCAzMDAgMTg1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OS4zICg1MTE2NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+V2FsbGV0Q29ubmVjdDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJ3YWxsZXRjb25uZWN0LWxvZ28tYWx0IiBmaWxsPSIjM0I5OUZDIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNNjEuNDM4NTQyOSwzNi4yNTYyNjEyIEMxMTAuMzQ5NzY3LC0xMS42MzE5MDUxIDE4OS42NTA1MywtMTEuNjMxOTA1MSAyMzguNTYxNzUyLDM2LjI1NjI2MTIgTDI0NC40NDgyOTcsNDIuMDE5Njc4NiBDMjQ2Ljg5Mzg1OCw0NC40MTQwODY3IDI0Ni44OTM4NTgsNDguMjk2MTg5OCAyNDQuNDQ4Mjk3LDUwLjY5MDU5OSBMMjI0LjMxMTYwMiw3MC40MDYxMDIgQzIyMy4wODg4MjEsNzEuNjAzMzA3MSAyMjEuMTA2MzAyLDcxLjYwMzMwNzEgMjE5Ljg4MzUyMSw3MC40MDYxMDIgTDIxMS43ODI5MzcsNjIuNDc0OTU0MSBDMTc3LjY2MTI0NSwyOS4wNjY5NzI0IDEyMi4zMzkwNTEsMjkuMDY2OTcyNCA4OC4yMTczNTgyLDYyLjQ3NDk1NDEgTDc5LjU0MjMwMiw3MC45Njg1NTkyIEM3OC4zMTk1MjA0LDcyLjE2NTc2MzMgNzYuMzM3MDAxLDcyLjE2NTc2MzMgNzUuMTE0MjIxNCw3MC45Njg1NTkyIEw1NC45Nzc1MjY1LDUxLjI1MzA1NjEgQzUyLjUzMTk2NTMsNDguODU4NjQ2OSA1Mi41MzE5NjUzLDQ0Ljk3NjU0MzkgNTQuOTc3NTI2NSw0Mi41ODIxMzU3IEw2MS40Mzg1NDI5LDM2LjI1NjI2MTIgWiBNMjgwLjIwNjMzOSw3Ny4wMzAwMDYxIEwyOTguMTI4MDM2LDk0LjU3NjkwMzEgQzMwMC41NzM1ODUsOTYuOTcxMyAzMDAuNTczNTk5LDEwMC44NTMzOCAyOTguMTI4MDY3LDEwMy4yNDc3OTMgTDIxNy4zMTc4OTYsMTgyLjM2ODkyNyBDMjE0Ljg3MjM1MiwxODQuNzYzMzUzIDIxMC45MDczMTQsMTg0Ljc2MzM4IDIwOC40NjE3MzYsMTgyLjM2ODk4OSBDMjA4LjQ2MTcyNiwxODIuMzY4OTc5IDIwOC40NjE3MTQsMTgyLjM2ODk2NyAyMDguNDYxNzA0LDE4Mi4zNjg5NTcgTDE1MS4xMDc1NjEsMTI2LjIxNDM4NSBDMTUwLjQ5NjE3MSwxMjUuNjE1NzgzIDE0OS41MDQ5MTEsMTI1LjYxNTc4MyAxNDguODkzNTIxLDEyNi4yMTQzODUgQzE0OC44OTM1MTcsMTI2LjIxNDM4OSAxNDguODkzNTE0LDEyNi4yMTQzOTMgMTQ4Ljg5MzUxLDEyNi4yMTQzOTYgTDkxLjU0MDU4ODgsMTgyLjM2ODkyNyBDODkuMDk1MDUyLDE4NC43NjMzNTkgODUuMTMwMDEzMywxODQuNzYzMzk5IDgyLjY4NDQyNzYsMTgyLjM2OTAxNCBDODIuNjg0NDEzMywxODIuMzY5IDgyLjY4NDM5OCwxODIuMzY4OTg2IDgyLjY4NDM4MjcsMTgyLjM2ODk3IEwxLjg3MTk2MzI3LDEwMy4yNDY3ODUgQy0wLjU3MzU5NjkzOSwxMDAuODUyMzc3IC0wLjU3MzU5NjkzOSw5Ni45NzAyNzM1IDEuODcxOTYzMjcsOTQuNTc1ODY1MyBMMTkuNzkzNjkyOSw3Ny4wMjg5OTggQzIyLjIzOTI1MzEsNzQuNjM0NTg5OCAyNi4yMDQyOTE4LDc0LjYzNDU4OTggMjguNjQ5ODUzMSw3Ny4wMjg5OTggTDg2LjAwNDgzMDYsMTMzLjE4NDM1NSBDODYuNjE2MjIxNCwxMzMuNzgyOTU3IDg3LjYwNzQ3OTYsMTMzLjc4Mjk1NyA4OC4yMTg4NzA0LDEzMy4xODQzNTUgQzg4LjIxODg3OTYsMTMzLjE4NDM0NiA4OC4yMTg4ODc4LDEzMy4xODQzMzggODguMjE4ODk2OSwxMzMuMTg0MzMxIEwxNDUuNTcxLDc3LjAyODk5OCBDMTQ4LjAxNjUwNSw3NC42MzQ1MzQ3IDE1MS45ODE1NDQsNzQuNjM0NDQ0OSAxNTQuNDI3MTYxLDc3LjAyODc5OCBDMTU0LjQyNzE5NSw3Ny4wMjg4MzE2IDE1NC40MjcyMjksNzcuMDI4ODY1MyAxNTQuNDI3MjYyLDc3LjAyODg5OSBMMjExLjc4MjE2NCwxMzMuMTg0MzMxIEMyMTIuMzkzNTU0LDEzMy43ODI5MzIgMjEzLjM4NDgxNCwxMzMuNzgyOTMyIDIxMy45OTYyMDQsMTMzLjE4NDMzMSBMMjcxLjM1MDE3OSw3Ny4wMzAwMDYxIEMyNzMuNzk1NzQsNzQuNjM1NTk2OSAyNzcuNzYwNzc4LDc0LjYzNTU5NjkgMjgwLjIwNjMzOSw3Ny4wMzAwMDYxIFoiIGlkPSJXYWxsZXRDb25uZWN0Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
                    name: 'Mobile',
                    description: 'Scan qrcode with your mobile wallet',
                },
                package: WalletConnectProvider,
                options: {
                    infuraId: '27e484dcd9e3efcfd25a83a78777cdf1', // required
                    rpc: {
                        1: 'https://mainnet.mycustomnode.com',
                        3: 'https://ropsten.mycustomnode.com',
                        100: 'https://dai.poa.network',
                        56: 'https://bsc-dataseed.binance.org',
                    },
                },
            },
        }

        const web3Modal = new Web3Modal({
            network: 'binance', // optional
            cacheProvider: false, // optional
            providerOptions, // required
            theme: 'dark',
        })

        const provider = await web3Modal.connect()

        window.web3 = new Web3(provider)
        if (window.web3) {
            const accounts = await window.web3.eth.getAccounts()
            const bnbBalance = await window.web3.eth.getBalance(accounts[0])
            setCurrentAccountAddress(accounts[0])
            setBNBBalance(bnbBalance)
            setHasDappBrowser(true)
        }
        if (loadPresaleContract) {
            loadUTPPresaleContract()
            setToBSCNet()
        }
        if (loadDexContract) {
            loadBSCDexContract()
            setToBSCNet()
            loadPancakeSwapV2Contract()
        }
    }

    return (
        <BSCContext.Provider
            value={{
                dexContract,
                currentAccountAddress,
                presaleContract,
                setCurrentAccountAddress,
                setLoadDexContract,
                setLoadPresaleContract,
                pancakeSwapContract,
                hasDappBrowser,
                triggerDappModal,
                currentBnbBalance,
            }}
        >
            {children}
        </BSCContext.Provider>
    )
}

export default BSCContext

export { BSCContextProvider }
