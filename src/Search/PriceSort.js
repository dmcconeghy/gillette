import { useContext, useEffect, useRef, useState } from 'react';
import { executeSearch } from './SearchHelpers';
import { SearchContext } from './SearchContext'


// This function accepts an array of products and toggles their sorting ascending/descending.
// It takes advantage of SearchContext to fetch and update the search results and supply the selected category.
// Future feature: Add a useState to make the sort toggle.
// Sort fails currently to use selected filters


// Reducing console clutter temporarily, this is definitely resulting in additional and unwanted renders. 
function PriceSort(props) {

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
   
  });

    const {
        searchResults,
        setSearchResults, 
        sortAscending,
        setSortAscending 
      } = useContext(SearchContext)

      const [isSortedUp, setIsSortedUp] = useState(false)
      const [currentResults, setCurrentResults] = useState([])


      function handleClick(evt){
        evt.preventDefault()
        
        
        setIsSortedUp(!isSortedUp);
        console.log("You clicked sort by price ascending =", isSortedUp)

      }
      
      useEffect(() => {
        function sortResults(){

          let sortedResults = searchResults

          if (!isSortedUp){
            sortedResults.sort((a,b) => (a.price > b.price) ? 1 : -1)
            
          } else if (isSortedUp){
            sortedResults.sort((a,b) => (a.price > b.price ) ? -1 : 1)

          }
          
          setSearchResults(sortedResults)
         
          
          // Why does a change in search results not result in a re-render?
          // Due to the useState bug in the app, results appear to be correctly sorted on the accidental re-renders. 
        }
        sortResults()
      }, [isSortedUp, searchResults, setSearchResults, currentResults, setSortAscending, setCurrentResults])
    
    

      
    
  return (
    <div className="PriceSort">
        <button onClick={(evt) => handleClick(evt)}>Sort Results By Price&#8593;&#8595;</button>
    </div>
    )
}

export default PriceSort;
