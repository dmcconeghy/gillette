import { useState, useEffect } from "react";
import "../styles/ProductCard.css"
import axios from "axios"

function ProductCard({number = 1 }) {
    const [product, setProduct] = useState(null);

    let productData

    useEffect(() => {
        async function loadProduct() {
            productData = await axios.get(`https://fakestoreapi.com/products/${number}`).then(res=>res.data);

            setProduct(productData)
            
        }
        loadProduct();
    }, [number])
        
        function trimTitle(title){
            return title.substr(0, 20) + "..."
            
        }

    return (
        <div className="ProductCard">
            {product ? 
            (
                <div className="Product">
                
                <p>{trimTitle(`${product.title}`)}</p>
                <p className="Category">{product.category}</p>
                <p><img src={product.image} alt={product.description} height="50px"></img></p>
                <p>${product.price}</p>
                <button>Add to Cart</button>
                
        </div>
            ) : 'Loading...'}
        </div>
                              
    )
}

export default ProductCard