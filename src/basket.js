const SpecialOffer = require('./SpecialOffer')
class Basket {
  constructor(capacity = 10) {
    this.capacity = capacity
    this.items = []
    this.specialOffers = []
  }

  // Function to add an item to the basket
  addItem(itemSku) {
    if (this.items.length >= this.capacity) {
      console.log('Basket is full. Cannot add more items')
      return false
    }

    const item = this.findItemBySku(itemSku)
    if (item) {
      const existingItem = this.items.find((item) => item.sku === itemSku)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
      console.log(
        `Add Item: ${item.name}, Variant: ${item.variant}, Price: $${item.price}`
      )
      return true // Item added successfully
    }
    console.log('Item not found.')
    return false // Item not found
  }

  // Function to remove an item from the basket
  removeItem(itemSku) {
    const index = this.items.findIndex((item) => item.sku === itemSku)
    if (index !== -1) {
      this.items.splice(index, 1)
      console.log('Item removed successfully')
      return true
    }
    console.log('Item not found in the basket')
    return false
  }

  // Function to find an item by SKU
  findItemBySku(itemSku) {
    return inventory.find((item) => item.sku === itemSku)
  }

  updateCapacity(newCapacity) {
    if (newCapacity < this.items.length) {
      console.log(
        'New capacity should be greater than or equal to the number of items in the basket'
      )
      return false
    }

    this.capacity = newCapacity
    console.log('Basket capacity updated successfully')
    return true
  }

  // Function to add a special offer
  addSpecialOffer(sku, quantity, price) {
    const specialOffer = new SpecialOffer(sku, quantity, price)
    this.specialOffers.push(specialOffer)
    console.log(
      `Special offer added: ${quantity}x ${sku} for $${price.toFixed(2)}`
    )
  }

  // Function to calculate total price with special offers
  calculateTotalPrice() {
    let totalPrice = 0
    const orderDetails = []

    for (const item of this.items) {
      const specialOffer = this.findSpecialOffer(item.sku)

      if (specialOffer && item.quantity >= specialOffer.quantity) {
        const offerPrice =
          Math.floor(item.quantity / specialOffer.quantity) * specialOffer.price
        const remainingItems = item.quantity % specialOffer.quantity
        const remainingPrice = remainingItems * item.price
        totalPrice += offerPrice + remainingPrice
        orderDetails.push(
          `${item.quantity}x ${item.name} ${item.variant} = $${(
            offerPrice + remainingPrice
          ).toFixed(2)}`
        )
      } else {
        totalPrice += item.price * item.quantity
        orderDetails.push(
          `${item.quantity}x ${item.name} ${item.variant} = $${(
            item.price * item.quantity
          ).toFixed(2)}`
        )
      }
    }

    const orderSummary = `  ${orderDetails.join(
      '\n  '
    )}\n  ----\n  ${totalPrice.toFixed(2)}`
    console.log(orderSummary)
    return totalPrice
  }

  findSpecialOffer(sku) {
    return inventory.find(
      (item) => item.sku === sku && item instanceof SpecialOffer
    )
  }
}

const inventory = [
  {
    sku: 'BGLO',
    price: '0.49',
    name: 'Bagel',
    variant: 'Onion'
  },
  {
    sku: 'BGLP',
    price: '0.39',
    name: 'Bagel',
    variant: 'Plain'
  },
  {
    sku: 'BGLE',
    price: '0.49',
    name: 'Bagel',
    variant: 'Everything'
  },
  {
    sku: 'BGLS',
    price: '0.49',
    name: 'Bagel',
    variant: 'Sesame'
  },
  {
    sku: 'COFB',
    price: '0.99',
    name: 'Coffee',
    variant: ''
  },
  {
    sku: 'COF',
    price: '1.25',
    name: 'Coffee & Bagel',
    variant: ''
  },
  {
    sku: 'BGSE',
    price: '2.99',
    name: 'Bagel Sandwich',
    variant: 'Everything',
    fillings: ['Bacon', 'Egg', 'Cheese']
  },
  {
    sku: 'BGSS',
    price: '4.99',
    name: 'Bagel Sandwich',
    variant: 'Sesame',
    fillings: ['Cream Cheese', 'Smoked Salmon']
  }
]
inventory.push(new SpecialOffer('BGLO', 6, 2.49))
inventory.push(new SpecialOffer('BGLP', 12, 3.99))
inventory.push(new SpecialOffer('BGLE', 6, 2.49))

const basket = new Basket()
basket.addItem('BGLO')
basket.removeItem('BGLO')
basket.addItem('BGLO')
basket.addItem('BGLO')
const numberOfItemsToAdd = 12
const itemSku = 'BGLP'

for (let i = 0; i < numberOfItemsToAdd; i++) {
  basket.addItem(itemSku)
}
console.log('Basket capacity:', basket.capacity)
basket.updateCapacity(15)
console.log('Basket capacity:', basket.capacity)
const numberOfItemsToAddBGLE = 6
const itemSkuBGLE = 'BGLE'

for (let i = 0; i < numberOfItemsToAddBGLE; i++) {
  basket.addItem(itemSkuBGLE)
}
basket.addItem('COFB')
basket.addItem('COFB')
basket.addItem('COFB')

basket.removeItem('NONEXISTING')
const totalPrice = basket.calculateTotalPrice()
console.log(`Total price of bagels in the basket: $${totalPrice}`)
module.exports = {
  Basket
}
