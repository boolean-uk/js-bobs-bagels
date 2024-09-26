# Domain Model

 Basket
- Properties:
 - `items`: An array to store items added to the basket.
 - `inventory`: An array of available items with their details.

- Methods:
 - `addItem(sku: string)`: Adds an item to the basket based on the SKU.
 - `removeItem(sku: string)`: Removes an item from the basket based on the SKU.

 Item
- Properties:
 - `sku`: Stock Keeping Unit, a unique identifier for the item.
 - `price`: The price of the item.
 - `name`: The name of the item (e.g., "Bagel").
 - `variant`: The variant of the item (e.g., "Onion"). Defaults to an empty string.
 - `quantity`: The quantity of the item in the basket. Defaults to 1.
 - `fillings`: An array of fillings for the item (e.g., for a Bagel Sandwich).

- Constructor:
 - `Item(itemData: object)`: Initializes an item with the provided data.

 Inventory Data
- Properties:
 - `inventory`: An array of objects representing available items.
  - Each object includes properties like `sku`, `price`, `name`, `variant`, and optional `fillings`.

# Interactions
- The `Basket` interacts with the `Item` class when adding items, creating instances of `Item`.
- The `Basket` also interacts with the `inventory` data when looking up item details.
- Items in the `Basket` can be added, and their quantities can be updated.
- Items can be removed from the `Basket`, updating their quantities or entirely removing them.

# usage
```javascript
const myBasket = new Basket();
myBasket.addItem('BGLO');
myBasket.addItem('BGLO');
myBasket.removeItem('BGLO');

Part two 

 Domain Model for Part 2

 # User Stories:

1. As a member of the public: 
 - So that I can avoid overfilling my small bagel basket, 
 - I'd like to know when my basket is full when I try adding an item beyond my basket capacity. 

2. As a Bob's Bagels manager: 
 - So that I can record more sales, 
 - I’d like to create baskets with larger capacity when I need to. 

3. As a member of the public: 
 - So that I can maintain my sanity, 
 - I'd like to know if I try to remove an item that doesn't exist in my basket. 

 # Entities:

1. Public Member: 
 - Attributes:
  - Name 
  - Bagel Basket 
 - Actions:
  - Add Item to Basket 
  - Attempt to Add Item Beyond Capacity 
  - Remove Item from Basket 
  - Attempt to Remove Non-Existent Item 
  - Check Basket Capacity Status 

2. Bob's Bagels Manager: 
 - Attributes:
  - Manager Name 
  - Bagel Baskets Inventory 
 - Actions:
  - Create New Basket 
  - Adjust Basket Capacity 
  - Record Sales 

3. Bagel Basket: 
 - Attributes:
  - Capacity 
  - Items List 
 - Actions:
  - Add Item 
  - Remove Item 
  - Check Capacity Status 

 # Interactions:

1. Member of the Public Interactions: 
 - A member adds an item to their bagel basket. 
 - The system checks if the basket is full. 
 - If the basket is full, the system notifies the member. 
 - The member tries to remove an item from the basket. 
 - The system checks if the item exists in the basket. 
 - If the item doesn't exist, the system notifies the member. 

2. Bob's Bagels Manager Interactions: 
 - The manager creates a new bagel basket with a specific capacity.
 - The manager adjusts the capacity of an existing basket.
 - The manager records sales using the basket.


## Domain Model for Part 3

 # User Stories:

1. As a member of the public: 
 - So that I can know how much my bagels are, 
 - I’d like to see the price of each item before I add it to my basket. 

2. As a member of the public: 
 - So that I can buy many of my favorite bagels, 
 - I'd like to be able to add the same type of bagel to my basket more than once. 

3. As a member of the public: 
 - So that I can prepare to pay, 
 - When I go to checkout, I'd like to know the total sum of the bagels in my basket. 

 # Entities:

1. Public Member: 
 - Attributes:
  - Name 
  - Bagel Basket 
 - Actions:
  - Add Item to Basket (with Price Display) 
  - Add Same Type of Item to Basket Multiple Times 
  - Remove Item from Basket 
  - Calculate Total Sum 
  - Check Price of Item 

2. Bagel Basket: 
 - Attributes:
  - Capacity 
  - Items List (with Quantity) 
 - Actions:
  - Add Item 
  - Remove Item 
  - Calculate Total Sum 

3. Bagel Item: 
 - Attributes:
  - SKU 
  - Price 
  - Name 
  -  Variant 
   -  Fillings 
  - Actions:
   -  Display Price 

 # Interactions:

1.  Member of the Public Interactions: 
  -  A member checks the price of a bagel item before adding it to the basket. 
  -  The member adds an item to their bagel basket, and the system displays the price. 
  -  The member adds the same type of item multiple times to the basket. 
  -  The member removes an item from the basket. 
  -  The member calculates the total sum of bagels in the basket. 

2. Bagel Basket Interactions: 
 - The basket keeps track of the quantity of each item. 
 - The basket calculates the total sum of bagels based on the items and their quantities. 

3. Bagel Item Interaction: 
 - The item displays its price when requested by the member. 
