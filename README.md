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

##### 1/19/22
- Initial project sketching
  - Basic component list: product -> products_display | navbar -> routes | search -> views/filters
    - Remove some of the create-react boilerplate, confirm scaffold works.
    - Fetch a single product. 
    - Add some basic styling to get a sense of where things go

#### 1/20/22
- Breaking down components, add more basic components 
  - Starting the logic to pull multiple products
  - Breaking product component into small units so that props can be more added/removed from different views
  - Add simple search 

#### 1/21/22
- Adding filters and sorting for category, price
  - Continue to abstract reuseable component pieces
  - Work on additional styling for product cards
  - Time permitting, create detailed product view modal

### Bug Tracking
  1/21/22 - Search feature bugs: 
    - ~~"clothing" returns 0 items;~~ Using multiple search terms fails if words not found in exactly that order/spacing
    - Found a misplaced ) causing category and description not to be searched. 
