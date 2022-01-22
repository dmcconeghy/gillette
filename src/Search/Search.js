import { useState, useEffect } from "react"

import ProductTable from "../Products/ProductTable"
import '../styles/Search.css'
import SearchForm from "./SearchForm"
import { parseResponseProductIds } from "./SearchHelpers"

//
function Search() {
    //initialize the states of the fetched search and search term to null
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    // set the state of the inputted seach term (obtained from SearchForm)
    function search(searchTerm) {
       setSearchTerm(searchTerm);
    }
    // When there's a change in state of the search term, fetch the products and set it as the item state
    // Needs error handling try/catch
    useEffect(function fetchOnChange() {
      async function fetchProducts() {
        
        // We need to wait for the api call for a valid product arry with IDs meeting our search term
        //the parseResponseProductIds abstracts axios from this component into SearchHelpers.js 
        const results = await parseResponseProductIds(searchTerm)
        
         setSearchResults(results);
        
        
      }
      fetchProducts();
    }, [searchTerm]);

 // Currently this returns the default 20 item ProductTable on initial rendering 
 // For now the search executes and returns inside the App > Body > Search

  return (
      <>
      <span className="Search"> 
          <SearchForm search = { search } />
      </span>
      <div className="ProductTable">
        <ProductTable productIdArray = { searchResults } /> 
      </div>
      </>
  );
};

export default Search