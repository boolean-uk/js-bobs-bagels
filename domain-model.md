# Bob's Bagels domain model

## User Stories



### Part 1

```
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```

---

### Part 2

```
As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket. 
```

---

### Part 3

```
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public
So that I can buy many of my favorite bagel
I'd like to be able to add the same type of bagel to my basket more than once

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket
```

### Extension 1
```
As a Bob's Bagels manager,
So that I can control using SKU what products are being offered and purchesed
I'd like shopping operations be done using SKU

As a member of the public,
So that I can buy cheper in bulk
I'd like Bob's Bagels to introduce discounts for bagels like 6 for 2.49, 12 for 3.99, Coffee & Bagel for 1.25

As a member of the public,
So I know how much I saved
I'd like to know the total discounted price
```

### Extension 2
```
As a Bob's Bagels manager,
So that I can meet legal requirement to run my business
I'd like to print for my customers receipts with the store's name, order date and time, and price for each item and in total, ending with a thank-you
```

### Extension 3
As a customer,
So that I know how much money I saved by buying items in bulk,
I'd like to see on my savings on receipt, both by each item and in total.
## Domain model




| Class  | Fields    | Functions             | Scenario                                                     | Output                                  |
| ------ | --------- | --------------------- | ------------------------------------------------------------ | --------------------------------------- |
| Basket | items: [] | addItem(item)         | If customer wants to add a specific type of bagel to his basket. |                                         |
|        | capacity  |                       | If it is possible to add an item to the basket.              | true                                    |
|        |           |                       | If it is not possible to add an item to the basket.          | false                                   |
|        |           | removeItem(item)      | If customer wants to remove a bagel from his basket.         |                                         |
|        |           |                       | If it is possible to remove an item from the basket.         | true                                    |
|        |           |                       | If it is not possible to remove an item from the basket.     | false                                   |
|        |           | checkIfBasketIsFull() | Throw exception is basket is full                            | void                                    |
|        |           | isInBasket(item)      | Called when customer tries to remove a bagel from his basket. |                                         |
|        |           |                       | If item is in the basket.                                    | true                                    |
|        |           |                       | If item is not in the basket.                                | false                                   |
|        |           | getTotalPrice()       | If customer wants to know how much he'll pay.                | The price of items in the basket        |
|        |           | checkPrice(item)      | If customer wants to know the cost of a specific item.       | The price of a bagel of the given type. |
|        |           | placeOrder()          | If customer wants to place order and receive printed receipt | String with receipt                     |
