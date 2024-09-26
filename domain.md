Domain Model

object bagel: 
PROPERTIES:
    - sku: string
    - price: number
    - name: string
    - varient: string
    - fillings: array of string values


class Basket -> 
PROPERTIES:
    - basket: an array of bagel js Objects
    - capacity: number
    

METHODS

addToBasket(sku) -> 
    input: add bagel to basket 
    output: error message "basket is full, would you like to increase your baskets size?"

removeFromBasket(sku) ->
    input: removes item from basket
    output: error message "item does not exist in your basket

increaseCapacity() ->
    output: increase basket siz by 3

viewPrice(sku) -> 
    input: view price of a bagel
    output: price

totalCost() -> 
    input: view total cost
    output: number

specialOffers() -> 
    -input: checks skus and 
    -output: modified total


