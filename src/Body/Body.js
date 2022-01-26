import '../styles/Body.css'
import { useContext } from 'react'
import { SearchContext } from '../Search/SearchContext'
import ProductTable from '../Products/ProductTable'
import Category from '../Search/Category'
import PriceSort from '../Search/PriceSort'
import PriceFilter from '../Search/PriceFilter'


function Body () {

    const { 
        // searchTerm, 
        searchResults, 
        // selectedCategories 
    }  = useContext(SearchContext)

    // An early attempt to make a simple but dynamic search/category alert revealed a more challenging logic function was required. 
    // The included lines 28-31 are only for testing. 

    return (
    <div className="BodyWrapper">
         {console.debug("The Body component has rendered")}
        <div className="Sidebar">

            <Category />
            
            <PriceFilter />

            <PriceSort />
            

        </div>
        <div className="Content">
            <div>
                {/* <p>{`Your last search term was "${searchTerm}" and returned ${searchResults? searchResults.length : "no"} results`}</p>
                <p>{`Your selected categories are: ${selectedCategories}`}</p> */}
            </div>
            <div className="ProductTable">
                
                <ProductTable productsObject = { searchResults } /> 
            </div>
        </div>
       
    </div>
 )
    
}

export default Body