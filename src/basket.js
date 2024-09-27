const inventory = require('../inventory')

const specialOffers = [
  { quantity: 6, sku: 'BGLO', price: 2.49 },
  { quantity: 12, sku: 'BGLP', price: 3.99 },
  { quantity: 6, sku: 'BGLE', price: 2.49 }
]

class Basket {
  constructor(capacity) {
    this.capacity = capacity
    this.basketList = []
  }

  addBagel(sku) {
    if (this.basketList.length === this.capacity) return 'Your basket is full'

    const bagel = inventory.find((item) => item.sku === sku) || null
    const basketBagel = this.basketList.find((item) => item.sku === sku) || null

    if (bagel) {
      if (basketBagel) {
        basketBagel.quantity++

        return basketBagel
      }
      const newBagel = { ...bagel, quantity: 1 }

      this.basketList.push(newBagel)

      return newBagel
    }

    return 'The bagel is not exist in our inventory'
  }

  removeBagel(sku) {
    const basketBagel = this.basketList.find((item) => item.sku === sku) || null

    if (basketBagel) {
      if (basketBagel.quantity > 1) {
        basketBagel.quantity--

        return true
      }

      this.basketList = this.basketList.filter((item) => item.sku !== sku)

      return true
    }

    return 'You do not have this bagel in your basket.'
  }

  createBasket(cap) {
    if (cap > 25) return 'Your basket is too big the max capacity is 25'
    else if (cap > 0) {
      this.capacity = cap

      return true
    }

    return 'Enter capacity for create new basket (the minimum capacity can be 1)'
  }

  getInventory() {
    const inventoryObj = inventory

    return inventoryObj
  }

  totalSum() {
    let totalSum = 0

    let localBasketList = this.basketList

    const specialBasket = localBasketList.filter(
      (item) => item.sku === 'COF' || item.sku === 'BGLP'
    )

    if (specialBasket.length === 2) {
      const specialQuantity1 = specialBasket[0].quantity
      const specialQuantity2 = specialBasket[1].quantity

      const minusQuality = (num) => {
        specialBasket[0].quantity -= num
        specialBasket[1].quantity -= num
      }

      if (
        specialQuantity1 < specialQuantity2 ||
        specialQuantity1 === specialQuantity2
      ) {
        totalSum += 1.25 * specialQuantity1
        minusQuality(specialQuantity1)
      } else if (specialQuantity2 < specialQuantity1) {
        totalSum += 1.25 * specialQuantity2
        minusQuality(specialQuantity2)
      }

      specialBasket.forEach((item) => {
        if (item.quantity === 0) {
          localBasketList = localBasketList.filter((i) => i.sku !== item.sku)
        } else {
          localBasketList.find((i) => item.sku === i.sku).quantity =
            item.quantity
        }
      })
    }

    totalSum += localBasketList
      .map((item) => {
        let productTotal = 0
        let localQuantity = item.quantity
        const specialProduct =
          specialOffers.find((i) => i.sku === item.sku) || null

        if (specialProduct && item.quantity >= specialProduct.quantity) {
          const countSpecial = Math.floor(
            item.quantity / specialProduct.quantity
          )

          productTotal += specialProduct.price * countSpecial
          localQuantity -= specialProduct.quantity * countSpecial
        }

        productTotal += item.price * localQuantity
        // console.log(item)

        return Number(productTotal)
      })
      .reduce((a, b) => a + b, 0)

    if (totalSum > 0) {
      return Number(totalSum.toFixed(2))
    }

    return 'Your basket is empty'
  }
}

// const basket = new Basket(25)

// basket.addBagel('BGLE')
// basket.addBagel('BGLP')
// basket.addBagel('BGLP')
// basket.addBagel('COF')

// console.log(basket.totalSum())

module.exports = Basket
