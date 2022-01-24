import axios from "axios";

const all_products_URL = "https://fakestoreapi.com/products/";
const category_URL = "https://fakestoreapi.com/products/category/"


// We're passing a searchTerm here, but this function could make use of SearchContext instead. 
async function executeSearch(searchTerm = "", category = null) {

    let search_URL;
    let filteredResponse; 

    if (category !== null) {
        search_URL = (category_URL+category)

        const categoryresponse = await axios({
            method: 'get',
            url: `${search_URL}`,
            withCredentials: false,
        })
        
        filteredResponse = categoryresponse.data

    } else {
        search_URL = all_products_URL

        const searchresponse = await axios({
            method: 'get',
            url: `${search_URL}`,
            withCredentials: false,
        })
        
        //parse just the product item data
        const catalog = searchresponse.data
        
        if (searchTerm === ""){
            return catalog
        }
        //This expression looks for our term in the catalog string
        // the i flag ignores case
        // the g flag returns all results, not just the first one
        // This search has a notable limitation since substring "men" is returned when searching "women". 
        const searchExpression = new RegExp('.*' + searchTerm + '.*', 'gi')
      
        filteredResponse = catalog.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description) || searchExpression.test(item.category))
    
        if (filteredResponse.length === 0){
            console.log("Search for", searchTerm, "returned no results")
        } else {
            console.log("Search for", searchTerm, "returned", filteredResponse.length, "results")
        }
        // returns an array of products 
       
    } 

    return filteredResponse
}

export { executeSearch }