## Extension Part 1

In a normal supermarket, things are identified using Stock Keeping Units, or SKUs.

In Bob's Bagels, we'll use the first 3 letters of the product with an extra letter for the variant. For example: an 'everything bagel' has a SKU of `BGLE`.

Our goods are ited individually. In addition, some items are multi-priced: buy n of them, and they'll cost you y pounds.

## Bob's Bagels Inventory
|  SKU   |  Name  |  Variant   | Price | Special offers
|--------|--------|------------|-------|----
|  BGLO  | Bagel  | Onion      |  .49  | 6 for 2.49
|  BGLP  | Bagel  | Plain      |  .39  | 12 for 3.99
|  BGLE  | Bagel  | Everything |  .49  | 6 for 2.49
|  COF   | Coffee |            |  .99  | Coffee & Plain Bagel for 1.25


## Noun & Verb
Noun: SKUs (first 3 letters of the product with an extra letter for the variant), name, variant, price, multi-price(special offers)
Verb: buy

## Domain Model
| Objects    | Properties                         |
| ---------- | ---------------------------------- |
| list       | item {name @String, price @Number} |

| Methods                               | Output                                |
| ------------------------------------- | ------------------------------------- |
| skuQuantity(basket)                   | skuQuantity @Obj {SKU @String: quantity @Number}|
| subPrice(@skuQuantity())              | subPrice @Obj {SKU @String, subPrice @Number}               |
| totalPrice(@subPrice())               | totalPrice @Number                    | 
| receiptLine(@skuQuantity(), @subPrice())  | one line of receipt @String ${sku} x ${quantity} = ${@subPrice()}
| printReceipt(@receiptLine(), @totalPrice()) | @receiptLine() --- @totalPrice() |

---

## Extension Part 2
Update and extend your program to handle printing receipts.

## Domain Model
| Methods                                                        | Output                                |
| -------------------------------------------------------------- | ------------------------------------- |
| convertSKU()                                                   | skuQuantity @Obj {itemName @String: quantity @Number} |
| today()                                                        | @Number yyyy-mm-dd h:m:s              |
| printItemReceipt(@receiptLine(), @totalPrice())                | @receipt                              |

---

## Extension Part 3
Update and extend your program to handle showing savings to the customer.

## Domain Model
| Methods                                                        | Output                                |
| -------------------------------------------------------------- | ------------------------------------- |
| noDiscountPrice(@skuQuantityObj)                               | skuQuantity @Obj {sku @String: quantity @Number} |
| savedPrice(@skuQuantityObj)                                    | skuQuantity @Obj {sku @String: quantity @Number} |
| printItemReceipt(@receiptLine(), @totalPrice(), @discount())   | @receipt                              |