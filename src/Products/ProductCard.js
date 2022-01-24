import "../styles/Products.css"

// This is a dumb component. 
// Ideally, the props? ternary would show loading if the API results were delayed. 

function ProductCard(props) {

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