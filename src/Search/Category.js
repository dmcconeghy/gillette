import '../styles/Body.css'
import { useContext, useState } from 'react'
import { executeSearch } from './SearchHelpers'
import { SearchContext } from './SearchContext'

function Category(props){

  const { 
    setSearchResults, 
    setSelectedCategory 
  } = useContext(SearchContext)

  //checkboxes start as unchecked
  const [isChecked, setIsChecked] = useState(false)

   //the props.category need to be cleaned up for use in the API URL
   let cleancategory = props.category.toLowerCase()

  //On a change in check status swap the status.
  async function handleOnChange() {
    setIsChecked(!isChecked)

    if (cleancategory === "men's clothing"){
      cleancategory = ("men%27s%20clothing") 
    } else if (cleancategory === "women's clothing"){
      cleancategory = ("women%27s%20clothing")
    } 
    
    setSelectedCategory(cleancategory)
  
    setSearchResults( await executeSearch("", cleancategory))
  }

 

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
      <input type="checkbox" checked={isChecked} onChange={handleOnChange} id={props.category} name={props.category} value={props.category}/>{props.category}
      {console.log((isChecked ? (`${props.category} is checked`) : (`${props.category} is unchecked`)))}
      </div>
      <button value={props.category} onClick={handleClick}>{props.category}</button>
      </>
  );

}

export default Category