const data = require('../inventory.json').inventory

class Basket {
  constructor() {
    this.basket = []
  }

  addBagel(SKU) {
    const bagelItem = data.find((item) => item.sku === SKU)
    if (bagelItem && this.basket.length < 4) {
      this.basket.push(bagelItem)
    } else {
    }
    return this.basket
  }

  removeBagel(sku) {
    return (this.basket = this.basket.filter((item) => item.sku !== sku))
  }

  checkPrice(sku) {
    const getPrice = data.find((item) => item.sku === sku)?.price
    if (!getPrice) {
      return 'the bagel does not exist'
    }
    return `price: ${getPrice}`
  }

  addManyBagels(sku, quantity) {
    if (data.find((item) => item.sku === sku)) {
      for (let i = 0; i < quantity; i++) {
        this.addBagel(sku)
      }
      return true
    } else {
      return false
    }
  }

  getTotal() {
    let total = 0
    for (let i = 0; i < this.basket.length; i++) {
      total += Number(this.basket[i].price)
    }
    return `total: ${total}`
  }
}

class BigBasket {
  constructor() {
    this.bigBasket = []
    this.quantity = {}
  }

  addBagel(SKU) {
    const bagelItem = data.find((item) => item.sku === SKU)
    if (bagelItem) {
      this.bigBasket.push(bagelItem)
    }
    return this.bigBasket
  }

  removeBagel(sku) {
    if (this.bigBasket.find((item) => item.sku === sku)) {
      this.bigBasket = this.bigBasket.filter((item) => item.sku !== sku)
      return true
    }
    return false
  }

  checkPrice(sku) {
    const getPrice = data.find((item) => item.sku === sku)?.price
    if (!getPrice) {
      return 'the bagel does not exist'
    }
    return `price: ${getPrice}`
  }

  addManyBagels(sku, quantity) {
    if (data.find((item) => item.sku === sku)) {
      for (let i = 0; i < quantity; i++) {
        this.addBagel(sku)
      }
      return true
    } else {
      return false
    }
  }

  getTotal() {
    let total = 0
    let bgloCount = 0
    let bglpCount = 0
    let bgleCount = 0
    let cofCount = 0

    for (let i = 0; i < this.bigBasket.length; i++) {
      if (this.bigBasket[i].sku === 'BGLO') {
        bgloCount += 1
      }
      if (this.bigBasket[i].sku === 'BGLP') {
        bglpCount += 1
      }
      if (this.bigBasket[i].sku === 'BGLE') {
        bgleCount += 1
      }
      if (this.bigBasket[i].sku === 'COF') {
        cofCount += 1
      }
      total += Number(this.bigBasket[i].price)
      while (bgloCount >= 6) {
        total -= 0.45
        bgloCount -= 6
      }
      while (bglpCount >= 12) {
        total -= 0.69
        bglpCount -= 12
      }
      while (bgleCount >= 6) {
        total -= 0.45
        bgleCount -= 6
      }
      while (bglpCount >= 1 && cofCount >= 1) {
        total -= 0.13
        bglpCount -= 1
        cofCount -= 1
      }
    }
    return `total: ${total.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}`
  }

  getReceipt() {
    let body = ''
    let total = 0

    for (let i = 0; i < this.bigBasket.length; i++) {
      for (let j = 0; j < data.length; j++) {
        let sku = data[j].sku
        if (this.bigBasket[i].sku === `${sku}`) {
          (this.quantity[sku] !== undefined) ?  this.quantity[sku] += 1  :  this.quantity[sku] = 1 
        }
      }
      total += Number(this.bigBasket[i].price)
    }

    for (const key in this.quantity) {
      const sku = this.quantity.key
      const itemQuantity = this.quantity[sku]
      const nameBit = `${data.find((item) => item.sku === key).variant} ${data.find((item) => item.sku === key).name}        `.substring(0,19)      
      body += `${nameBit}${this.quantity[key]}  £${data.find((item) => item.sku === key).price * this.quantity[key]}\n`
    }

      while (this.quantity.bglo >= 6) {
        total -= 0.45
        bgloCount -= 6
      }
      while (this.quantity.bglp >= 12) {
        total -= 0.69
        bglpCount -= 12
      }
      while (this.quantity.bgle >= 6) {
        total -= 0.45
        bgleCount -= 6
      }
      while (this.quantity.bglp >= 1 && cofCount >= 1) {
        total -= 0.13
        bglpCount -= 1
        cofCount -= 1
      }
    const start = `
    ~~~ Bob's Bagels ~~~
    
    ${new Date().toISOString().slice(0,10)} ${new Date().toISOString().slice(11, 19)}
`

    let middle = `
----------------------------

${body}
----------------------------
Total                 £${total.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}
`

    const end = `
        Thank you
      for your order!
`
    return start + middle + end
  }
}


module.exports = { Basket, BigBasket }
