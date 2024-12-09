# Bob's Bagel

## User Stories

```
# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```
---
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
---
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
---
```
# Extension 2
1. As a customer,
I want to be able to generate a receipt for my order with store's nome.
2. As a customer, 
I want the receipt to display the date and time of the order.
3. As a customer, 
I want the receipt to list the ordered items, including their names, quantities, and prices.
4. As a customer, 
I want the receipt to display the total price of the order.
5. As a manager, 
I want the receipt to include a "thank you for your order" message.
```

## Domain model
File: basket.js \
Class: basket \
Methods: \
addItem(name) <- If customer wants to add an item to his basket. It returns the list of items in the basket. \
removeItem(name) <- If customer wants to remove an item from his basket. It returns the list of items in the basket. \
checkPrice(name) <- If customer wants to check the price before adding to the basket. Returns the price of the item. \
calculateTotalPrice() <- If customer wants to check the price of all items in the basket. It return the total price of items (in customer's basket). \
generateReceipt() <- If cusotmer wants to receive a receipt with ordered items. It returns the receipt, customer friendly formatted. 