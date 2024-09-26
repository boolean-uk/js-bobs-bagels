<!-- # header 1
1. **word**
2. _word_
###### header 6
--- -->
<!-- - paragraph 1
- paragraph 2 -->

---

> Bob's Bagels

| Psuedo                         | Objects | Properties        | Messages / Methods | Output                           |
| ------------------------------ | ------- | ----------------- | ------------------ | -------------------------------- |
| bagelMenu                      | @array  | {id, price, name} |                    | {id:0, price: 2.39, name: 'Yip'} |
| Create new bagel, update menu  | @array  | {id, price, name} | createNewBagel()   | {id:0, price: 2.39, name: 'New'} |
| Add item to basket             | @array  | name              | addToBasket()      | [{}, {},{}]                      |
| Remove item from basket        | @array  | name              | RemoveBasket()     | [{}, {}]                         |
| Is my basket full ?            | @array  | #basketCapacity   | isMyBasketFull()   | @string                          |
| When i try to add, is it full  | @array  | #basketCapacity   | addToBasket()      | @string                          |
| Create bigger capacity baskets | @array  | #basketCapacity   | get() set()        | @integer                         |
| Remove non-existent bagel      | @array  | {undefined}       | RemoveBasket()     | [{}, {}]                         |
| Price of each item             | @array  | {name, price}     | pricePerItem()     | @string                          |
| Add same type                  | @array  | {name}            | addToBasket()      | [{} {}]                          |
| Total for basket               | @array  | {price: price}    | totalForBasket()   | @string                          |

---

---

> Bob's Bagels

### Extension one

| Psuedo                        | Objects | Properties             | Messages / Methods              | Output                                           |
| ----------------------------- | ------- | ---------------------- | ------------------------------- | ------------------------------------------------ |
| create SKU code               | @string | @string                | createSkuCode()                 | @string                                          |
| Create new bagel, update menu | @array  | {SKU, id, price, name} | createItemUpdateMenu()          | {SKU: @str, id: @Int, price: @float, name: @str} |
| createCost class              | @class  | @methods, @attributes  | totalCost() totalDiscountCost() | @Integer                                         |

> Bob's Bagels extension-one re-think

| Psuedo            | Objects | Properties                    | Messages / Methods | Output              |
| ----------------- | ------- | ----------------------------- | ------------------ | ------------------- |
| bagel             | @object | [{SKU, price, name}]          |                    |                     |
| bagel basket      | @array  | [{SKU, id, price, name}]      | add().....         |                     |
| tally item by SKU | @array  | [{SKU: 'BGLO'}, .....]        | itemTally()        | [{'BGLO':4}, .....] |
| cost above tally  | @array  | [{'BGLO':4, price: 5}, .....] | basketCost()       | @Number             |
| receipt           | @array  | [{'BGLO':4, price: 5}, .....] | receipt()          | @string             |

1. Input is my basket, which is an array of objects
2. Count how many of each item in the basket. Iterate over array, keep count against SKU code. Return object.
