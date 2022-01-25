# P & G Coding Challenge

## *A project by Dave McConeghy*
Contact: david.mcconeghy@gmail.com

***

### **Project minimum requirements:**
- [x] Build a React app
- [x] Utilize the [Fake Store API](https://fakestoreapi.com/)
- [x] Display all products
- [x] Allow user to search through products
- [x] Allow users to filter on product results
  - Price
  - Category
- [x] Allow user to sort on product price

### **Project reach goals:**
- Detailed product page
- Checkout flow
  - Shopping Cart
  - Checkout page (fake checkout info is ok)
  - Checkout confirmation (including regularly found checkout information)

#### Project notes:

##### 1/19/22 - 1/20/22

  With only a few weeks of instruction in React, I knew this project would be challenging for me. My early project planning focused on making a mock component tree. This was extremely useful for a day 1 implementation of basic API calls returning all products or a single product. Initial component design used a table to hold the mapped products into iterable product cards with plenty of room for further separation into smaller components. I experimented with a react-bootstrap UI package for styling and learned a serious lesson about unecessarily trying to resolve npm audit messages. 

  Next I began to work on the search feature. Here I ran into the first of several bottlenecks. Returning a simple search worked fairly early on, but I was stuck trying to figure out how to pass the results across components. If my search was in header component I wasn't able to pass results into the body. I tried several unsuccessful solutions: prop lifting, conditional useEffect calls, and nested callbacks. Prop lifting became an issue even with a modest component hierachy. I learned the hard way that useEffect tolerates no conditionals. Nested callbacks worked but resulted in numerous unwanted state updates. I then learned about useContext, which my bootcamp covers only briefly in a future section on Redux, and I began to implement a global searchContext. Vanilla JS encapsulation has soured me on global variables, but a console inspect of Instacart revealed just how widespread their use can be (i.e., hundreds)

#### 1/21/22 - 1/22/22
  I had less time to work on the project on these days, but I continued to explore how useContext would be the solution to passing search results across components. 

#### 1/23/22
  I successfully implemented useContext, which meant rapid progress on the filters and sorting requirements. It wasn't enough to learn about useContext itself, though. I gained a much deeper understanding of useState and how to set variables through UI components (e.g, filter buttons and search fields). UseMemo was also key to reducing state changes for the global search context variable passing.

  One weakness of my early design was returning an array product ids instead of an object with products. This meant additional API calls for each item. With searchResults being global, it became desirable to refactor the searchhelpers to implement this change, which also resulted in changes to the design of the product cards and their containing table. After refactoring the code is more flexible and less demanding of the API. 

#### 1/24/22
  After finishing the initial coding for sorting by price, I next turned to making category filters be multiple rather than singular and to implement the last feature of filtering by price. Returning items from a single category was straightforward, but I needed to revisit the searchContext and search component to merge/reduce multiple category results on the fly. It was quite challenging making category filters and I had to make use of what I had already learned about useState, useEffect, and useContext from creating the search feature. Very rewarding to see it work and it was fun to code. The challenge continued, however, as selecting filters was a step behind, and using filters after search results returned the full category rather than the search results category subset. It was gratifying to finally get useState and useEffect to work properly and to see the sort correctly append categories of products together which could then be sorted. In the end I realized that the design of my Category filters was a blend of two approaches: a) a select-box based category filter for search results and b) a category search button. I will return to this tomorrow to see if I can implement a fix. 

#### 1/25/22
  I wrapped up and commited the implementation of price filtering. Filtering within search results and sorting by price are still not working as intended. Partially a design feature, the calling of exectuteSearch by different components is often overriding earlier results rather than accumulating a more intensive list of filters. 


### Bugs, Issues, & Refactor Tracking

  - Search **bugs** 
    - ~~"clothing" returns 0 items;~~ *Found a misplaced ) causing category and description not to be searched.* 
    -  Using multiple search terms fails if words not found in exactly that order/spacing.
    -  Potentially unwanted substring search results men's clothing retuns women's clothing
  - UseState **issue**
    - I believe searches are making un-needed calls. These are clearer with console.log in Search lines 43-44 where we can see potentially unwanted data fetching due to the order of useState/useEffect calls. Also visible during searches with products swapping places rapidly before final render?
  - SearchHelpers **refactor** 
    - *Refactored searchHelpers (and product / productTables components) to use the API returned object rather than using productIDs and calling the API a second time*
    - ~~~Search helper takes the executeSearch and returns productIDs as an array.~~~
    - ~~~If executeSearch returned an array of product objects we could reduce API calls especially cf. useState bugs~~~
  - Categories **bug** 
    - *Refactored category code to explicitly identify the categories and pass their value to the API's built in category route."* 
    - ~~~Clicking "Men's Clothing" also returns "Women's Clothing"~~~
    - ~~~I'm incorrectly implementing useState/useEffect and the select boxes are returning on second click the first click's results. Sorting by price correctly identifies the currently checked boxes.~~~ *Fixed by correctly alinging useState and useContext variables* 
  - Sorting **bugs** **issues**
    - *issue* Sorting is currently one-way from default order by id to ascending order by price. Add a toggle feature to sort low-high and high-low.  
    - *issue* Searching all products returns results from multiple categories. If a category filter is then selected, the results returned are all products from the category rather than the subset of items in that category from the search results. *A fix will require tweaks to SearchHelper's logic by checking for empty or in useContext searchTerms and then sustaining them during the filter/sorting.* 
    - *bug* ~~~Filtering to no items (all > electronics(on) > electonics(off)) should return all products again.~~~ *Fixed by changing SearchHelpers logic to only show category filters if categoryArray > 0 rather than if it was null because an empty category array isn't null (though both are falsy)*  

### Features to Implement
  - Axios error handling. All API calls should be wrapped with try/catch. 
  - Active search results. Presently terms are only passed on search form submission, not during search term entry.
  - 
   
