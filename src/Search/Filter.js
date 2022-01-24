import '../styles/Filter.css'
import { useContext } from 'react'
import { executeSearch, parseResponseProductIds } from './SearchHelpers'
import { SearchContext } from './SearchContext'

function Filter(props){

  const { searchTerm, 
    setSearchTerm, 
    setSearchResults 
  } = useContext(SearchContext)

  // If the button is pressed, set the filtered category as the searchTerm
  // This method issues with regExp category substrings (men's clothing also returning women's clothing)
  // Solution use API built in routes & return those as the searchResults 
  async function handleClick(evt) {
    evt.preventDefault();
    setSearchTerm(props.category)
    setSearchResults( await executeSearch(searchTerm))

    
  }

  return (
      <>
      <button value={props.category} onClick={handleClick}>{props.category}</button>
      </>
  );

}

export default Filter