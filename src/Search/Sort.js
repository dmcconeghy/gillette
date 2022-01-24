import { useEffect, useState, useContext } from 'react';
import { executeSearch } from './SearchHelpers';
import { SearchContext } from './SearchContext'
import axios from 'axios'

// This function doesn't do at all what it is supposed to right now. 

function Sort(props) {
    const { searchTerm,
        setSearchTerm,
        setSearchResults 
      } = useContext(SearchContext)

    const [direction, setDirection ] = useState("")
    
      async function handleClick(evt){
        evt.preventDefault();
        setDirection(props.direction)
        setSearchTerm(props.direction)
        console.log("Clicked the button", props.direction, direction)
        setSearchResults(await executeSearch(searchTerm));
      }


  return (
    <div>
        <button value={props.direction} onClick={handleClick}> Sort by Price({props.direction})</button>
    </div>
    )
}

export default Sort;
