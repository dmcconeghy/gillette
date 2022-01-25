import '../styles/Body.css'
import { useContext, useEffect, useState, useMemo } from 'react'
import { SearchContext } from './SearchContext'
import { executeSearch } from './SearchHelpers'
// import axios from 'axios'

function Category(){

  const {
    searchTerm, 
    setSelectedCategories,
    setSearchResults 
  } = useContext(SearchContext)

  // This returns an array with all the categories as strings
  // With a dynamic or larger db we would need to call the API to confirm the categories before adding them to the app. 
  // For simplicitly the Fake Store API's four categories have been memoized below, 
  // but SearchHelpers does use the API to generate category specific calls.
  // A potential refactor might include adding a useContext for categories to be used here,
  // in the search functions, and future features like product descriptions or breadcrumbs.
  //   
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

  //A potential refactor could merge categoriesArray and their checked states into a single array like so:
  // const [isChecked, setIsChecked] = useState(
  //   [{"electronics": false}, {"jewelery": false}, {"men's clothing": false}, {"women's clothing": false}]
  // )
  
  const handleOnChange = (categoryindex) => {

    //update the array of select box states
    const updateCheckedState = isChecked.map(
      (check, index) => (index === categoryindex) ? !check : check
    )
    // This is necessary to create a controlled input.
    setIsChecked(updateCheckedState)
  }

  useEffect(function fetchOnChange() {
    async function fetchCategories() {

       //when called it looks at isChecked and maps checked items into namedCategories
       const namedCategories = function convertCheckStateToNames() {
        let temp = []
        for(let i=0; i<categoriesArray.length; i++){
          if (isChecked[i] === true) {
            temp.push(categoriesArray[i])
          }
        }
        return temp
      }
      console.log("Categories selected:", namedCategories())

      // This results in a category search using the filter buttons, say on the default products list. 
      setSearchResults(await executeSearch(searchTerm, namedCategories()));
      
      // If we want to include category filters on other searches, the namedCategories must be set in SearchContext
      setSelectedCategories(namedCategories())

    }
    fetchCategories();
  }, [isChecked, categoriesArray, searchTerm, setSearchResults, setSelectedCategories])

 
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
                  <label htmlFor={categoryname}>{categoryname.toLocaleUpperCase()}</label>
                </div>
                
              </li>
            )
          })
        }
      </ul>
    </div>
  );

}

export default Category