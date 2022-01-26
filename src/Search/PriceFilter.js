import '../styles/Body.css'
import { useState, useContext } from 'react'
import { SearchContext } from './SearchContext';
import { executeSearch } from './SearchHelpers'


// PriceFilter currently executes on all products rather than the specific subset from a search term or categories. 
// In part this is due to both variables NOT being included in the useContext here. 
// Their inclusion results in several potentially app-breaking render bugs. 
function PriceFilter() {

    const { setSearchResults, sortAscending, setSortAscending, priceFilter, setPriceFilter } = useContext(SearchContext)

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const handleClick = async (evt) => {
        evt.preventDefault()
        // console.log(evt.target)
        console.log("You clicked sort by $", evt.target.value)

        const priceLimits = (evt.target.value).split('-')
        console.log(priceLimits)

        setSortAscending(true)
        setPriceFilter(priceLimits)
        setSearchResults(await executeSearch("", [], priceFilter, sortAscending))
    }
    
    const handleMinMaxSubmit = async (evt) => {
        evt.preventDefault();

        setSearchResults(await executeSearch("", [], [min, max]))
        
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
        {console.debug("The PriceFilter component has rendered")}
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
