1. Find Items:

Method: findItem(sku)
Inputs: sku (String)
Scenario:
If the item with the specified sku exists in the basket, return the item.
If the item with the specified sku does not exist in the basket, return "Item doesn't exist in the basket." 2) Add Item Continued:

Method: addItem(item, quantity)
Inputs: item (Object with properties like sku, price, name, variant, fillings), quantity (Number, default: 1)
Scenario:
If the item exists in the basket, increase the quantity by one.
If the item does not exist in the basket, add the item to the basket with the specified quantity. 3) Total Cost:

Method: getTotalPrice()
Inputs: None
Scenario:
If there are items in the basket, calculate and return the total price of all items.
If there are no items in the basket, return 0.
