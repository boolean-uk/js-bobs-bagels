# Bobs Bagels Domain Model

## Domain Models

```markdown
# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```

CLASS Basket PROPERTIES

- Constructor
    - Basket: []

| Methods | Inputs | Scenario | Outputs |
| --- | --- | --- | --- |
| addItem(sku) | string | Successful | True ⇒ basket |
|  |  | Incorrect Item Entered | False ⇒ error |
|  |  | No Item Entered | False ⇒ error |
| removeItem(sku) | number | Successful | True ⇒ basket |
|  |  | Item is not found | False ⇒ error |
|  |  | No Item Entered | False ⇒ error |
- {item} = {”sku”:”BGLO”, “price”:"0.49”, “name”:"Bagel”, “type”:”Onion”}

```markdown
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
```

CLASS Basket(size = 5) PROPERTIES

- Constructor
    - Basket: []
    - size: number

| Methods | Inputs | Scenario | Outputs |
| --- | --- | --- | --- |
| addItem(sku) | string | Basket is full | False ⇒ error |
| new Basket(size) | number | Successful | True |

```markdown
# Part 3
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public
So that I can buy many of my favorite bagel
I'd like to be able to add the same type of bagel to my basket more than once

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket
```

| Methods | Inputs | Scenario | Outputs |
| --- | --- | --- | --- |
| checkPrice(sku) | string | Successful | True ⇒ item price |
|  |  | Item not found | False ⇒ error |
| addItem(sku) | sku | Item not in basket | True ⇒ quantity = 1 |
|  |  | Item already in basket | True ⇒ quantity += 1 |
| addMultipleItems(sku, quantity) | string, number | Item not in basket | True ⇒ quantity = quantity |
|  |  | Item already in basket | True ⇒ quantity += quantity |
| removeItem(sku) | string | Quantity = 1 | True ⇒ remove item |
|  |  | Quantity > 1 | True ⇒ quantity -= 1 |
| showTotal() |  | Successful | True ⇒ shows total price |

```markdown
## Extension 1

In a normal supermarket, things are identified using Stock Keeping Units, or SKUs.

In Bob's Bagels, we'll use the first 3 letters of the product with an extra letter 
for the variant. For example: an 'everything bagel' has a SKU of `BGLE`.

Our goods are priced individually. In addition, some items are multi-priced: 
buy n of them, and they'll cost you y pounds.

#### Bob's Bagels Inventory
|  SKU   |  Name  |  Variant   | Price | Special offers
|--------|--------|------------|-------|----
|  BGLO  | Bagel  | Onion      |  .49  | 6 for 2.49     
|  BGLP  | Bagel  | Plain      |  .39  | 12 for 3.99
|  BGLE  | Bagel  | Everything |  .49  | 6 for 2.49
|  COF   | Coffee |            |  .99  | Coffee & Plain Bagel for 1.25

#### Example orders
```
2x BGLO  = 0.98
12x BGLP = 3.99
6x BGLE  = 2.49
3x COF   = 2.97
           ----
          10.43
```

```
16x BGLP = 5.55
           ----
           5.55
```
```

| Methods | Inputs | Scenario | Outputs |
| --- | --- | --- | --- |
| showTotal() |  | Offer conditions met | Increases total price and continues |
|  |  | 6 x BGLO | 2.49 |
|  |  | 12 x BGLP | 3.99 |
|  |  | 6 x BGLE | 2.49 |
|  |  | COF & BGLP | 1.25 |

```markdown
## Extension 2

Receipts are important.

## Task

Update and extend your program to handle printing receipts.

Start with extracting useful stories and a functional domain model that represents these requirements.

#### Example Receipt
```
    ~~~ Bob's Bagels ~~~

    2021-03-16 21:38:44

----------------------------

Onion Bagel        2   £0.98
Plain Bagel        12  £3.99
Everything Bagel   6   £2.49
Coffee             3   £2.97

----------------------------
Total                 £10.43

        Thank you
      for your order!
```
```

| Methods | Inputs | Scenario | Outputs |
| --- | --- | --- | --- |
| printReceipt() | basket | basket is empty | error |
|  |  | basket not empty | name, date, items (name, price, quantity), total price |