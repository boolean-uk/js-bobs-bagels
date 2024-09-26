1. Add Item:

Method: addItem(item)
Inputs: item (Object with properties like sku, price, name, variant, fillings)
Scenario:
If the basket is not full, add the item to the basket.
If the basket is full, log a message: "Cannot add item, basket is full." 2) Remove Item:

Method: removeItem(itemToRemove)
Inputs: itemToRemove (Object with properties like sku, price, name, variant, fillings)
Scenario:
If the item exists in the basket, remove it.
If the item does not exist in the basket, return "Item not found."
