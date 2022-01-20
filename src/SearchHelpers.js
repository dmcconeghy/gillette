import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products/";

async function executeSearch(searchTerm = "") {

    //query the API for the json object 
    const response = await axios.get(`${BASE_URL}`);
    
    //parse just the product item data
    const catalog = response.data
 
    //This expression looks for our term in the catalog string
    // the i flag ignores case
    // the g flag returns all results, not just the first one
    const searchExpression = new RegExp('.*' + searchTerm + '.*', 'gi')
  
    const filteredResponse = catalog.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description))

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
    console.log(productIdArray)
    return productIdArray
}

export {executeSearch, parseResponseProductIds}