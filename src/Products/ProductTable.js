import '../styles/Products.css'
import ProductCard from './ProductCard'


//By default the ProductTable returns all 20 items in the Fake Store API.
// Currently stateless, but since API calls populate empty props, may need to be in state.  
function ProductTable({ productIdArray = null }) {

    // //initialize the state of products as null to preserve the return ternary 
    // const [products, setProducts] = useState(null)

    function GenerateSequentialArray() {
        return Array.apply(null, {length: 20}).map(Number.call, Number);
    }
    
     return (
         
         <div className="ProductTable">
             {productIdArray ? (
                 (productIdArray.map(idx => 
                    (<ProductCard number={idx} key={idx}/>)))
                 )
            : (GenerateSequentialArray().map(idx => 
                (<ProductCard number={idx+1} key={idx+1}/>)))
             } 
             
       </div>
     )
 }
 
 export default ProductTable