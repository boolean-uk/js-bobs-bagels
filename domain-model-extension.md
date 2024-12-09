## Basket
| Class    | Members                      | Methods                      | Scenario                                                                              | Outputs        |
|----------|------------------------------|------------------------------|---------------------------------------------------------------------------------------|----------------|
| `Basket` | `[{Bagel, quantity}] bagels` | `add(Bagel, quantity)`       | there is still room for another bagel and specific bagel does not exist in the basket | true           |
|          | `basketCapacity`             |                              | there is still room for another bagel and specific bagel exists in the basket         | true           |
|          | `basketQuantity`             |                              | there is no room for another bagel                                                    | false, message |
|          |                              |                              | given quantity is invalid                                                             | false, message |
|          |                              | `remove(Bagel, quantity)`    | specific quantity of bagels of specific name are removed                              | true           |
|          |                              |                              | given quantity is invalid                                                             | false, message |
|          |                              |                              | bagel with given name does not exists                                                 | false, message |
|          |                              | `isFull(quantity)`           | checks if basket is full                                                              | boolean        |
|          |                              | `total()`                    | calculates total price of the basket with discounts                                   | Number         |
|          |                              | `mapShoppingListToReceipt()` | calculates prices with discounts and updates the values in basket                     |                |


## Product
| Class     | Attributes | Methods | Scenarios | Output |
|-----------|------------|---------|-----------|--------|
| `Product` | `SKU`      |         |           |        |
|           | `name`     |         |           |        |
|           | `price`    |         |           |        |
|           | `variant`  |         |           |        |

## Inventory
| Class       | Attributes   | Methods           | Scenarios                                                     | Output  |
|-------------|--------------|-------------------|---------------------------------------------------------------|---------|
| `Inventory` | `products[]` | `getProduct(sku)` | filters product inventory by SKU and returns searched product | Product |

## Discount
| Class      | Attributes  | Methods | Scenarios | Output |
|------------|-------------|---------|-----------|--------|
| `Discount` | `SKU`       |         |           |        |
|            | `price`     |         |           |        |
|            | `quantity`  |         |           |        |

## DiscountInventory
| Class               | Attributes     | Methods                    | Scenarios                            | Output   |
|---------------------|----------------|----------------------------|--------------------------------------|----------|
| `DiscountInventory` | `discounts[]`  | `searchDiscount(sku)`      | searches for discounts for given sku | Discount |

## Receipt
| Class      | Attributes   | Methods                    | Scenarios                        | Output     |
|------------|--------------|----------------------------|----------------------------------|------------|
| `Receipt`  | `products[]` | `addProduct(ReceiptLine)`  |                                  | void       |

## ReceiptLine
| Class          | Attributes       | Methods                  | Scenarios                               | Output  |
|----------------|------------------|--------------------------|-----------------------------------------|---------|
| `ReceiptLine`  | `item`           | `isBagelCoffeeSpecial()` | checks if the discount is special combo | boolean |
|                | `quantity`       |                          |                                         |         |
|                | `price`          |                          |                                         |         |
|                | `isSpecialOffer` |                          |                                         |         |
