import '../styles/Header.css'
import { useEffect, useContext, useRef } from 'react'
import { executeSearch } from './SearchHelpers'
import { SearchContext } from './SearchContext'

//Search is the default loader for all db products from the Fake Store API. 
// It sets the initial state of searchResults to allProducts, returned from the executeSearch function in searchHelpers.js
// This component should run ONCE on page-load. Thereafter all calls to executeSearch should come from UI. 

function Search(){

  const { setSearchResults } = useContext(SearchContext)

  const allProducts = async () => {
    console.debug("<Search /> returns default executeSearch with all products>")
    return await executeSearch()
}

  const firstUpdate = useRef(true);
  useEffect(() => { async function fetchData(){

    if (firstUpdate.current) {
      firstUpdate.current = false;
      setSearchResults(await allProducts())
      return;
    }
  } fetchData()
  });


  // This older code was resulting in searchResults = [] at the end of the rendering call. 
  // It may be desirable to reset the searchResults to their default but not through this component. 
  // useEffect(() => { async function fetchProducts() {
  //     if (searchResults.length === 0){
  //       setSearchResults(await allProducts())
  //       console.log("Search says searchResults", searchResults)
  //     }
  //   } 

  //   fetchProducts()
  //   // removing searchResults and setSearchResults as a dependency ensures Search fires only ONCE on app load. 
  // },  [])

  // if (!searchResults) {
  //   console.debug("SearchResults has returned falsey as type:", typeof(searchResults) )
  // } else {
  //     console.debug(`The Search component has rendered with ${searchResults.length} results`)
  //   }
  
  return (
      <>
      {console.debug("<Search /> rendered")}
    </>
  )
}

export default Search