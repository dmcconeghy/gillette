import '../styles/Products.css'
import ProductCard from './ProductCard'


//By default a null productsObject returns all 20 items in the Fake Store API.
//
function ProductTable({ productsObject = null }) {
  
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
           
       </div>
     )
 }
 
 export default ProductTable