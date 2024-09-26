#### Domain model

Class: Basket
Methods:
    1. addItem(itemSku) - Adds an item with the specified SKU to the basket. If the item already exists in the basket, it increments its quantity by 1.
    2. removeItem(itemSku) - Removes the item with the specified SKU from the basket.
    3. findItemBySku(itemSku) - Searches for an item with the given SKU in the inventory and returns it.
    4. updateCapacity(newCapacity) - Updates the basket's capacity based on the provided new capacity. The new capacity should be greater than or equal to the number of items currently in the basket.
    5. addSpecialOffer(sku, quantity, price) - Adds a special offer to the basket with the given SKU, quantity, and price.
    6. calculateTotalPrice() - Calculates the total price of all items in the basket, taking into account any special offers that apply to the items.
