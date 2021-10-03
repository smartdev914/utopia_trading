/* eslint-disable import/prefer-default-export */
import { useCallback } from 'react'
import debounce from 'lodash/debounce'

export const useDebouncedCallback = (callback, delay) => {
    const returnFunction = useCallback(debounce(callback, delay), [])
    return returnFunction
}
