import '../styles/Body.css'
import { useContext } from 'react'
import { SearchContext } from '../Search/SearchContext'
import ProductTable from '../Products/ProductTable'
import Category from '../Search/Category'
import Sort from '../Search/Sort'


function Body () {

    const { searchResults }  = useContext(SearchContext)

 return (
    <div className="BodyWrapper">
        <div className="Sidebar">
        <div className="CategoryFilters">
            <Category category= "Electronics" />
            <Category category= "Jewelery" />
            <Category category= "Men's Clothing" />
            <Category category= "Women's Clothing" />
        </div>
        <div> Price sort buttons </div>
            <Sort /> 
        </div>

        <div className="Content">
            <div className='SearchFilters'>
            
            </div>

            <div className="ProductTable">
                <ProductTable productsObject = { searchResults } /> 
            </div>
        </div>
       
    </div>

    
 
 )
    
 
 
}

export default Body

