
| Class    | Members                      | Methods                             | Scenario                                                                              | Outputs        |
|----------|------------------------------|-------------------------------------|---------------------------------------------------------------------------------------|----------------|
| `Basket` | `[{Bagel, quantity}] bagels` | `add(Bagel, quantity)`               | there is still room for another bagel and specific bagel does not exist in the basket | true           |
|          | `basketCapacity`             |                                     | there is still room for another bagel and specific bagel exists in the basket         | true           |
|          | `basketQuantity`             |                                     | there is no room for another bagel                                                    | false, message |
|          |                              |                                     | given quantity is invalid                                                             | false, message |
|          |                              | `remove(Bagel, quantity)`            | specific quantity of bagels of specific name are removed                              | true           |
|          |                              |                                     | given quantity is invalid                                                             | false, message |
|          |                              |                                     | bagel with given name does not exists                                                 | false, message |
|          |                              | `isFull(quantity)`                  | checks if basket is full                                                              | boolean        |
|          |                              | `total()`                           | calculates total price of the basket                                                  | Number         |

| Class    | Members  | Methods       | Scenario                                | Output |
|----------|----------|---------------|-----------------------------------------|--------|
| `Bagel`  | `name`   | `getPrice()`  | user wants to know the price of an item | Number |
|          | `price`  |               |                                         |        |
