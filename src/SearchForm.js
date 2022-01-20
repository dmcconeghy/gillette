import React, { useState } from "react";


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
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={handleChange} /> 
      <button>Search!</button>
    </form>
  );
};

export default SearchForm
