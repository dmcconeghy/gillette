import { useContext, useEffect, useRef, useState } from 'react';
import { SearchContext } from './SearchContext'


// This function takes whatever results are currently held in the global searchResults and sorts them. 
// Pressing the button toggle the effect. Presently is does NOT reset.
// There may be a bug with the order that sort is called, causing a quick resort in certain cases. 

function PriceSort() {

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
        setSortAscending
      } = useContext(SearchContext)

      const [isSortedUp, setIsSortedUp] = useState(null)
      
     
      function handleClick(evt){
        evt.preventDefault()
        //On initial click we should set the state to false and then begin toggling it. 
        if (isSortedUp === null){
          setIsSortedUp(false)
        }
        setIsSortedUp(!isSortedUp);
        console.debug("You clicked sort by price ascending =", isSortedUp)

      }
      
      useEffect(() => {
        function sortResults(){
          
          // Don't fire or set searchResults if the sort button hasn't been pushed. 
          if (isSortedUp !== null){
            
            let sortedResults = searchResults
            
            if (!isSortedUp){
              sortedResults.sort((a,b) => (a.price > b.price) ? 1 : -1)
              setSortAscending(true)

            } else if (isSortedUp){
              sortedResults.sort((a,b) => (a.price > b.price ) ? -1 : 1)
              setSortAscending(false)
            }
          
            setSearchResults(sortedResults)
        }
      }
        sortResults()
      }, [isSortedUp, searchResults, setSearchResults, setSortAscending])
    
    
  return (
    <div className="PriceSort">
      {console.debug("<PriceSort /> rendered")}
        <button onClick={(evt) => handleClick(evt)}>Sort Results By Price&#8593;&#8595;</button>
    </div>
    )
}

export default PriceSort;
