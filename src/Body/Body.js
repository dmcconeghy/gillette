import '../styles/Body.css'
import { useContext } from 'react'
import { SearchContext } from '../Search/SearchContext'
import ProductTable from '../Products/ProductTable'
import Category from '../Search/Category'
import PriceSort from '../Search/PriceSort'
import PriceFilter from '../Search/PriceFilter'
import Results from './Results'


function Body () {

    const { 
        searchResults
    }  = useContext(SearchContext)
    

    

    return (
    <div className="BodyWrapper">
         {console.debug("<Body /> rendered")}
        <div className="Sidebar">

            <Category />
            
            <PriceFilter />

            <PriceSort />
            

        </div>
        <div className="Content">
            <Results />
            <div className="ProductTable">
                
                <ProductTable productsObject = { searchResults } /> 
            </div>
        </div>
       
    </div>
 )
    
}

export default Body