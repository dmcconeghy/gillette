import axios from "axios";

const all_products_URL = "https://fakestoreapi.com/products/";
const category_URL = "https://fakestoreapi.com/products/category/"

// 
//
async function executeSearch(searchTerm = "", categories = null) {

    let search_URL;
    let filteredResponse; 

    // If categories isn't null then we may be dealing with a category filter request
    // Categories are passed as an array of strings that must be correctly parsed for API URL
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
        console.log(categoryresponse.data)
        return categoryresponse.data
    }

    async function aggregateData (categoryArray){
        let data = []
        for (let i=0; i<categoryArray.length; i++){
            search_URL= (category_URL+`${categoryArray[i]}`)
            data = data.concat(await getData(categoryArray[i]))
        }

        return data
    }
        
    filteredResponse = aggregateData(parsedCategories)
        
        
        // filteredResponse = categoryresponse.data

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
            console.log("Search for >>", searchTerm, "<< returned", filteredResponse.length, "results")
        }
        // returns an array of products 
       
    } 

    return filteredResponse
}

export { executeSearch }