import axios from 'axios'
import { ethers } from 'ethers'
import getRpcUrl from './getRpcUrls'

const RPC_URL = getRpcUrl()

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export const getContract = (abi, address, signer) => {
    const signerOrProvider = signer || simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getContractNoABI = async (address, signer) => {
    const signerOrProvider = signer || simpleRpcProvider
    const contractABI = await axios.get('https://api.bscscan.com/api', {
        params: {
            module: 'contract',
            action: 'getabi',
            address,
            apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
        },
    })
    if (contractABI.data.status === '1') {
        const currentContract = new ethers.Contract(address, JSON.parse(contractABI.data.result), signerOrProvider)
        return currentContract
    }
    return undefined
}

export default getContract
