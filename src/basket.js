const bagelMenu = [
  {
    name: 'Everything Bagel',
    price: 4.99,
    id: 1
  },
  {
    name: 'Plain Bagel',
    price: 0.49,
    id: 2
  },
  {
    name: 'Bagel Sandwich',
    price: 2.99,
    id: 3
  },
  {
    name: 'Bagel Bagel',
    price: 20.99,
    id: 4
  },
  {
    name: 'Sesame Bagel',
    price: 2.99,
    id: 5
  },
  {
    name: 'Poppy Bagel',
    price: 1.99,
    id: 6
  },
  {
    name: 'Garlic Bagel',
    price: 2.99,
    id: 7
  },
  {
    name: 'Blueberry Bagel',
    price: 5.99,
    id: 8
  },
  {
    name: 'Pumpkin Bagel',
    price: 5.99,
    id: 9
  }
]
class Basket {
  constructor(basketSize) {
    this.bagelBasket = []
    this.basketSize = basketSize || 6
  }

  createBagel(bagel) {
    // The bagel name must be on the menu
    if (
      bagel === 'Everything Bagel' ||
      bagel === 'Plain Bagel' ||
      bagel === 'Bagel Sandwich' ||
      bagel === 'Bagel Bagel' ||
      bagel === 'Sesame Bagel' ||
      bagel === 'Poppy Bagel' ||
      bagel === 'Garlic Bagel' ||
      bagel === 'Blueberry Bagel' ||
      bagel === 'Pumpkin Bagel'
    ) {
      const obj = {
        id:
          this.bagelBasket.length === 0
            ? 1
            : this.bagelBasket[this.bagelBasket.length - 1].id + 1,
        price: this.bagelPrice(bagel),
        name: bagel
      }

      if (this.bagelBasket.length < this.basketSize) {
        this.bagelBasket.push(obj)
        return obj
      } else {
        return 'You have reached your limit'
      }
    } else {
      return 'The bagel does not exist on the menu'
    }
  }

  getBasket() {
    return this.bagelBasket
  }

  deleteBagel(bagel) {
    let message
    this.bagelBasket.find((obj, index) => {
      if (obj.name === bagel) {
        this.bagelBasket.splice(index, 1)
        message = 'Bagel deleted'
        return true
      } else {
        message = 'Item doesn`t exist in the basket'
        return false
      }
    })
    return message
  }

  bagelPrice(bagelName) {
    let price
    bagelMenu.find((obj) => {
      if (obj.name === bagelName) {
        price = obj.price
        return true
      } else {
        price = 'The bagel does not exist on the menu.'
        return false
      }
    })
    return price
  }

  totalPrice() {
    let sum = 0

    this.bagelBasket.forEach((obj) => {
      sum += obj.price
    })

    return sum
  }
}
const newBasket = new Basket()
newBasket.createBagel('Bagel1')
newBasket.createBagel('Bagel2')
newBasket.createBagel('Bagel3')
newBasket.createBagel('Bagel4')
newBasket.createBagel('Bagel5')
newBasket.createBagel('Bagel6')
newBasket.createBagel('Bagel7')

module.exports = Basket
