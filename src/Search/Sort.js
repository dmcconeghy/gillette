import { useEffect, useState, useContext } from 'react';
import { parseResponseProductIds } from './SearchHelpers';
import { SearchContext } from './SearchContext'
import axios from 'axios'

// The sort feature allows users to sort returned results by price.
// It takes the currently set searchResults, reorders them, and re-sets the searchResults.
// We continue treating categories as a searchable object rather than making an API specific call. 
// Clicking the button sets the list ascending/descending in turn.
// Refactoring parseResponseProductIds to return objects would have major impacts here and reduce API calls.
// There are other ways of using the API's presorted call, too, by using filter   

function Sort(props) {
    const { searchTerm,
        setSearchTerm,
        setSearchResults 
      } = useContext(SearchContext)

    const [direction, setDirection ] = useState("")

    //   const BASE_URL = "https://fakestoreapi.com/products/";
    //   const ASC_URL = "https://fakestoreapi.com/products?sort=asc";
    //   const DESC_URL = "https://fakestoreapi.com/products?sort=desc"

      // This function can likely replace executeSearch() in SearchHelpers during refactoring.
    //   async function sortedSearch(searchTerm = "", direction = "") {
    //     let searchURL;

    //     if (direction) {
    //         ((direction === "asc") ? searchURL = ASC_URL : searchURL = DESC_URL) 
    //     } else { searchURL = BASE_URL}

    //       //query the API for the json object 
    //       const response = await axios({
    //           method: 'get',
    //           url: `${searchURL}`,
    //           withCredentials: false,
    //       })
          
    //       //parse just the product item data
    //       const catalog = response.data
       
    //       //This expression looks for our term in the catalog string
    //       // the i flag ignores case
    //       // the g flag returns all results, not just the first one
    //       const searchExpression = new RegExp('.*' + searchTerm + '.*', 'gi')
        
    //       const filteredResponse = catalog.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description) || searchExpression.test(item.category))
      
    //       // returns an array of products 
    //       return filteredResponse
    //   }
    
      async function handleClick(evt){
        evt.preventDefault();
        setDirection(props.direction)
        setSearchTerm(props.direction)
        console.log("Clicked the button", props.direction, direction)
        setSearchResults(await parseResponseProductIds(searchTerm));
      }

    //   useEffect(function fetchOnChange() {
    //     async function fetchProducts() {
          
    //       // We need to wait for the api call for a valid product arry with IDs meeting our search term
    //       //the parseResponseProductIds abstracts axios from this component into SearchHelpers.js 
    //        setSearchResults(await parseResponseProductIds(sortedSearch(undefined, direction)));
          
    //     }
    //     fetchProducts();
    //   }, [setSearchResults, direction]);
      
  return (
    <div>
        <button value={props.direction} onClick={handleClick}> Sort by Price({props.direction})</button>
    </div>
    )
}

export default Sort;
