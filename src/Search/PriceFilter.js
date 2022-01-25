import '../styles/Body.css'
import { useContext } from 'react'
import { SearchContext } from './SearchContext';

function PriceFilter() {

    const { searchResults, setSearchResults } = useContext(SearchContext)

    const handleClick = (evt) => {
        evt.preventDefault()
        console.log(evt.target)
    }
    function priceLimit() {

    }


  return (
    <div className="PriceFilter">
        <ul>
            {/* <li>
                <button onClick={handleClick()} value="0-25">Under $25</button>
            </li>
            <li>
                <button onClick={handleClick()} value="25-50">$25 to $50</button>
            </li>
            <li>
                <button onClick={handleClick()} value="50-100">$50 to $100</button>
            </li>
            <li>
                <button onClick={handleClick()}  value="100+">$100 and up</button>
            </li> */}
        </ul>

    </div>
  )
}

export default PriceFilter;
