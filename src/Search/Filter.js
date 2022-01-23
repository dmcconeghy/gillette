// import '../styles/Filter.css'
import { parseResponseProductIds } from './SearchHelpers'

function Filter(props){

  // If the button is pressed, set the filtered category
  async function handleClick(evt) {
    evt.preventDefault();
    const results = await parseResponseProductIds(props.category)
    console.log("Results of clicking",props.category, "are:", results)
    return results
  }

  return (
      <>
      <button value={props.category} onClick={handleClick}>{props.category}</button>
      {/* <ProductTable productIdArray={categoryArray} /> */}
      </>
  );

}

export default Filter