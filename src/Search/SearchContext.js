import { createContext } from 'react'

export const SearchContext = createContext({
    searchTerm: "",
    setSearchTerm: () => {},
    searchResults: [],
    setSearchResults: () => {},
    selectedCategory: null,
    setSelectedCategory: () => {}
  })