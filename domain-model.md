```
# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```
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

| File   | Field                   | Method                      | Condition                                                                              | Output                         |
|--------|-------------------------|-----------------------------|----------------------------------------------------------------------------------------|--------------------------------|
| Basket | bagelsInBasket (object) | add(bagelSKU, amount)       | if there are less bagels in total than capacity                                        | true                           |
|        | capacity                |                             | if there are more bagels in total than capacity or the bagelType is N/A or amount <= 0 | false                          |
|        | currentAmount           | remove(bagelSKU, amount)    | if the amount of bagels of bagelType in basket is >= amount                            | true                           |
|        |                         |                             | if the amount of bagels of bagelType in basket is < amount or amount <= 0              | false                          |
|        |                         | changeCapacity(newCapacity) | if newCapacity >= currentAmount                                                        | true                           |
|        |                         |                             | if newCapacity < currentAmount                                                         | false                          |
|        |                         | totalCost()                 | always                                                                                 | total cost of bagels in basket |
|        |                         |                             |                                                                                        |                                |
|        |                         | checkBagelPrice(bagelSKU)   | if the bagel of this sku exists                                                        | bagel cost                     |
|        |                         |                             | if the bagel doesn't exist                                                             | 0                              |
