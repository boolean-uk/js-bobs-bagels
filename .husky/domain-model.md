# Domain model

## Part 1

### Story 1

As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| addItemToBasket(bagel) | bagel(@string) inventory(@object[]) | bagelType(sku) inventory ( @object(sku: 'string', price: number, name: 'sting' , variant: 'string')) | user adds a bagel to the basket | adds bagelItem(@object) to the basket and update the basket(@object[])
|||| bagel doesn't exist | gives an error@string

### Story 2

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| removeItemFromBasket(bagel) | bagel(@string) inventory(@object[]) | bagelType(sku) inventory ( @object(sku: 'string', price: number, name: 'sting' , variant: 'string')) | user removes a bagel from the basket | removes the bagelItem(@object) from the basket and updates the basket(@object[])
|||| bagel doesn't exist | gives an error@string

## Part 2

### Story 1

As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| addItemToBasket(bagel) | bagel(@string) inventory(@object) | bagel(sku) inventory ( @object(sku: 'string', price: number, name: 'sting' , variant: 'string')) macCapacity(@number) | basket is full cannot add another bagel | returns error('Basket is Full')
|||| adding bagels to the basket till full | adds basketItem(@object) until it gets full

### Story 2

As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| increaseBasket(capacity) | capacity(@number) | | basket capacity is increased | returns string@'basket capacity is increased by@number'
|||| invalid number input | returns error(@Enter a valid number )

### Story 3

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket.

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| Part 1|Part 1 |Part 1 |Part 1 |Part 1 |
| Part 1|Part 1 |Part 1 |Part 1 |Part 1 |

## part 3

### story 1

As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| checkPrice(bagel) | bagel(@string) inventory(@boject[])| bagelType(sku) inventory ( @object(sku: 'string', price: number, name: 'sting' , variant: 'string')) | user can see the price of the selected bagel | return price detail
|||| user cannot see the price | return error(@bagel doesn't exist in the basket)

### story 2

As a member of the public
So that I can buy many of my favorite bagel
I'd like to be able to add the same type of bagel to my basket more than once

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| addItemToBasket(bagel) | bagel(@string) inventory(@object[]) | bagelType(sku) inventory ( @object(sku: 'string', price: number, name: 'sting' , variant: 'string')) | user adds many  bagels same time | adds bagelItem(@object) to the basket and update the basket(@object[])
|||| bagel doesn't exist | gives an error@string

### story 3

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
| totalSum() | basketList(@object[]) | basketList ( @object(sku: 'string', price: number, name: 'sting' , variant: 'string')) | user can see the total sum of the items in the basket | returns a price@string
|||| bagels doesn't exist | gives an error@string 