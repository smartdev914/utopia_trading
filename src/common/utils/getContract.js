import axios from 'axios'

const Contract = require('web3-eth-contract')
// set provider for all later instances to use
Contract.setProvider('wss://ws-nd-219-979-765.p2pify.com/c2317b27ad9bde72c2d30764cf359fa3')

const getContract = async (address) => {
    const contractABI = await axios.get('https://api.bscscan.com/api', {
        params: {
            module: 'contract',
            action: 'getabi',
            address,
            apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
        },
    })
    console.log(contractABI)
    if (contractABI.data.status === '1') {
        const currentContract = new Contract(JSON.parse(contractABI.data.result), address)
        return currentContract
    }
    return undefined
}

export default getContract
