import axios from "axios";

const all_products_URL = "https://fakestoreapi.com/products/";
const category_URL = "https://fakestoreapi.com/products/category/"

// Searchhelpers is a key logic file for this project used by numerous components.  
// It takes a searchTerm and/or array of categories and results results from the Fake Store API. 
// Its logic looks first for category-alone requests (using the filter-by category buttons, say with all products displayed by default).
// If no category is supplied it looks for a search term and uses a RegExp string search across product titles, descriptions and categories.
// This file could be refactored further, e.g., separating the category url parser or the RegExp to add to its logic. 

async function executeSearch(searchTerm = "", categories = []) {

    if (categories === null){categories = []}
    let search_URL;
    let filteredResponse; 

    // If categories isn't null then we may be dealing with a category filter request
    // Categories are passed as an array of strings that must be correctly parsed for API URL.
    // This logic currently assumes that if we're using categories we do not have a search. 
    // This is presently obstructing filtering within search results, since the searchTerm needs to be passed to the filter and retained until it is set again elsewhere.
    // Search.js hoists searchTerm into the searchContext, so a code review will be needed to find places where that variable may be being altered uneccessarily. 
    if (categories.length > 0) {

        const parsedCategories = categories.map((category) => {
                if (category === "men's clothing"){
                     category = "men%27s%20clothing"
                } 
                
                if (category === "women's clothing"){
                    category= "women%27s%20clothing"
                } 
                
                return category
            })
    
    // Now we need to generate search results for each category in the array. 
    // We'll fetch results with getData, iterate over the categories, and then concat the responses to a single searchResults array. 

    async function getData (category) {
        search_URL = (category_URL+`${category}`)
        const categoryresponse = await axios({
            method: 'get',
            url: `${search_URL}`,
            withCredentials: false,
        })
        return categoryresponse.data
    }

    // This should be refcatored to reduce calls? It appears through the console to be requesting the data twice. 
    async function aggregateData (categoryArray){
        let data = []
        for (let i=0; i<categoryArray.length; i++){
            search_URL= (category_URL+`${categoryArray[i]}`)
            data = data.concat(await getData(categoryArray[i]))
        }

        return data
    }
        
    filteredResponse = aggregateData(parsedCategories)

    } else {
        console.log("All product results incoming...")
        search_URL = all_products_URL

        const searchresponse = await axios({
            method: 'get',
            url: `${search_URL}`,
            withCredentials: false,
        })
        
        //parse just the product item data
        const catalog = searchresponse.data
        
        if (searchTerm === "" && (categories === [] || categories === null)){
            return catalog
        }
        //This expression looks for our term in the catalog string
        // the i flag ignores case
        // the g flag returns all results, not just the first one
        // This search has a notable limitation since substring "men" is returned when searching "women". 
        const searchExpression = new RegExp('.*' + searchTerm + '.*', 'gi')
      
        filteredResponse = catalog.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description) || searchExpression.test(item.category))
    
        if (filteredResponse.length === 0){
            console.log(`Search for "${searchTerm}" returned no results`)
        } else {
            console.log(`Search for "${searchTerm}" returned ${filteredResponse.length} results`)
        }
        // returns an array of products 
       
    } 

    return filteredResponse
}

export { executeSearch }