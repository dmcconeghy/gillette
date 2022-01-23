import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products/";

async function executeSearch(searchTerm = "") {

    //query the API for the json object 
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}`,
        withCredentials: false,
    })
    
    //parse just the product item data
    const catalog = response.data
 
    //This expression looks for our term in the catalog string
    // the i flag ignores case
    // the g flag returns all results, not just the first one
    const searchExpression = new RegExp('.*' + searchTerm + '.*', 'gi')
  
    const filteredResponse = catalog.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description) || searchExpression.test(item.category))

    // returns an array of products 
    return filteredResponse
}

// The ProductTable component takes an array of IDs.
// parseResponseProductIds() takes the product objects and returns an array with only the product IDs.

async function parseResponseProductIds(searchTerm) {

     // if the search is empty return
     if (searchTerm < 1) {
        return
    }

    const productObject = await executeSearch(searchTerm);

    let productIdArray = [];
    
    // React's lint does not like undefined variables, even in for... in loops. 
    let product;

    for (product in productObject){
         productIdArray.push(productObject[product].id);
    }

    //a quick console check
    console.log("The Helpers say your array is:", productIdArray)

    //Prevents return of empty array, keeping current results on-screen
    if (productIdArray.length === 0){
        console.log("Search for", searchTerm, "returned no results")
        return
    } else return productIdArray
}

export {executeSearch, parseResponseProductIds}