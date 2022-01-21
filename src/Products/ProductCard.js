import { useState, useEffect } from "react";
import "./Product.css"
import axios from "axios"
import Product from "./Product";

function ProductCard({number = 1 }) {
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
                <Product />
            ) : 'Loading...'}
        </div>
                              
    )
}

export default ProductCard