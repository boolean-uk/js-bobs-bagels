1. Check If Full:

Method: isBasketFull()
Inputs: None
Scenario:
If the basket is full, return true.
If the basket is not full, return false. 2) Change Basket Size:

Method: changeBasketSize(newSize)
Inputs: newSize (Number)
Scenario:
If newSize is a valid number, update the basket capacity to the new size.
If newSize is not a valid number, log a message: "Error, set basket size." 3) Remove Item Continued:

Method: removeItem(itemToRemove)
Inputs: itemToRemove (Object with properties like sku, price, name, variant, fillings)
Scenario:
If the item does not exist in the basket, return false and "Item does not exist in the basket."
If the item exists in the basket, return true and the sku of the removed item.
