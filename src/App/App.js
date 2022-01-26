import '../styles/App.css'
import Header from '../Header/Header'
import Body from '../Body/Body'
import { useState, useMemo } from 'react'
import { SearchContext } from '../Search/SearchContext'

function App() {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])
  const [ selectedCategories, setSelectedCategories ] = useState(null)
  const [ priceFilter, setPriceFilter ] = useState([0, -1])
  const [ sortAscending, setSortAscending ] = useState(null)

  //Memoizing these values should mean they're only updated on a change in searchTerm, selectedCategories, or searchReuslts
  const searchValues = useMemo(
    () => ({  searchTerm, setSearchTerm, 
              searchResults, setSearchResults, 
              selectedCategories, setSelectedCategories, 
              priceFilter, setPriceFilter,
              sortAscending, setSortAscending}),
    [searchTerm, searchResults, selectedCategories, priceFilter, sortAscending]
  );
  
return (
    <div className="App">
      {console.debug("The App component has rendered")}
      <SearchContext.Provider value = { searchValues } >
        <Header />
        
        <Body />
        </SearchContext.Provider>
    </div>
  )
}

export default App
