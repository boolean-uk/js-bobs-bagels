# Domain Model

| Objects | Properties                  | Methods                          | Output          |
| Basket  | basketList @arrayOfBagels   | addToBasket (Bagel)              | basket @array   |
|         | basketCapacities @integer   | removeFromBasket (Bagel)         | basket @array   |
|         |                             | fullBasket (@boolean)            | basket @boolean |
|         |                             | checkItemExists (@string - name) | @boolean        |
|         |                             | checkout                         | @integer        |
| Bagel   | name (@string)
