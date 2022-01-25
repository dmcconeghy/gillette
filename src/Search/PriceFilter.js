import '../styles/Body.css'
import { useState, useContext } from 'react'
import { SearchContext } from './SearchContext';
import { executeSearch } from './SearchHelpers'

function PriceFilter() {

    const { setSearchResults, sortAscending, setSortAscending } = useContext(SearchContext)

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const handleClick = async (evt) => {
        evt.preventDefault()
        // console.log(evt.target)
        console.log("You clicked sort by $", evt.target.value)

        const priceLimits = (evt.target.value).split('-')
        console.log(priceLimits)

        setSortAscending(true)
        setSearchResults(await executeSearch("", [], priceLimits, sortAscending))
    }
    
    const handleMinMaxSubmit = async (evt) => {
        evt.preventDefault();

        setSearchResults(await executeSearch("", [], [min, max]))
        console.log("This feature doesn't work yet")
    }

    const handleMinChange = (evt) => {
        setMin(evt.target.value)
        console.log("min:", min)
    }

    const handleMaxChange = (evt) => {
        setMax(evt.target.value)
        console.log("max:", max)
    }

  return (
    <div>
        <div className="PriceFilter">
        <p>Filter by price:</p>
            <ul>
                <li>
                    <button onClick={(evt) => handleClick(evt)} value="0-10">Under $10</button>
                </li>
                <li>
                    <button onClick={(evt) => handleClick(evt)} value="10-25">$10 to $25</button>
                </li>
                <li>
                    <button onClick={(evt) => handleClick(evt)} value="25-50">$25 to $50</button>
                </li>
                <li>
                    <button onClick={(evt) => handleClick(evt)}  value="50-100">$50 to $100</button> 
                </li>
                <li>
                    <button onClick={(evt) => handleClick(evt)}  value="100-1000">Over $100</button> 
                </li>
            </ul>
        </div>

        <label className="PriceMinMax">
        <form onSubmit={(evt) => handleMinMaxSubmit(evt)}>
            <input type="text"  placeholder={"Min"} onChange={handleMinChange} ></input>
            <input type="text" placeholder={"Max"}  onChange={handleMaxChange} ></input>
            <button value="GO">GO</button>
        </form>
        </label>

    </div>
  )
}

export default PriceFilter;
