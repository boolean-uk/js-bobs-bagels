# Domain Model


| Classes | Members         | Methods              | Scenario                          | Outputs |
|---------|-----------------|----------------------|-----------------------------------|---------|
| Bagel   | sku: String     | getName(): String    | Get the name of the bagel         | String  |
|         | price: double   | getVariant(): String | Get the variant of the bagel      | String  |
|         | variant: String | getSku(): String     | Get the SKU of the bagel          | String  |
|         | name: String    | getPrice(): double   | Get the price of the bagel        | Price   |


| Classes | Members              | Methods                           | Scenario                                                  | Outputs                                                                                          |
|---------|----------------------|-----------------------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| Basket  | int capacity         | getCapacity(): int                | get the capacity                                          | Returns the maximum number of items that the basket can hold                                     |
|         | int productsQuantity | getProductsQuantity(): int        | get the products quantity                                 | Returns the number of products currently in the basket                                           |
|         | products: Bagel[]    | addProduct(bagel: Bagel): void    | add the bagel in the basket                               | Adds a bagel item to the basket. Raises an exception if the basket is already full               |
|         |                      | getTotalCost(): double            | Get the total cost of the basket                          | Returns the total cost of the basket                                                             |
|         |                      | removeProduct(bagel: Bagel): void | if product is in basket remove product from basket        | Removes a bagel item from the basket. Raises an exception if the item is not found in the basket |
|         |                      | isFull(): boolean                 | Returns True if the basket is full, False otherwise       | Returns True if the basket is full, False otherwise                                              |
|         |                      | changeCapacity(int newCapacity)   | Changes the capacity of the basket to the specified value | Changed capacity of the basket                                                                   |