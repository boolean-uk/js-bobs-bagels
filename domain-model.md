| Class  | Methods                    | Scenario              | Outcome                                   |
| ------ | -------------------------- | --------------------- | ----------------------------------------- |
| Basket | addItem(sku)               | !basket is full       | bagel is added to basket                  |
|        |                            | basket is full        | bagel is not added                        |
|        | removeItem(sku)            | item is in basket     | removes item from basket                  |
|        |                            | item is not in basket | returns false                             |
|        | getTotalCostWithDiscount() |                       | returns total cost with discounts applied |
|        | getTotalCost()             |                       | returns total cost without discounts      |
|        | currentItemsCount()        |                       | returns current items count               |
|        | isBasketFull()             |                       | returns info if basket is full            |
|        | changeCapacity(int)        | newCapacity > old     | changes basket capacity                   |
|        |                            | newCapacity < old     | does not change basket capacity           |
|        | getItemPrice(sku)          |                       | returns item price                        |
