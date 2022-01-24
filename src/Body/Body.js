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
            <p>Filter by category:</p>
                <ul>
                    <li><Category category= "Electronics" /></li>
                    <li><Category category= "Jewelery" /></li>
                    <li><Category category= "Men's Clothing" /></li>
                    <li><Category category= "Women's Clothing" /></li>
                    
                </ul>
            
        </div>
        <div> Price sort buttons </div>
            <Sort /> 
        </div>

        <div className="Content">

            <div className="ProductTable">
                <ProductTable productsObject = { searchResults } /> 
            </div>
        </div>
       
    </div>

    
 
 )
    
 
 
}

export default Body

