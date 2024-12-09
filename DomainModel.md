# Part 1

As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

example of {item} - {
"sku": "BGLO",
"price": "0.49",
"name": "Bagel",
"variant": "Onion"
}

CLASS Basket
PROPERTIES

- basket: []

METHODS

- addItem({item})

  - INPUT: item you want to add to this.basket

- removeItem(sku)
  - INPUT: item you want to remove from this.basket

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

example of {item} - {
"sku": "BGLO",
"price": "0.49",
"name": "Bagel",
"variant": "Onion"
}

CLASS Basket(size = 12)
PROPERTIES

- basket: []
- size: integer

METHODS

- addItem(sku)

  - INPUT: item you want to add to this.basket
  - OUTPUT: if basket is full return message

- removeItem(sku)
  - INPUT: item you want to remove from this.basket
  - OUTPUT: if item does not exist in basket return message

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

example of {item} - {
"sku": "BGLO",
"price": "0.49",
"name": "Bagel",
"variant": "Onion"
}

CLASS Basket(size = 12)
PROPERTIES

- basket: []
- size: integer

METHODS

- displayPrice(sku)

  - OUTPUT: return the price of the item

- addItem(sku)

  - INPUT: item you want to add to this.basket
  - OUTPUT: if basket is full return message

- addMultipleItems(sku, amount: integer)

  - INPUT: item you want to add and the amount of it
  - OUTPUT: message if amount > room in basket

- removeItem(sku)

  - INPUT: item you want to remove from this.basket
  - OUTPUT: if item does not exist in basket return message

- getTotal(void)
  - OUTPUT: the total price of all items in basket

# Extension 1

As a member of the public
So that I can save money
Be able to make use of Special offers

example of {item} - {
"sku": "BGLO",
"price": "0.49",
"name": "Bagel",
"variant": "Onion"
}

CLASS Basket(size = 12)
PROPERTIES

- basket: []
- size: integer

METHODS

- displayPrice(sku)

  - OUTPUT: return the price of the item

- addItem(sku)

  - INPUT: item you want to add to this.basket
  - OUTPUT: if basket is full return message

- addMultipleItems(sku, amount: integer)

  - INPUT: item you want to add and the amount of it
  - OUTPUT: message if amount > room in basket

- removeItem(sku)

  - INPUT: item you want to remove from this.basket
  - OUTPUT: if item does not exist in basket return message

- getTotal(void)
  - OUTPUT: the total price of all items in basket after appling special discounts
