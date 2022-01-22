// import '../styles/Filter.css'
import { parseResponseProductIds } from './SearchHelpers';
import ProductTable from '../Products/ProductTable';

function Filter(props){
        // const [filter, setFilter] = useState("");
      
        //If the contents change, set the term to the state
        // function handleChange(evt) {
        //   setFilter(evt.target.value);
        // };
      
        // If the button is pressed, set the filtered category
        function handleClick(evt) {
          evt.preventDefault();
          const results = parseResponseProductIds(props.category)
          console.log("Results of clicking:",props.category, "are:", results)
          return results
        }
      
        // const categoryArray = handleClick(evt)

        return (
            <>
            <button value={props.category} onClick={handleClick}>{props.category}</button>
            {/* <ProductTable productIdArray={categoryArray} /> */}
            </>
        );

}

export default Filter