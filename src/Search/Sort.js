import { useContext } from 'react';
import { executeSearch } from './SearchHelpers';
import { SearchContext } from './SearchContext'


// This function accepts an array of products and toggles their sorting ascending/descending.
// It takes advantage of SearchContext to fetch and update the search results and supply the selected category.
// Future feature: Add a useState to make the sort toggle. 
function Sort() {
    const {
        searchTerm, 
        selectedCategory,
        setSearchResults 
      } = useContext(SearchContext)

    
    async function handleClick(evt) {
        evt.preventDefault()
        console.log("Sorting results")

        setSearchResults((await executeSearch(searchTerm, selectedCategory)).sort((a,b) => (a.price > b.price) ? 1 : -1))
    }
    


  return (
    <div>
        Temporary
        <button onClick={handleClick}>Sort by</button>
    </div>
    )
}

export default Sort;
