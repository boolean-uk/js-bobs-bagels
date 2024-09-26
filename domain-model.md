## Core

```
# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```

| Object | Fields  | Function                 | Scenario                       | Output |
|--------|---------|--------------------------|--------------------------------|--------|
| Basket | items[] | addItem(basket, item)    | Add item to basket object      |        |
|        | items[] | removeItem(basket, item) | Remove item from basket object |        |

```
# Part 2
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

| Object | Fields               | Function                      | Scenario                       | Output         |
|--------|----------------------|-------------------------------|--------------------------------|----------------|
| Basket | items[]<br/>capacity | isFull(basket)                | If basket is full              | true           |
|        |                      |                               | If basket is not full          | false          |
|        | items[]              | addItem(basket, item)         | Add item to basket object      |                |
|        |                      |                               | If basket is full              | throw an error |
|        | items[]              | containsItem(basket, item)    | If item is in the basket       | true           |
|        |                      |                               | If item is not in the basket   | false          |
|        | items[]              | removeItem(basket, item)      | Remove item from basket object |                |
|        |                      |                               | If item is not in the basket   | throw an error |
|        | capacity             | setCapacity(basket, capacity) | Change basket capacity         |                |

```
# Part 3
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

| Object | Fields               | Function                        | Scenario                                     | Output         |
|--------|----------------------|---------------------------------|----------------------------------------------|----------------|
| Item   | price                |                                 | Get price of item                            | number         |
| Basket | items[]<br/>capacity | addItem(basket, item, quantity) | Add items to basket object                   |                |
|        |                      |                                 | If basket is full                            | throw an error |
|        |                      |                                 | If there is no space left for items          | throw an error |
|        | items[]              | totalPrice(basket)              | Calculate total price of items in the basket | number         |

# Extension 1

```
As a member of the public,
So that I can buy many of my favorite bagel in cheaper price
I'd like to be able to get discounts

As a member of the public,
So that I can buy bagel and coffe in a set
I'd like to be able to get discount for buying coffe and plain bagel
```
