import { useState, useContext, useEffect } from "react"
import '../styles/Header.css'
import { SearchContext } from "../Search/SearchContext"
import { executeSearch } from "../Search/SearchHelpers"

function SearchForm() {

  const { searchTerm, setSearchTerm, setSearchResults, setSortAscending } = useContext(SearchContext)
  const [inputtedTerm, setInputtedTerm] = useState("");

  //If the contents change, set the term to the state
  function handleChange(evt) {
    
    setInputtedTerm(evt.target.value);
    
  };

  //Placing this outside the handleChange 
  if (inputtedTerm !== ""){
    console.debug(`SearchForm input: ${inputtedTerm}`)
  }
  // If the form is submitted pass the term to the global SearchContext
  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchTerm(inputtedTerm)
    
  }

  //When the term has been set by a form submission, pass it to executeSearch and then set searchResults to equal that query.  
  useEffect(() => { 
     async function updateSearchTerm() {

      if(searchTerm !== ""){
        console.log(`Executing search for "${searchTerm}"`)
        
        setSearchResults(await executeSearch(searchTerm))
        
        // Not sure where searchTerm should be reset yet.
        // Putting the reset here means that items can't be price filtered or sorted by category within a term's search results.  
        // setSearchTerm("")
      }
    }
      updateSearchTerm()
    },[searchTerm, setSearchResults, setSortAscending, setSearchTerm])

  return (
    <label className="SearchField">
  
      {console.debug("<SearchForm /> rendered")}
      <form onSubmit={handleSubmit}>
        <input type="search" value={inputtedTerm} placeholder="Search..." onChange={handleChange} /> 
        
      </form>
    </label>
  )
}

export default SearchForm
