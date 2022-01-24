import '../styles/Products.css'
import ProductCard from './ProductCard'


//By default the ProductTable returns all 20 items in the Fake Store API.
//
function ProductTable({ productsObject = null }) {

    console.log(productsObject)
  

    function GenerateSequentialArray() {
        return Array.apply(null, {length: 20}).map(Number.call, Number);
    }
 

     return (
         
         <div className="ProductTable">
             {
                 (productsObject.map(item => (
                     <ProductCard 
                        key={item.id} 
                        title={item.title}
                        price={item.price} 
                        description={item.description}
                        category={item.category}
                        image={item.image}
                        rating={item.rating}
                    />
                 )))
             }
           
            
            
            
             {/* {productIdArray ? (
                 (productIdArray.map(idx => 
                    (<ProductCard number={idx} key={idx}/>)))
                 )
            : (GenerateSequentialArray().map(idx => 
                (<ProductCard number={idx+1} key={idx+1}/>)))
             }  */}
             
       </div>
     )
 }
 
 export default ProductTable

//  function ProductTable({ productObjectArray = null }) {

//     // If the object is null, supply all 20 products
//     // For a dynamic db, we'd need a helper function to find the length. 
//     function GenerateSequentialArray() {
//         return Array.apply(null, {length: 20}).map(Number.call, Number);
//     }

//     // We need to transform the object to an array so that its values can be mapped.
//     //
//     for (product in productObject){
//         productArray.push(...productObject[product]);
//    }

//      return (
         
//          <div className="ProductTable">
//              {productArray ? (
//                  (productArray.map(idx => 
//                     (<ProductCard 
//                         number={idx} 
//                                     )))
//                  )
//             : (GenerateSequentialArray().map(idx => 
//                 (<ProductCard number={idx+1} key={idx+1}/>)))
//              } 
             
//        </div>
//      )
//  }