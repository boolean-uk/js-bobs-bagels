# Adding an item to the basket
Nouns
-Member of the public
-Bagel
-Item
-Basket
Verbs
-Order a bagel
-Add an item
| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| additemtoBasket(item ) |  item(@item) | @item:sku@string ,price@string,name@string, variant@string| Add a valid item | returns true
|||| Add an invalid item | returns false
# remove an item  from the basket
Nouns
-Member of the public
-Item
-Basket
Verbs
-Change an Order
-Remove an item
| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| removeitemfromBasket(item ) |  item(@item) | @item:sku@string ,price@string,name@string, variant@string| remove a valid item | returns true
|||| remove an invalid item | returns false
# not overfill my basket
Noun
-member of the public
-Item
-Basket
Verbs
-overfill my small bagel basket
-Add an item
| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| notOverfillbasket(item ) |  item(@item) | @item:sku@string ,price@string,name@string, variant@string| overfill basket | returns expected
|||| overfillbasket | returns false
# create baskets with larger capacity
Noun
-Manager
-Bobs Bagels
-sales
-Basket
Verbs
-record
-create
| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| basketwithlargercapacity(item ) |  item(@item) | @item:sku@string ,price@string,name@string, variant@string| largerCapacity | returns true
|||| lessCapacity | returns false
# remove an item that doesn't exist in my basket. 
Noun
-member of the public
-sanity
-item
-basket
Verbs
-maintain my sanity
-remove an item that doesn't exist in my basket
| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| itemnotexisting(item ) |  item(@item) | @item:sku@string ,price@string,name@string, variant@string| notExisting | returns true
|||| existingItem | returns false
# see the price of each item before I add it to my basket
Noun
-member of the public
-bagels
-price
-item
-basket
Verbs
-know how much 
-see the price
| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| price(item ) |  item(@item) | @item:sku@string ,price@string,name@string, variant@string| price | returns number
|||| invalid price | returns false
