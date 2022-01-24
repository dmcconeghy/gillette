import '../styles/Body.css'
import { useContext } from 'react'
import { executeSearch } from './SearchHelpers'
import { SearchContext } from './SearchContext'

function Category(props){

  const { 
    setSearchResults, 
    setSelectedCategory 
  } = useContext(SearchContext)

  //the props.category need to be cleaned up for use in the API URL
  
  let cleancategory = props.category.toLowerCase()

  async function handleClick(evt) {
    evt.preventDefault();
    
    if (cleancategory === "men's clothing"){
      cleancategory = ("men%27s%20clothing") 
    } else if (cleancategory === "women's clothing"){
      cleancategory = ("women%27s%20clothing")
    } 
    
    setSelectedCategory(cleancategory)
  
    setSearchResults( await executeSearch("", cleancategory))

  }

  return (
      <>
      <div>
      <input type="checkbox" id={props.category} name={props.category} value={props.category}/>{props.category}
      </div>
      <button value={props.category} onClick={handleClick}>{props.category}</button>
      </>
  );

}

export default Category