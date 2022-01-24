import '../styles/Filter.css'
import { useContext } from 'react'
import { executeSearch } from './SearchHelpers'
import { SearchContext } from './SearchContext'

function Category(props){

  const { 
    setSearchResults 
  } = useContext(SearchContext)

  //the props.category need to be cleaned up for use in the API URL
  let cleancategory = props.category.toLowerCase()
  if (cleancategory === "men's clothing"){
    cleancategory = "men%27s%20clothing" 
  } else if (cleancategory === "women's clothing"){
    cleancategory = "women%27s%20clothing"
  }

  async function handleClick(evt) {
    evt.preventDefault();
    setSearchResults( await executeSearch("", cleancategory))

  }

  return (
      <>
      <button value={props.category} onClick={handleClick}>{props.category}</button>
      </>
  );

}

export default Category