# Domain model

## Bob's Bagels

### User stories

```
# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

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

| Class  | Members                 | Methods                  | Scenario                                                                        | Output |
|--------|-------------------------|--------------------------|---------------------------------------------------------------------------------|--------|
| Basket |                         | add(item)                | It will add an item to the basket, if item does not exists in the basket        | true   |
|        |                         |                          | It will increase quantity of item in the basket, if item exists in basket       | true   |
|        |                         |                          | It will add an item to the basket, if basket has capacity.                      | true   |
|        |                         |                          | It will not add an item to the basket, if basket is full                        | false  |
|        |                         | add(item, quantity)      | It will increase quantity of item in the basket, if item exists in basket       | true   |
|        |                         |                          | It will add an item to the basket, if item does not exists in the basket        |        |
|        | Object{item : quantity} | remove(item)             | It will remove an item from the basket, if basket contains an item.             | true   |
|        | capacity                |                          | It will not remove an item from the basket, if basket does not contain an item. | false  |
|        | productsQuantity        | changeCapacity(capacity) | It will change capacity.                                                        | void   |
|        |                         | totalCost()              | It will return total cost of the basket                                         | Number |
|        |                         | checkPrice(item)         | It will show item price.                                                        | Number |
