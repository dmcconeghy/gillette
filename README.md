# P & G Coding Challenge

## *A project by Dave McConeghy*
Contact: david.mcconeghy@gmail.com

***

#### 1/26/22 - UPDATE: On the aftersubmitbranch I am continuing to work on this project and attempting to implement bug-fixes to the core functionality described in the minimum requirements below. The main branch remains the version I submitted at project deadline, but since this is a public and deployed project, I'd like for the features I'm using to work before I consider moving on to the next project. 





Project Summary on submit 1/25/22: 

This was the first React app I've ever made. It was absolutely a trial by fire for me and a jump ahead of a month or two in my bootcamp. I think the most challenging decision I had to make for this app was how to implement the search alongside the filters. I approached these indpendently from the start and was punished later by that choice. In hindsight, it's clearer that I should have begun with an expansive searchContext that I could have used across components. Adding extra features on top of my original search led to complicated results, which remain in the program's tendency to render results several times. These are the asterisks below on the "Allow users to filter on product results (Price, Category)" and "Allower user to sort on product price." Users can filter all products by price or by multiple categories, but they cannot do so concurrently. The price sort is also a step-behind in rendering, showing the next set of results in the requested up or down order. I ran out of time to fix these issues and they will be next on my to-do list for this project, which I will continue to work on to improve my burgeoning skills in React. I think this was appropriately challenging and, if I were to start over knowning what I learned on this project, I could likely get this far in a third of the time. One thing for future use of this test: the Fake API has several limitations that made designing and testing challenging. Its dataset has irregular titles, a variety of image sizes, and several other quirks. While these are fun challenges to think about -- after all any given site might run into issues with its database -- it might be worth noting ahead of time to users for them to be aware of when examining the API. Thank you again for the oppportunity to complete this challenge. The next stage of the project should be creating a solid mobile-first design base. If I had successfully debugged the issues in the filters, I would have begun this work immediately. Overall, I found this task extremely rewarding and look forward to making improvements on it! 

Project can be found at: https://happy-tereshkova-56d808.netlify.app/


### **Project minimum requirements:**
- [x] Build a React app
- [x] Utilize the [Fake Store API](https://fakestoreapi.com/)
- [x] Display all products
- [x] Allow user to search through products
- [x] Allow users to filter on product results
  - Price*
  - Category*
- [x] Allow user to sort on product price

### **Project reach goals:**
- Detailed product page
- Checkout flow
  - Shopping Cart
  - Checkout page (fake checkout info is ok)
  - Checkout confirmation (including regularly found checkout information)

#### Project notes:
<details>
  <summary>Click to see Project notes during initial coding</summary>

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
  I wrapped up and commited the implementation of price filtering. Filtering within search results and sorting by price are still not working as intended. Partially a design issue, the calling of exectuteSearch by different components is often overriding earlier results rather than accumulating a more intensive list of filters. An attempted rework of SearchHelpers to reduce unwanted re-renders was judged to be too lengthy for on-time product delivery. It's clear that the original logic is insufficient in precision and fails to handle variable-logging in a clear way. This means that, for example, searchResults and searchTerms are never really cleared from the SearchContext. This results in some unusual performance. Additionally, the design of the site, to load all products by default on initial app load or removal of all category checkboxes or on a null search mean that the products compound as more searches are made and the variable handling gets more inconsistent. A challenge to look forward to correcting in the future. 
</details>


### Bugs, Issues, & Refactor Tracking
<summary> Bugs and issues being worked on during refactoring </summary>
<details>
  - Search **bugs** 
    - ~~"clothing" returns 0 items;~~ *Found a misplaced ) causing category and description not to be searched.* 
    -  Using multiple search terms fails if words not found in exactly that order/spacing.
    -  Potentially unwanted substring search results men's clothing retuns women's clothing
  - UseState **issue**
    - ~~~I believe searches are making un-needed calls. These are clearer with console.log in Search lines 43-44 where we can see potentially unwanted data fetching due to the order of useState/useEffect calls. Also visible during searches with products swapping places rapidly before final render?~~ *Refactor fixed this*
  - SearchHelpers **refactor** 
    - *Refactored searchHelpers (and product / productTables components) to use the API returned object rather than using productIDs and calling the API a second time*
    - ~~~Search helper takes the executeSearch and returns productIDs as an array.~~~
    - ~~~If executeSearch returned an array of product objects we could reduce API calls especially cf. useState bugs~~~
  - Categories **bug** 
    - *Refactored category code to explicitly identify the categories and pass their value to the API's built in category route."* 
    - ~~~Clicking "Men's Clothing" also returns "Women's Clothing"~~~
    - ~~~I'm incorrectly implementing useState/useEffect and the select boxes are returning on second click the first click's results. Sorting by price correctly identifies the currently checked boxes.~~~ *Fixed by correctly alinging useState and useContext variables* 
  - Sorting **bugs** **issues**
    - *issue* ~~~Price sorting works, but only on re-renders, which may mean a given search has already been overwritten. The sorting also seems to generate re-renders, which close attention to rapid re-renders can identify by the swapping of the bluish Fjallraven ($109.95) with the cheapest item Opna Women's shit ($7.95).~~~ *Refactor fixed this*   
    - *issue* Searching all products returns results from multiple categories as expected. If a category filter is then chosen, the results returned are all products from the category rather than the subset of items in that category from the search results. *A fix will require tweaks to SearchHelper's logic by checking for empty or in useContext searchTerms and then sustaining them during the filter/sorting.* 
    - *bug* ~~~Filtering to no items (all > electronics(on) > electonics(off)) should return all products again.~~~ *Fixed by changing SearchHelpers logic to only show category filters if categoryArray > 0 rather than if it was null because an empty category array isn't null (though both are falsy)*  
</details>

### What I would implement next
  - Error handling, especially for axios. More than a few times unwanted recursions locked the browser and throttled future API calls for a short while. All API calls should be wrapped with try/catch, but other error handling would have been very helpful, such as type-checking all arrays that were to be mapped or filter to throw an error rather than crash the application. 
  - Active search results. Presently terms are only passed on search form submission, not during search term entry.
  - A revised structure for search to combine it with category and price filtering. These features all work indpendently, but not in conjuction. 
  - Major design overhaul is desirable, *especially for mobile devices*. The current and modest design favors testing ease over enchanced visual appeal. This might be ideal for the next round of bug fixes before adding other components like a detailed product page, a splash/landing page, or more advanced items like cart functionality. 

   
