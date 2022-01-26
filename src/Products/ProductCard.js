import "../styles/Products.css"

// ProductCard spreads product properties across. 
// Further component reduction may be desirable for use in a future product description page.  
// Ideally, the props? ternary would show loading if the API results were delayed. 

function ProductCard(props) {

        function trimTitle(title){
            return title.substr(0, 20) + "..."
        }

    return (
        <div className="ProductCard">
            {console.debug("A ProductCard component has rendered")}
            {props ? 
            (
                <div className="Product grow">
                
                <p><img src={props.image} alt={props.description}></img></p>
                <p>{trimTitle(`${props.title}`)}</p>
                <p className="Category">{props.category}</p>
                <p>Rating: {props.rating.rate}({props.rating.count})</p>
                <p>${props.price}</p>
                <button>Add to Cart</button>
                
                </div>
            ) : 'Loading...'}
        </div>
                              
    )
}

export default ProductCard