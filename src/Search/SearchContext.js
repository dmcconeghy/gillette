import { createContext } from 'react'

export const SearchContext = createContext()


// These don't seem to need to be here becasue they're initialized in App. 
// {
//   searchTerm: "",
//   setSearchTerm: () => {},
//   searchResults: [],
//   setSearchResults: () => {},
//   selectedCategories: null,
//   setSelectedCategories: () => {},
//   priceFilter: [0, -1],
//   setPriceFilter: () => {}

// }