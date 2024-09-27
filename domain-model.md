 ## User Story  for Part 1 (A):
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

## NOUNS and VERBS

- NOUNS
    - Member of the public
    - Bagel
    - Item
    - Basket
- VERBS
    - Order (in bagel)
    - Add ( an item)


## Domain Model

| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| addItemToBasket(item)| item(@Item)|@item : sku(@string), price(@string), name(@string), variant(@string)| Add a valid item|true|
|||| Not a valid item| false |



## User Story for Part 1 (B) :

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

## NOUNS and VERBS
- NOUNS
  - Member of the public
  - my order
  - Basket
  - Item
  
- VERBS
  - Change
  - Remove

## Domain Model
| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| removeOrder(item)| item (@item), @[]| @item : sku(@string), price(@string), name(@string), variant(@string)| Remove a valid item | true
|||| Remove an invalid item | false







## User Story for Part 2 (A) :
As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

## NOUNS and VERBS
- NOUNS
  - Member of the public
  - Bagel
  - Basket

- VERBS
  - Overfill
  - Adding
  - know

| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| checkBasketCapacity|item (@item), @[]| @item : sku(@string), price(@string), name(@string), variant(@string)| when basket is not  overfilled | More items can still be added |
|||| when basket is overfilled | Basket is full and cannot take more items| 

## User Story for Part 2 (B) :

As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

## NOUNS and VERBS
- Nouns
  - Manager
  - sales
  - baskets
- Verbs
  - Record
  - Create
  
| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| createLargerCapacity| item (@item), @[]|  @item : sku(@string), price(@string), name(@string), variant(@string)| when basket has reached the maximum level, increase it to have more space| Basket has been increased |


## User Story for Part 2 (C) :

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket. 

## NOUNS and VERBS
- NOUN
  - Member
  - Item
  - Basket
- VERB
- Maintain
- Remove

| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| itemNotExisting()| items@[], item(@string)| @item : sku(@string), price(@string), name(@string), variant(@string)| Unable to reomve item that doesnt exist in the basket| Item doesn't exist|


## User Story for Part 3 (A) :

As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

## NOUNS and VERBS
- NOUN
  - Member
  - Bagels
  - Price
  - Basket
  - Item
- VERB
- See
- Add

| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| displayPrice()| items@[], item(@string)| @item : sku(@string), price(@string), name(@string), variant(@string)| see the price of each item | Number|


## User Story for Part 3 (B) :

As a member of the public
So that I can buy many of my favorite bagel
I'd like to be able to add the same type of bagel to my basket more than once

## NOUNS and VERBS

## NOUNS and VERBS
- NOUN
  - Member
  - Bagels
  - Basket
- VERB
- Buy
- Add

| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| inCreaseFavoriteBagel()| item(@string)| sku(@string), price(@string), name(@string), variant(@string), quantity(@number)| able to increase the quantity of my favorite Bagel| more items added |

## User Story for Part 3 (C) :

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket

## NOUNS and VERBS

## NOUNS and VERBS
- NOUN
  - Member
  - Bagels
  - Basket
- VERB
- Prepare
- Pay
- Chechout

| Methods | Input | Data | Scenerios | Outputs |
| ------- | ----- | ---- | --------- | ------- |
| TotalPrice()|item@[], item(@string)| sku(@string), price(@string), name(@string), variant(@string), quantity(@number)| sum the items' prices together| number |