function Product(props) {
    return (
        <div className="Product">
                
                <h4>{props.title}</h4>
                <img src={props.image} alt={props.description} height="50px"></img>
                <p>{props.category}</p>
                <p>{props.price}</p>
        </div>
    )
}

export default Product