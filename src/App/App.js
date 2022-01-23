import '../styles/App.css'
import Header from '../Header/Header'
import Body from '../Body/Body'
import { useEffect, useState, useMemo } from 'react'
import { SearchContext } from '../Search/SearchContext'
import Search from '../Search/Search'


function App() {

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])

  //Memoizing these values means they're only updated on a change in searchTerm or searchReuslts
  const searchValues = useMemo(
    () => ({ searchTerm, setSearchTerm, searchResults, setSearchResults}),
    [searchTerm, searchResults]
  );
  
  //This initializtion is only for testing, I think. 
  // useEffect(function setSearchValues() {
  //   setSearchTerm("test");
  //   setSearchResults([1, 3, 5]);
  // }, []) 
    
  
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
