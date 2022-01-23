import { useState } from "react"
import '../styles/Header.css'

//The SearchForm component generates the search field and passes user inputted search terms to its parent using search(term). 

//initalize the searchForm's empty state
function SearchForm({ search }) {
  const [term, setTerm] = useState("");

  //If the contents change, set the term to the state
  function handleChange(evt) {
    setTerm(evt.target.value);
  };

  // If the form is submitted pass the term to the search parent and clear the search field
  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    setTerm("");
  }

  return (
    <label className="SearchField">
      <form onSubmit={handleSubmit}>
        <input value={term} placeholder="Search..." onChange={handleChange} /> 
        
      </form>
    </label>
  )
}

export default SearchForm
