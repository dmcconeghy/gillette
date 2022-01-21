import './ProductTable.css'
import Product from './Product'


//By default the ProductTable returns all 20 items in the Fake Store API.
// Currently stateless, but since API calls populate empty props, will need to be in state.  
function ProductTable({ productIdArray = null }) {

    // //initialize the state of products as null to preserve the return ternary 
    // const [products, setProducts] = useState(null)

    function GenerateSequentialArray() {
        return Array.apply(null, {length: 20}).map(Number.call, Number);
    }

    const allProductsArray = GenerateSequentialArray()

    // Our product Ids can't be less than 1 or greater than 20
    function ValidateArray(unfilteredArray) {
        //null arrays return all products by default
        if (unfilteredArray === null){
            return 
        } else return unfilteredArray.filter(value => { return value > 1 && value < 21;});
    }
    
    const validatedIdArray = ValidateArray(productIdArray)

    // set the state with the validated array
    // setProducts(validatedIdArray)
    
     return (
         
         <div className="ProductTable">
             {productIdArray ? (
                 (validatedIdArray.map(idx => 
                    (<Product number={idx} key={idx}/>)))
                 )
            : (allProductsArray.map(idx => 
                (<Product number={idx+1} key={idx+1}/>)))
             } 
             
       </div>
     )
 }
 
 export default ProductTable