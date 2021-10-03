import BigNumber from 'bignumber.js'
import { BIG_TEN } from './bigNumbers'
/* eslint-disable import/prefer-default-export */
export const round = (value, decimals) => Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`)

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount, decimals = 18) => new BigNumber(amount).times(BIG_TEN.pow(decimals))

export const getBalanceAmount = (amount, decimals = 18) => new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
