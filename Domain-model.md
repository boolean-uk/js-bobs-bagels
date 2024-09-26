# Domain model

## Bob's bagels

| Classes | Attributes           | Methods                     | Scenario                                               | Outputs                    |
|---------|----------------------|-----------------------------|--------------------------------------------------------|----------------------------|
| Basket  | Array[] bagelsBasket | add(SKU)                    | enough space for new bagel & bagel in menu             | true                       |
|         | number capacity      |                             | not enough space for new bagel or bagel not in menu    | false(Print error message) |
|         |                      | remove(SKU)                 | bagel properly removed                                 | true                       |
|         |                      |                             |                                                        | false(Print error message) |
|         |                      | changeCapacity(newCapacity) | changes  capacity of the basket                        | true                       |
|         |                      |                             | new Capacity is smaller than amount of items in basket | false(Print error message) |
|         |                      | add(SKU, amount)            | enough space to add given amount of product            | true                       |
|         |                      |                             | not enough space to add given amount of product        | false(Print error message) |
|         |                      | summarizeBasket()           | gets the total sum of the products in basket           | totalSum                   |
|         |                      | checkPrice(product)         | gets the price of given product                        | price of Product           |
