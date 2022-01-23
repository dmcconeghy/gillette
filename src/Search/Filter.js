import '../styles/Filter.css'
import { useContext } from 'react'
import { parseResponseProductIds } from './SearchHelpers'
import { SearchContext } from './SearchContext'

function Filter(props){

  const { searchTerm, 
    setSearchTerm, 
    searchResults, 
    setSearchResults 
  } = useContext(SearchContext)

  // If the button is pressed, set the filtered category as the searchTerm
  async function handleClick(evt) {
    evt.preventDefault();
    setSearchTerm(props.category)
    setSearchResults( await parseResponseProductIds(searchTerm))

    console.log("Results of clicking",props.category, "are:", searchResults)
  }

  return (
      <>
      <button value={props.category} onClick={handleClick}>{props.category}</button>
      {/* <ProductTable productIdArray={categoryArray} /> */}
      </>
  );

}

export default Filter