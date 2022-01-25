import axios from "axios";

const all_products_URL = "https://fakestoreapi.com/products/";
const category_URL = "https://fakestoreapi.com/products/category/"

// Searchhelpers is a key logic file for this project used by numerous components.  
// It takes a searchTerm and/or array of categories and results results from the Fake Store API in variable "filteredResponse". 
// Its logic looks first for category-alone requests (using the filter-by category buttons, say with all products displayed by default).
// If no category is supplied it looks for a search term and uses a RegExp string search across product titles, descriptions and categories.
// An initial refactor of this file failed, causing numerous bugs that would have pushed product delivery out, but which retain several known bugs.  
// For a refactor it would be helpful to split the logic across the variables and handle each in turn.
// In this way you could separating and resuse the category url parser or add to the RegExp logic to search multple words or use more advance search operands. 

async function executeSearch(term = "", categories = [], price = [0, -1], ascending) {

    // if (categories === null){categories = []}
    let search_URL;
    let filteredResponse; 

    // If categories isn't null then we may be dealing with a category filter request
    // Categories are passed as an array of strings that must be correctly parsed for API URL.
    // This logic currently assumes that if we're using categories we do not have a search. 
    // This is presently obstructing filtering within search results, since the searchTerm needs to be passed to the filter and retained until it is set again elsewhere.
    // Search.js hoists searchTerm into the searchContext, so a code review will be needed to find places where that variable may be being altered uneccessarily. 
    if (categories !== null && categories.length > 0) {

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

    // This should be refcatored to reduce calls. One solution would be to call allProducts once and memoize it. 
    // Then future searches could either use it as the default or turn it into subsets for search/category/price requests. 
    // It appears through the console to be requesting the data twice. A useRef hook was added to Category.js to try to avoid this. 
    async function aggregateData (categoryArray){
        let data = []
        for (let i=0; i<categoryArray.length; i++){
            search_URL= (category_URL+`${categoryArray[i]}`)
            data = data.concat(await getData(categoryArray[i]))
        }

        return data
    }
        
    filteredResponse = aggregateData(parsedCategories)

    // returns an array of products 
    } else {
        //Keeping this line in the console.log reveals how executeSearch is not handling componentmounting/updating in an ideal way. 
        // Searches result in brief pops of different searchResults, say between an original product array arriving and then being sorted. 
        // These problems are most acute in relation to the Category component and its related search functions here in the logic above. 
        console.log("All product results incoming...")
        search_URL = all_products_URL

        const searchresponse = await axios({
            method: 'get',
            url: `${search_URL}`,
            withCredentials: false,
        })
        
        //parse just the product item data
        const catalog = searchresponse.data
        
        if (term === "" && (categories === [] || categories === null)){
            return catalog
        }
        //This expression looks for our term in the catalog string
        // the i flag ignores case
        // the g flag returns all results, not just the first one
        // This search has a notable limitation since substring "men" is returned when searching "women". 
        const searchExpression = new RegExp('.*' + term + '.*', 'gi')
      
        filteredResponse = catalog.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description) || searchExpression.test(item.category))
    
        //During testing this is helpul to see data on the given and returned items.
        // if (filteredResponse.length === 0){
        //     console.log(`Search for "${term}" returned no results`)
        // } else {
        //     console.log(`Search for "${term}" returned ${filteredResponse.length} results`)
        // }
        
    } 

    // Filter is very touchy about being given non arrays, which often happens during testing. 
    if (price[1] !== -1 && filteredResponse){
        
        const pricedResults = filteredResponse.filter((product) => 
            product.price >= price[0] && product.price <= price[1]
        )

        console.log(`Prices limited to between results between ${price[0]} and ${price[1]}`)

        filteredResponse = pricedResults
    }

    if (ascending === true) {
        
        filteredResponse.sort((a,b) => (a.price > b.price) ? 1 : -1)
    } else if (ascending === false){
        filteredResponse.sort((a,b) => (a.price > b.price ) ? -1 : 1)   
    } 


    return filteredResponse
}

export { executeSearch }