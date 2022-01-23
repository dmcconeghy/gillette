import { useState, useContext } from 'react'
import '../styles/Body.css'
import Search from '../Search/Search';
import ProductTable from '../Products/ProductTable';
import Filter from '../Search/Filter';
import { SearchContext } from '../Search/SearchContext'

function Body () {

    const { searchResults }  = useContext(SearchContext)

 return (
     <div className="BodyWrapper">
         <div className="SearchFilters">
            <div className="SearchField">
                
            </div>
            <div className="Filters">
                <Filter category= "Electronics" />
                <Filter category= "Jewelery" />
                <Filter category= "Men's Clothing" />
                <Filter category= "Women's Clothing" />
            </div>
        </div>
        <div className="ProductTable">
            <ProductTable productIdArray = { searchResults } /> 
        </div>
       
    </div>

    
 
 )
    
 
 
}

export default Body

