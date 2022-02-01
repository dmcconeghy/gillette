import '../styles/Products.css'
import ProductCard from './ProductCard'

function ProductTable({ productsObject }) {
 
    return (
        <div className="ProductTable">
            {console.debug("<ProductTable /> rendered")}
            

            {productsObject.map(item => (
                    <ProductCard 
                        key={item.id} 
                        title={item.title}
                        price={item.price} 
                        description={item.description}
                        category={item.category}
                        image={item.image}
                        rating={item.rating}
                    />
                ))
            } 
        </div>
        )
}  

 export default ProductTable