/* eslint-disable import/prefer-default-export */
export const round = (value, decimals) => Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`)
