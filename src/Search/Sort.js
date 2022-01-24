import { useContext } from 'react';
import { parseResponseProductIds } from './SearchHelpers';

// The sort feature allows users to sort returned results by price.
// It takes the currently set searchResults, reorders them, and re-sets the searchResults.
// Clicking the button sets the list ascending/descending in turn.
// Refactoring parseResponseProductIds to return objects would have major impacts here and reduce API calls.  

function Sort() {
    const { 
        searchResults, 
        setSearchResults 
      } = useContext(SearchContext)

      async function priceSort(productIdArray) {}


      


  return (
    <div>
        <button value={props.category} onClick={handleClick}>{props.category}</button>
    </div>
    )
}

export default Sort;
