import { useContext, useEffect, useState } from 'react';
import { executeSearch } from './SearchHelpers';
import { SearchContext } from './SearchContext'


// This function accepts an array of products and toggles their sorting ascending/descending.
// It takes advantage of SearchContext to fetch and update the search results and supply the selected category.
// Future feature: Add a useState to make the sort toggle.
// Sort fails currently to use selected filters

function Sort(props) {
    const {
        searchTerm, 
        selectedCategories,
        searchResults,
        setSearchResults 
      } = useContext(SearchContext)

      const [isSortedUp, setIsSortedUp] = useState(false)

      function handleClick(){
        
        // console.log("You clicked")
        setIsSortedUp(!isSortedUp);
        // console.log(isSortedUp)
        // console.log("handleclick", searchResults)

        // let currentResults = searchResults

        // if (!isSortedUp){
        //   currentResults.sort((a,b) => (a.price > b.price) ? 1 : -1)
        // } else {
        //   currentResults.sort((a,b) => (a.price > b.price ) ? -1 : 1)
        // }

      }
      
      useEffect(() => {
        function sortResults(){

          let currentResults = searchResults

          if (!isSortedUp){
            currentResults.sort((a,b) => (a.price > b.price) ? 1 : -1)
          } else {
            currentResults.sort((a,b) => (a.price > b.price ) ? -1 : 1)
          }
          
          setSearchResults(currentResults)
          // console.log("useEffect", searchResults)
          //Why does a change in search results not result in a re-render?
        }
        sortResults()
      }, [isSortedUp, searchResults, setSearchResults])
    
    
  return (
    <div>
        <button onClick={() => handleClick()}>Sort by Price&#8593;&#8595;</button>
    </div>
    )
}

export default Sort;
