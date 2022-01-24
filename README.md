# P & G Coding Challenge

## *A project by Dave McConeghy*
Contact: david.mcconeghy@gmail.com

***

### **Project minimum requirements:**
- Build a React app
- Utilize the [Fake Store API](https://fakestoreapi.com/)
- Display all products
- Allow user to search through products
- Allow users to filter on product results
  - Price
  - Category
- Allow user to sort on product price

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

#### 1/23/22 - 1/24/22
  I successfully implemented useContext, which meant rapid progress on the filters and sorting requirements. It wasn't enough to learn about useContext itself, though. I gained a much deeper understanding of useState and how to set variables through UI components (e.g, filter buttons and search fields). UseMemo was also key to reducing state changes for the global search context variable passing. 

### Bug & Refactor Tracking

  - Search **bug** 
    - ~~"clothing" returns 0 items;~~ *Found a misplaced ) causing category and description not to be searched.* 
    -  Using multiple search terms fails if words not found in exactly that order/spacing.
  - UseState **bugs**
    - Searches are making un-needed calls // these are clearer with console.log in Search/SearchForm/Filter
  - SearchHelpers **refactor**
    - Search helper takes the executeSearch and returns productIDs as an array.
    - If executeSearch returned an array of product objects we could reduce API calls especially cf. useState bugs
  - Categories **bug*
    - Clicking "Men's Clothing" also returns "Women's Clothing"
   
