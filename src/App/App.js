import '../styles/App.css'
import Header from '../Header/Header'
import Body from '../Body/Body'
import { useState, useMemo } from 'react'
import { SearchContext } from '../Search/SearchContext'

function App() {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])
  const [ selectedCategory, setSelectedCategory ] = useState(null)

  //Memoizing these values means they're only updated on a change in searchTerm, selectedCategory, or searchReuslts
  const searchValues = useMemo(
    () => ({ searchTerm, setSearchTerm, searchResults, setSearchResults, selectedCategory, setSelectedCategory}),
    [searchTerm, searchResults, selectedCategory]
  );
  
return (
    <div className="App">
      <SearchContext.Provider value = { searchValues } >
        <Header />
        
        <Body />
        </SearchContext.Provider>
    </div>
  )
}

export default App
