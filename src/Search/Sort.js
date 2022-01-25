import { useContext, useState } from 'react';
import { executeSearch } from './SearchHelpers';
import { SearchContext } from './SearchContext'


// This function accepts an array of products and toggles their sorting ascending/descending.
// It takes advantage of SearchContext to fetch and update the search results and supply the selected category.
// Future feature: Add a useState to make the sort toggle.
// Sort fails currently to use selected filters

function Sort() {
    const {
        searchTerm, 
        selectedCategories,
        setSearchResults 
      } = useContext(SearchContext)

    const [isSortedUp, setIsSortedUp] = useState(false)

    async function handleClick(evt) {
        evt.preventDefault()
        setIsSortedUp(!isSortedUp);
        
        console.log("Sorting results")

        setSearchResults((await executeSearch(searchTerm, selectedCategories)).sort((a,b) => (a.price > b.price) ? 1 : -1))

        // setSearchResults(async () => { 
        //   (!isSortedUp) ? (await executeSearch(searchTerm, selectedCategories)).sort((a,b) => (a.price > b.price) ? 1 : -1)
        //   : (await executeSearch(searchTerm, selectedCategories)).sort((b,a) => (a.price < b.price ? 1 : -1))
        // })
    }
    
  return (
    <div>
        <button onClick={handleClick}>Sort by Price</button>
    </div>
    )
}

export default Sort;
