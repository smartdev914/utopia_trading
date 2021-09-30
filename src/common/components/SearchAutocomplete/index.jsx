/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import ComponentWrapper from './searchAutocomplete.style'

const SearchAutocomplete = ({ className, onSelect, searchOptions }) => {
    const [searchInput, setSearchInput] = useState('')
    const [focused, setFocused] = useState(false)

    const addAllClasses = ['search-autocomplete']

    const filteredOptions = searchInput
        ? searchOptions.filter((option) => {
              let includeOption = false
              option.searchBy.forEach((searchByOption) => {
                  if (searchByOption.toLowerCase().includes(searchInput.toLowerCase())) {
                      includeOption = true
                  }
              })
              return includeOption
          })
        : searchOptions

    if (className) {
        addAllClasses.push(className)
    }

    return (
        <ComponentWrapper className={addAllClasses.join(' ')}>
            <input
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                type="text"
                value={searchInput}
                className="form-control"
                placeholder="&#x1F50D; Search token name / address..."
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            {focused && (
                <div className="search-dropdown-options">
                    {filteredOptions?.map((option) => (
                        <div
                            key={option.key}
                            tabIndex={0}
                            role="button"
                            className="autocomplete-option"
                            onClick={() => {
                                onSelect(option.value)
                                setFocused(false)
                            }}
                        >
                            {option.icon && <img src={option.icon} alt="icon" />}
                            <span>{option.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </ComponentWrapper>
    )
}

export default SearchAutocomplete
