import '../styles/Header.css'
import { useEffect, useContext } from 'react'
import SearchForm from './SearchForm'
import { executeSearch } from './SearchHelpers'
import { SearchContext } from './SearchContext'

// Search uses a SearchForm callback to retrieve user inputted search terms. 
// It is called onSubmit rather than dynamically on key entry. 
// By passing SearchContext the searchTerm and searchResults, this function can display data flexibly. 
function Search() {

  // Use the global SearchContext for these useState variables.
  // SearchResults is only here for data checking.
  const { searchTerm, 
          searchResults,
          setSearchTerm, 
          setSearchResults 
        } = useContext(SearchContext)

  // set the state of the inputted seach term (obtained from SearchForm)
  function search(term) {
     setSearchTerm(term);
  }

  // When there's a change in state of the search term, 
  // fetch the products and set it as the item state
  useEffect(function fetchOnChange() {
    async function fetchProducts() {
      
      // We need to wait for executeSearch to make the api call for products.
       setSearchResults(await executeSearch(searchTerm));
      
    }
    fetchProducts();
  }, [setSearchResults, searchTerm]);

  return (
    <div className="Search"> 
      <SearchForm search = { search } />
        {searchTerm ? console.log("Search component says you searched for", searchTerm) : null }
        {searchResults ? console.log("Search component says your results are", searchResults) : null }
    </div>
  )
}

export default Search