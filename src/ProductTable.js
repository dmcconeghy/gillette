import React from 'react'

import './ProductTable.css'
import Product from './Product'


//By default the ProductTable returns all 20 items in the Fake Store API. 
function ProductTable({ productIdArray }) {

    function GenerateSequentialArray() {
        return Array.apply(null, {length: 20}).map(Number.call, Number);
    }

    const allProductsArray = GenerateSequentialArray()

    // Our product Ids can't be less than 1 or greater than 20
    function ValidateArray(unfilteredArray) {
        return unfilteredArray.filter(value => { return value > 1 && value <=20;});
    }
    
    const validatedIdArray = ValidateArray(productIdArray)
    
     return (
         
         <div className="ProductTable">
             {productIdArray ? (
                 (validatedIdArray.map(idx => 
                    (<Product number={idx+1} key={idx+1}/>)))
                 )
            : (allProductsArray.map(idx => 
                (<Product number={idx+1} key={idx+1}/>)))
             } 
             
       </div>
     )
 }
 
 export default ProductTable