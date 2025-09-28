# Redseam Clothing


### Technologies : React, react-router-dom, Typescript




### Project Structure:

App.tsx - Handles routing and passes cart context to necessary components  
/components/auth - Contains authorization components and hooks for validation  
/components/Navbar - Navigation bar   
/components/Shop - Contains Main Shopping page and other routes  

## Inside /Shop

### /api 
Contains all the necessary backend calls needed for shopping

### /CartPanel 
<b>This is imported inside App.tsx and passed down where necessary</b>  
useCartPanel.tsx - a hook that exports a cart panel element along with    
all the functions needed to use it - opening, closing, updating the cart items. Also appears on the checkout page.

### /ProductList
Main shopping page. Contains subdirectories for other smaller  
components on the shopping page - like Parameters (product filters),  
ProductCard, Pages (paginated navigator) etc...  
<b>useGetPage</b> - a hook that retrieves the products on a specific page  
with certain parameters/filters.
### /CheckOut
This contains the checkout page. Also has a hook used for form validation.

### /ProductPage
Product page 


