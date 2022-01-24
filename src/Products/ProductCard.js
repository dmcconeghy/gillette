// import { useState, useEffect } from "react";
import "../styles/Products.css"
// import axios from "axios"

function ProductCard(props) {
    // const [product, setProduct] = useState(null);

    // useEffect(() => {
    //     async function loadProduct() {
    //         productData = await axios.get(`https://fakestoreapi.com/products/${number}`).then(res=>res.data);

    //         setProduct(productData)
            
    //     }
    //     loadProduct();
    // }, [number])
        
        function trimTitle(title){
            return title.substr(0, 20) + "..."
            
        }

    return (
        <div className="ProductCard">
            {props ? 
            (
                <div className="Product grow">
                
                <p><img src={props.image} alt={props.description}></img></p>
                <p>{trimTitle(`${props.title}`)}</p>
                <p className="Category">{props.category}</p>
                <p>${props.price}</p>
                <button>Add to Cart</button>
                
        </div>
            ) : 'Loading...'}
        </div>
                              
    )
}

export default ProductCard