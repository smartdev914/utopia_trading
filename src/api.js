import axios from 'axios'
import { useQuery } from 'react-query'

const bscAPIUrl = 'https://api-testnet.bscscan.com/api'
const bscTestNetAPIUrl = 'https://api-testnet.bscscan.com'
const apiKey = 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1'
export const useBSCScanAccountInfo = ({ address }, options) =>
    useQuery(
        ['getAccount', address],
        () =>
            axios.get(bscAPIUrl, {
                params: {
                    module: 'account',
                    action: 'balance',
                    address,
                    apiKey,
                },
            }),
        {
            select: (res) => res?.data?.result,
            enabled: Boolean(address),
        }
    )
export const useBSCScanABI = ({ address }, options) =>
    useQuery(
        ['getABI', address],
        () =>
            axios.get(bscAPIUrl, {
                params: {
                    module: 'contract',
                    action: 'getabi',
                    address,
                    apiKey,
                },
            }),
        {
            select: (res) => res?.data?.result,
            enabled: Boolean(address),
        }
    )

export const usePancakeSwapTokenList = () =>
    useQuery(['tokenList'], () => axios.get('https://gateway.pinata.cloud/ipfs/QmdKy1K5TMzSHncLzUXUJdvKi1tHRmJocDRfmCXxW5mshS'), {
        select: (res) => res.data.tokens,
    })
