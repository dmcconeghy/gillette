import axios from "axios";

// Searchhelpers is a key logic file for this project used by numerous components.  
// It takes a searchTerm and/or array of categories and results results from the Fake Store API in variable "filteredResponse". 
// Its logic looks first for category-alone requests (using the filter-by category buttons, say with all products displayed by default).
// If no category is supplied it looks for a search term and uses a RegExp string search across product titles, descriptions and categories.
// An initial refactor of this file failed, causing numerous bugs that would have pushed product delivery out, but which retain several known bugs.  
// For a refactor it would be helpful to split the logic across the variables and handle each in turn.
// In this way you could separating and resuse the category url parser or add to the RegExp logic to search multple words or use more advance search operands. 

// This array of product objects is fetched at the start of each app load, since this is the top-level of SearchHelpers. 
// An obvious refactor would be to extract this API call into a component to pull it into the global SearchContext.
// If we expected the db to change, this fetch might employ a recurring useMemo call. 

const all_products_URL = "https://fakestoreapi.com/products/";

async function getAllProducts() {
    console.debug("Start of search: all product results being fetched.")

    const searchresponse = await axios({
        method: 'get',
        url: `${all_products_URL}`,
        withCredentials: false,
    })

    console.debug(`getAllProducts returned ${searchresponse.data.length} products`)
    return searchresponse.data
}

//It would be ideal for use to await allProducts here, but we can't use await on the top level. 
// We could all experiments from WebPack to turn this on or find a way to wrap this in a function.
// What we want to avoid is having every search call our API. 
// So we could sessionize or memoize our data or write it to a json file? 

const allProductsPromise = getAllProducts()



// Our first goal in the app is to display all products as the default landing page. 
// Our search function has the following default variables globally scoped in components using SearchContext:
// searchTerm = ""
// selectedCategories = []
// priceFilter = [0, -1]
// On-load we have no search term, no categories, and no price filter.
// Searches which contain exactly these defaults load the unaltered allProductObjects. 
// executeSearch's default variables are different, too, since this is not a component
// Price sort is an on-click option. 

// Our primary search return function is executeSearch, which always returns an array of product objects to be displayed. 
async function executeSearch(term = "", categories = [], price = [0, -1]){

    // for each new search we want to start with allProducts and empty variables. 
    // This ensures that changes in the search (expansions or reductions) are handled correctly. 
    // Otherwise reductions would be be lost if the search got less restrictive. 

    const allProducts = await allProductsPromise
    // const allProducts = await getAllProducts()

    let searchResultsAccumulator = [] 
    let searchFilteredProducts = [] 
    let categoryFilteredProducts = [] 
    let priceFilteredProducts = []
    let finalResults = []
    
    // This function always takes the full allProducts and returns only products matching the inputted term.
    function textSearch (term, searchResultsAccumulator) {

        //Looks for our term in allProducts
            // the i flag ignores case
            // the g flag returns all results, not just the first one
            // This search has two notable limitations:
            // 1) it handles substring matches poorly and
            // 2) it does not handle multiple words additively but rather an entire strings.
        const searchExpression = new RegExp('.*' + term + '.*', 'gi')
        
        const textSearchProducts = searchResultsAccumulator.filter(item => searchExpression.test(item.title) || searchExpression.test(item.description) || searchExpression.test(item.category))

        console.debug(`textSearch() returning ${textSearchProducts.length}search results for "${term}"`)

        return textSearchProducts
    }

    // This function always takes the current accumulator and reduces it to only the matching prices
    function pricedProducts (price, searchResultsAccumulator){
        
        const pricedProducts = searchResultsAccumulator.filter((product) => 
            product.price >= price[0] && product.price <= price[1])

        console.log(`Prices limited to between results between ${price[0]} and ${price[1]}`)

        return pricedProducts
    }

    // This function always takes the current accumulator and reduces it to only the matching categories
    function categorizedProducts(categories, searchResultsAccumulator = []){
            let categoryProducts = []

            for (let c=0; c < categories.length; c++){
                for (let i=0; i<searchResultsAccumulator.length; i++){
                    if (searchResultsAccumulator[i].category === categories[c]) { 
                        categoryProducts.push(searchResultsAccumulator[i])
                    }
                }
            }
            
            return categoryProducts
        }

    // Is everything a default? Return all 20 products sorted by their default productIds.
    // if not set the searchResultsAccumulator to allProducts
    if (arguments.length === 0){

        return finalResults = allProducts
    } else {
        searchResultsAccumulator = allProducts
    }
    
    // Is there a term?
    if (term !== ""){

        // look for our term in the accumulator and reduce the results.
        searchFilteredProducts = textSearch(term, searchResultsAccumulator)
        
        // end of the line for term-only searches
        if (categories.length === 0 && price[1] === -1){

           return finalResults = searchFilteredProducts
           
        // Otherwise update the accumulator
        // no return as we still check other search variables  
        } else {
            searchResultsAccumulator = searchFilteredProducts
             
        }
    }

    //Are there categories?
    if (categories.length > 0){

        //Look for our categories in the accumulator and reduce the results
        categoryFilteredProducts = categorizedProducts(categories, searchResultsAccumulator)

        // end of the line for category-only searches
        if (term === "" && price[1] === -1){
            return finalResults = categoryFilteredProducts
        
        // Otherwise update the accumulator
        // no return as we still check other search variables  
        } else {
            searchResultsAccumulator = categoryFilteredProducts
        }
    }

    // Are we price filtering?
    if (price[1] !== -1){

        //Check the prices of items in the accumulator and reduce the results
        priceFilteredProducts = pricedProducts(price, searchResultsAccumulator)

        //End of the line for price-only searches
        if (term === "" && categories.length === 0){
           return finalResults = priceFilteredProducts
        
        // Otherwise we have our final result already
        } else {
            searchResultsAccumulator = priceFilteredProducts
        }

    }
    
    // Haven't returned finalResults yet? Time to pass our accumulator's results to it. 
    finalResults = searchResultsAccumulator

    // console.log(`executeSearch() has finished with ${finalResults.length} final results for searchTerm(${term}), categories(${categories}), price(${price})`)

    return finalResults
}

export { executeSearch }