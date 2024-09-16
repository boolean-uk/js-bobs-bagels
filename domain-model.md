# Domain Model

js object Bagel
PROPERTIES

- sku: string
- price: number
- name: string
- variant: string

class Basket
PROPERTIES

- basket: Array[Bagel js objects]
- capacity: Number

METHODS  
addToBasket(bagelItem: Bagel js object) -> Adds an item to the basket. If the the basket capacity has been reached, then the item won't be added.  
INPUT: Bagel JS Object  
OUTPUTS:

- True -> Item added successfully
- False -> Item not added
- "full" -> If the basket capacity has been reached

removeFromBasket(sku: string) -> Removes an item from the basket. If the item to be removed doesn't exist in the basket then the user must know.
INPUTS:

- sku string for a bagel object
- capacity number

OUTPUTS:
True -> Item removed successfully
False -> Item doesn't exist in basket

increaseCapacity(newCapacity: number) -> Increases the capacity by given number
INPUT: capacity: number
OUTPUT: capacity
