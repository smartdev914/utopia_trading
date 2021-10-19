import sample from 'lodash/sample'

// Array of available nodes to connect to
const nodes = [
    // # 10+ nodes balanced, US/EU
    'https://bsc-dataseed1.ninicoin.io',
    // # 10+ nodes balanced, US/EU
    'https://bsc-dataseed1.defibit.io',
    // # 10+ nodes balanced in each region, global
    'https://bsc-dataseed.binance.org',
    // # Google Cloud Infrastructure Endpoint - Global
    'https://nodes.pancakeswap.com/',
]

const getNodeUrl = () => sample(nodes)

export default getNodeUrl
