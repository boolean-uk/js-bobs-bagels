# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

| Methods                            | Inputs                           | Data                                                             | Scenario                                                                                                   | Outputs                                                              |
|------------------------------------|----------------------------------|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| basket.createBagel(bagel(@string)) | bagel@string - Name of the bagel | [@object: name@string, price@string, variant@string, sku@string] | A bagel that is ordered is chosen                                                                          | @object: information                                                 |
|                                    |                                  |                                                                  | The bagel does not exist on the menu                                                                       | @String - The bagel does not exist on the menu                       |
|                                    |                                  |                                                                  |                                                                                                            |                                                                      |
| basket.deleteBagel(bagel(@string)) | bagel@string - Name of the bagel | [@object: name@string, price@string, variant@string, sku@string] | The bagel that want to be deleted is passed through the method and the object gets deleted from the array. | @string - Bagel deleted                                              |
|                                    |                                  |                                                                  |                                                                                                            |                                                                      |
| basket.getBasket()                 | empty                            | [@object: name@string, price@string, variant@string, sku@string] | The basket is returned                                                                                     | [@object: name@string, price@string, variant@string, sku@string]     |

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

| Methods                     | Inputs                           | Data                                              | Scenario                                                     | Outputs                                    |
|-----------------------------|----------------------------------|---------------------------------------------------|--------------------------------------------------------------|--------------------------------------------|
| basket.creatBagel(@string)  | @string - Name of the bagel      | [@object: name@string, price@string, id: @number] | if 6 bagels already in basket user won't be able to add more | @string - You have reached your limit      |
| basket(basketSize@number)   | @number size of basket           | [@object: name@string, price@string, id: @number] | Manager can define basketSize to be 10                       | @number - basketSize                       |
|                             |                                  |                                                   | BasketSize default is 6                                      | @number - basketSize                       |
| basket.deleteBagel(@string) | bagel@string - Name of the bagel | [@object: name@string, price@string, id: @number] | If bagel does not exist in the basket                        | @string - Item doesn't exist in the basket |                                                        

# Part 3
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public
So that I can buy many of my favorite bagels
I'd like to be able to add the same type of bagel to my basket more than once

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket.

| Methods                             | Inputs                          | Data                                                | Scenario                                                                | Outputs                             |
|-------------------------------------|---------------------------------|-----------------------------------------------------|-------------------------------------------------------------------------|-------------------------------------|
| basket.bagelPrice(bagelName@string) | @string - The name of the bagel | [@objects: name:@string, price:@number, id:@number] | Look for the bagel price                                                | @number - the price                 |
|                                     |                                 |                                                     | if the bagel is not on the menu                                         | @string - The bagel does not exist  |
| basket.totalPrice()                 | empty                           | [@objects: name:@string, price:@number, id:@number] | Loop through the this.bagelBasket array and add the price of each bagel | @number - The total price (The sum) |