import '../styles/App.css'
import Header from '../Header/Header'
import Body from '../Body/Body'
import { useState, useMemo } from 'react'
import { SearchContext } from '../Search/SearchContext'

import Search from '../Search/Search'

function App() {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ selectedCategories, setSelectedCategories ] = useState([])
  const [ priceFilter, setPriceFilter ] = useState([0, -1])
  const [ sortAscending, setSortAscending ] = useState(null)
  // SearchResults defaults to allProducts on app-load. 
  const [ searchResults, setSearchResults ] = useState([])

  //Memoizing these values should mean they're only updated on a change in searchTerm, selectedCategories, or searchReuslts
  const searchValues = useMemo(
    () => ({  searchTerm, setSearchTerm, 
              selectedCategories, setSelectedCategories, 
              priceFilter, setPriceFilter,
              sortAscending, setSortAscending,
              searchResults, setSearchResults
            }),
    [searchTerm, selectedCategories, priceFilter, sortAscending, searchResults]
  );
  
return (
    <div className="App">
      {console.debug("<App /> rendered")}
      <SearchContext.Provider value = { searchValues } >'
        <Search />
        <Header />
        
        <Body />
        </SearchContext.Provider>
    </div>
  )
}

export default App
