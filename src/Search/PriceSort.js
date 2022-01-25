import { useContext, useEffect, useState } from 'react';
import { executeSearch } from './SearchHelpers';
import { SearchContext } from './SearchContext'


// This function accepts an array of products and toggles their sorting ascending/descending.
// It takes advantage of SearchContext to fetch and update the search results and supply the selected category.
// Future feature: Add a useState to make the sort toggle.
// Sort fails currently to use selected filters


// Reducing console clutter temporarily, this is definitely resulting in additional and unwanted renders. 
function PriceSort(props) {
    const {
        searchTerm, 
        selectedCategories,
        searchResults,
        setSearchResults 
      } = useContext(SearchContext)

      // const [isSortedUp, setIsSortedUp] = useState(false)
      // const [currentResults, setCurrentResults] = useState([])


      // function handleClick(evt){
      //   evt.preventDefault()
        
      //   console.log("You clicked sort by price")
      //   setIsSortedUp(!isSortedUp);
      //   console.log("Sort ascending is:", isSortedUp)
        // console.log("handleclick", searchResults)

        // let sortedResults = searchResults
        

        // if (!isSortedUp){
        //   sortedResults.sort((a,b) => (a.price > b.price) ? 1 : -1)
        // } else {
        //   sortedResults.sort((a,b) => (a.price > b.price ) ? -1 : 1)
        // }

        // setCurrentResults(searchResults)
      // }

      // console.log(currentResults)
      
      // useEffect(() => {
      //   function sortResults(){

      //     console.log("Sort useEffect fires")
      //     // let sortedResults = searchResults

      //     // if (!isSortedUp){
      //     //   sortedResults.sort((a,b) => (a.price > b.price) ? 1 : -1)
            
      //     // } else if (isSortedUp){
      //     //   sortedResults.sort((a,b) => (a.price > b.price ) ? -1 : 1)

      //     // }
          
      //     // setSearchResults(sortedResults)
          
      //     // console.log("useEffect", searchResults)
      //     //Why does a change in search results not result in a re-render?
      //   }
      //   sortResults()
      // }, [isSortedUp, searchResults, setSearchResults, currentResults, setCurrentResults])
    

      //onClick={(evt) => handleClick(evt)}
    
  return (
    <div className="PriceSort">
        <button >Sort Results By Price&#8593;&#8595;</button>
    </div>
    )
}

export default PriceSort;
