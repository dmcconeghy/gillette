import { useState, useEffect } from "react";
import "./Product.css"
import axios from "axios"

function Product({number = 1 }) {
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        async function loadProduct() {
            const productData = await axios.get(`https://fakestoreapi.com/products/${number}`).then(res=>res.data);

            setProduct(productData)
        }
        loadProduct();
    }, [number])
        
    return (
        <div className="ProductCard">
            {product ? 
            (
                <div className="Product">
                
                <h4>{product.title}</h4>
                <img src={product.image} alt={product.description} height="50px"></img>
                <p>{product.price}</p>
                </div>
            ) : 'Loading...'}
        </div>
                              
    )
}

export default Product