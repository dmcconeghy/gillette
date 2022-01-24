import '../styles/Body.css'
import { useContext, useEffect, useState, useMemo } from 'react'
import { SearchContext } from './SearchContext'
// import axios from 'axios'

function Category(props){

  const { 
    setSelectedCategories 
  } = useContext(SearchContext)

  // This returns an array with all the categories as strings
  // const categoriesArray = async function getCategories() {
  //   return ( 
  //     await axios({
  //     method: 'get',
  //     url: `https://fakestoreapi.com/products/categories`,
  //     withCredentials: false,
  //     })
  //   )
  // }

  const categoriesArray = useMemo (() =>{ 
      return [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing"
    ]}, [])
  
  
  //the categories checkboxes start as unchecked/false
  const [isChecked, setIsChecked] = useState(
    new Array(categoriesArray.length).fill(false)
  )

  const [checkedCategories, setCheckedCategories] = useState([])

  function handleOnChange (categoryindex) {

    const updatedCheckedState = isChecked.map(
      (check, index) => (index === categoryindex) ? !check : check
    )

    // This is necessary to create a controlled input.
    setIsChecked(updatedCheckedState);
  }

  useEffect(function fetchOnChange() {
    function fetchCategories() {
      
      function checkedTrueToCategoryName() {
        let temp = []
        for(let i=0; i<categoriesArray.length; i++){
          if (isChecked[i] === true) {
            temp.push(categoriesArray[i])
          }
        }
        return temp
      }
        
      const selectedCategories = checkedTrueToCategoryName()
    
      setCheckedCategories(selectedCategories)
      
    }
    fetchCategories();
  }, [categoriesArray, isChecked])

  console.log("Categories selected:", checkedCategories)
  console.log("Boxes checked:", isChecked)
 

  return (
    <div className="CategoryFilters">
        <p>Filter by category:</p>
      <ul>
          {categoriesArray.map((categoryname, index) => {
            return (
              <li key={categoryname}>
                <div className="ProductCategory">
                  <input
                    type="checkbox"
                    id={categoryname}
                    name={categoryname}
                    value={categoryname}
                    checked={isChecked[index]}
                    onChange={() => handleOnChange(index)}
                  />
                </div>
                <label htmlFor={categoryname}>{categoryname}</label>
              </li>
            )
          })
        }
      </ul>
    </div>
  );

}


export default Category


// {console.log((isChecked ? (`${props.category} is checked`) : (`${props.category} is unchecked`)))} 

//         <ul>
//             <li>
//               <input type="checkbox" checked={isChecked[index]} onChange={handleOnChange} id="Electronics" name="Electronics" value="Electronics"/>
//               <label htmlFor="Electronics" id="categorycheckboxlabel">Electronics</label>
//             </li>
            
//             <li>
//               <input type="checkbox" checked={isChecked} onChange={handleOnChange} id="Jewelery" name="Jewelery" value="Jewelery"/>
//               <label htmlFor="Jewelery" id="categorycheckboxlabel">Jewelery</label>
//             </li>
//             <li>
//               <input type="checkbox" checked={isChecked} onChange={handleOnChange} id="Men's Clothing" name="Men's Clothing" value="Men's Clothing"/>
//               <label htmlFor="Men's Clothing" id="categorycheckboxlabel">Men's Clothing</label>
//             </li>
//             <li>
//               <input type="checkbox" checked={isChecked} onChange={handleOnChange} id="Women's Clothing" name="Women's Clothing" value="Women's Clothing"/>
//               <label htmlFor="Women's Clothing" id="categorycheckboxlabel">Women's Clothing</label>
//             </li>
            
//         </ul> 


//   // the props.category need to be cleaned up for use in the API URL
//    let cleancategory = props.category.toLowerCase()

//   // On a change in check status swap the status.
//   // This function needs to return to setSelectedCategories an array of categories to be parsed into searchResults by searchHelpers
//   async function handleOnChange() {
//     setIsChecked(!isChecked)

//     if (cleancategory === "men's clothing"){
//       cleancategory = ("men%27s%20clothing") 
//     } else if (cleancategory === "women's clothing"){
//       cleancategory = ("women%27s%20clothing")
//     } 
    
//     setSelectedCategories(cleancategory)
  
//     setSearchResults( await executeSearch("", cleancategory))
//   }
