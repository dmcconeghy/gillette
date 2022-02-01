import '../styles/Body.css'
import { SearchContext } from '../Search/SearchContext'
import { useContext } from 'react'




function Results() {

    const {
        searchTerm,
        selectedCategories,
        priceFilter,
        searchResults
        } = useContext(SearchContext)
    
    // This logic helper displays various combinations of search results for a better UI experience. 

    function refreshPage() {
        window.location.reload(true)
    }
    function resultsMessage() {
        if (searchResults.length === 0 && searchTerm === "" && selectedCategories.length === 0 && priceFilter[1] !== -1){
            return (
                <></>
            )
        } 
    
        if (searchResults.length === 20 ) {
            return (
                <>
                Returning all available products
                </>
            )
        }
        
        // Search term only
        if (searchResults.length === 0 && searchTerm !== "" && selectedCategories.length === 0){
            return (
                <>
                Your search for {searchTerm} returned no results. <button onClick={refreshPage}>Start over?</button>
                </>
            )
        }


        // Single result
        if (searchResults.length > 1) {
            return (
                <>
                Your search returned {searchResults.length} results.
                </>
            )
        }
    
        if (searchResults.length === 1) {
            return (
                <>
                Your search returned {searchResults.length} result.
                </>
            )
        }
    }

  return <div>
      <h2 className="Results">{ resultsMessage() }</h2></div>;
}

export default Results;





