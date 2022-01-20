import { useState, useEffect } from "react";


import './Search.css'
import SearchForm from "./SearchForm"
import { parseResponseProductIds } from "./SearchHelpers";

//
function Search() {
    //initialize the states of the fetched item and search term to null
    const [item, setItem] = useState(null);
    const [term, setTerm] = useState(null);

    // set the state of the inputted seach term (obtained from SearchForm)
    function search(term) {
      setTerm(term);
    };

    // When there's a change in state, fetch the product and set it as the item state
    useEffect(function fetchOnChange() {
      async function fetchProduct() {
        
        //the executeSearch abstracts axios from this component into SearchHelpers.js
        setItem(parseResponseProductIds(term));
      
      }
      fetchProduct();
    }, [term]);

  return (
    <span class="Search Header">
      <SearchForm search={ search } />
    </span>
  );
};

export default Search