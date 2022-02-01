import '../styles/Body.css'
import { useState, useContext, useEffect } from 'react'
import { SearchContext } from './SearchContext';
import { executeSearch } from './SearchHelpers'


//Price Filter takes a searchResult and pares it back by the selected price range. 
// The Min-Max fields do not reset automatically. They retain their values visually. 
// Leaving min empty will default to 0+; leaving max empty will default to all > min. 
// Setting a max and then deleting it will result in Max being set as an empty string but no results will be returned.
// This is because while the state has been updated, it hasn't pushed a change to the render.  

function PriceFilter() {

    const { 
        searchTerm, 
        selectedCategories, 
        setSearchResults, 
        priceFilter, 
        setPriceFilter 
    } = useContext(SearchContext)

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
   
    const handleClick = async (evt) => {
        evt.preventDefault()
     
        console.debug("You clicked sort by $", evt.target.value)

        const priceStrings = (evt.target.value).split('-')
   
        setPriceFilter( [parseInt(priceStrings[0]), parseInt(priceStrings[1])] )
        
    }

   useEffect(() => { async function setLimits() {
        console.debug("<PriceFilter /> calls executeSearch for range")
        setSearchResults(await executeSearch(searchTerm, selectedCategories, priceFilter))
        
        }
    setLimits()
    }, [searchTerm, selectedCategories, priceFilter, setSearchResults])
    
    const handleMinMaxSubmit = async (evt) => {
        evt.preventDefault();

        console.debug(`<PriceFilter /> calls executeSearch for ${min}:${max}`)
    
        // Error checking: No non-numbers, no negatives. 
        if ((isNaN(min) === false && min >= 0) && ((isNaN(max) === false && max >= 0) || max === "" || max === Infinity)){
        
            // If we simply want items over $### leaving the max blank sets it to infinity, returning all potential higher results.
            if (max === 0 || max === ""){
                
                setMax(Infinity)
                setSearchResults(await executeSearch())
            }
            if (min === 0 && max === Infinity){
                
                setSearchResults(await executeSearch())
            }

            if (min === "" && max === ""){
                setSearchResults(await executeSearch())
            }

            setSearchResults(await executeSearch(searchTerm, selectedCategories, [min, max]))

            // // These solutions for resetting min/max values do not work. 
            // setPriceFilter([0, 0])
            // setMin("")
            // setMax("")

        }
    }

    // I have opted for user inputted "GO" as the request to price filter with min/max. 
    // This code could be used to actively load products matching the price filter. 
    // Its primary drawback is that during entry blank screens can and will appear before the user completes entering their desired price range. 

    // useEffect(() => {async function minMaxSearch() {
    //     // if ((min === 0 || min === "") && max === ""){
    //     //     setMax(Infinity)
    //     //     setSearchResults(await executeSearch())
    //     // }

    //     if (max === 0 || max === ""){
    //         setMax(Infinity)
    //     }
    //     if (min === 0 && max === Infinity){
    //         setSearchResults(await executeSearch())
    //     }
    //     setSearchResults(await executeSearch(searchTerm, selectedCategories, [min, max]))

    //     } minMaxSearch()
    // },[searchTerm, selectedCategories, min, max, setSearchResults, setMax])


    const handleMinChange = (evt) => {
        if (evt.target.value === ""){
            setMin(0)
           
        }
        setMin(evt.target.value)
                
    }

    const handleMaxChange = (evt) => {
        if (evt.target.value === ""){
           
        }
       
        setMax(evt.target.value)
         
    }

  return (
    <div>
        <div className="PriceFilter">
        {console.debug("<PriceFilter /> rendered")}
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
            <input type="text" name="Min" placeholder={"Min"} onChange={handleMinChange} ></input>
            <input type="text" name="Max" placeholder={"Max"}  onChange={handleMaxChange} ></input>
            <button value="GO">GO</button>
        </form>
        </label>

    </div>
  )
}

export default PriceFilter;
