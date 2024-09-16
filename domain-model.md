Domain model

| object | properties                    | method             | input              | Output                                                   |
| ------ | ----------------------------- | ------------------ | ------------------ | -------------------------------------------------------- |
| item   | name (string), price (string) | checkPrice()       | item.name (string) | price of item (string)                                   |
|        |                               |                    |                    |                                                          |
| basket | Item list (array of objects)  | add()              | item.name (string) | Item list with added Item (array of objects)             |
|        |                               | remove()           | item.name (string) | Item list with specified item removed (array of objects) |
|        |                               | basketIsFull()     |                    | message saying basket is full (string)                   |
|        |                               | checkoutTotalPrice |                    | outputs total price (integer)                            |
