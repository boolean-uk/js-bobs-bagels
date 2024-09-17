<!-- # Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket -->

<!-- As a member of the public,
So that I can change my order
I'd like to remove an item from my basket -->

class basket:
PROPERTIES  
items[{name:@string, variant: @string, price:@num, sku:@string, fillings:@string}] 

METHODS
constructor (capacity : quantity(number), default= 5)
addBagel(item: Bagel JS object)
  INPUT: bagel item
  OUTPUT: updated items array?


removeBagel(sku: string)
  INPUT: the sku of the bagel we want to remove
  OUTPUT: updated basket array: [{bagel objects}]

