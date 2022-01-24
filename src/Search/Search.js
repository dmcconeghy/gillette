import '../styles/Header.css'
import { useState, useEffect, useContext } from 'react'
import SearchForm from './SearchForm'
import { parseResponseProductIds } from './SearchHelpers'
import { SearchContext } from './SearchContext'


function Search( ) {

  // Use the global SearchContext for these useState variables.
  const { searchTerm, 
          setSearchTerm, 
          searchResults, 
          setSearchResults 
        } = useContext(SearchContext)

  //initialize the states of the fetched search and search term to null
  // const [searchResults, setSearchResults] = useState(null);
  // const [searchTerm, setSearchTerm] = useState(null);

  // set the state of the inputted seach term (obtained from SearchForm)
  function search(term) {
     setSearchTerm(term);
  }
  // When there's a change in state of the search term, 
  // fetch the products and set it as the item state
  // Needs error handling try/catch
  useEffect(function fetchOnChange() {
    async function fetchProducts() {
      
      // We need to wait for the api call for a valid product arry with IDs meeting our search term
      //the parseResponseProductIds abstracts axios from this component into SearchHelpers.js 
       setSearchResults(await parseResponseProductIds(searchTerm));
      
    }
    fetchProducts();
  }, [setSearchResults, searchTerm]);

  
  return (
    <div className="Search"> 
      <SearchForm search = { search } />
        {/* {searchTerm ? console.log("Search component says you searched for", searchTerm) : null }
        {searchResults ? console.log("Search component says your results are", searchResults) : null } */}
    </div>
  )
}

export default Search