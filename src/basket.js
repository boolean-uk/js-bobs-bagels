const { inventory } = require('../inventory.json')
const { specialOffers } = require('../specialOffers')
const { Receipt } = require('./receipt')
require('dotenv').config()

class Basket {
  constructor(basketSize) {
    this.basketSize = basketSize
    this.basket = []
  }

  isBasketFull() {
    if (this.basket.length === this.basketSize) return true
    else return false
  }

  isInInventory(sku) {
    // Returns Item
    const item = inventory.filter((item) => item.sku === sku)[0]
    if (item === undefined) return false
    else return item
  }

  isInBasket(sku) {
    // Returns Index
    const item = this.basket.filter((item) => item.sku === sku)[0]
    if (item === undefined) return false
    else return this.basket.indexOf(item)
  }

  addBagel(sku) {
    // Check if basket is full
    if (this.isBasketFull()) return false

    // Check if in Inventory
    const item = this.isInInventory(sku)
    if (!item) return false

    // Check if in Basket
    const indexInBasket = this.isInBasket(sku)
    if (typeof indexInBasket === 'number') {
      // In Basket - Increase quantity
      const itemInBasket = this.basket[indexInBasket]
      const newQuantity = itemInBasket.quantity + 1
      const itemData = {
        ...itemInBasket,
        quantity: newQuantity,
        stackPrice: newQuantity * itemInBasket.price
      }
      this.basket[indexInBasket] = itemData
      return this.basket
    } else {
      // Not in Basket - New
      const itemData = {
        sku: item.sku,
        price: item.price,
        name: item.name,
        variant: item.variant,
        quantity: 1,
        stackPrice: Number(item.price)
      }
      this.basket.push(itemData)
      return this.basket
    }
  }

  getAllInventory() {
    return inventory
  }

  removeBagel(sku) {
    // Check if in Basket
    const indexInBasket = this.isInBasket(sku)
    if (typeof indexInBasket === 'number') {
      // Is in Basket
      const removedItem = this.basket.splice(indexInBasket, 1)[0]
      return removedItem
    } else return false
  }

  checkForOffers() {
    specialOffers.forEach((offer) => {
      this.basket.forEach((item) => {
        if (item.sku === offer.sku && item.quantity >= offer.amountToBeOffer) {
          const quantityAfterOffer = item.quantity % offer.amountToBeOffer

          let newStackPrice = offer.priceOffer // 6 for 2.49
          newStackPrice += Number((quantityAfterOffer * item.price).toFixed(2)) // 2.49 + (1 * 0.49)
          newStackPrice = Number(newStackPrice.toFixed(2))

          item.stackPrice = newStackPrice
        }
      })
    })
  }

  totalPrice() {
    this.checkForOffers()
    let total = 0
    this.basket.forEach((item) => (total += Number(item.stackPrice)))
    return Number(total.toFixed(2))
  }

  purchaseBasket() {
    const data = {
      date: new Date().toLocaleString(),
      basket: this.basket,
      total: this.totalPrice()
    }

    // return receipt info
    const receipt = new Receipt(data)
    this.sendBasketSMS(receipt.print())

    return receipt.info()
  }

  // Twilio
  sendBasketSMS(messageToSend) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    const client = require('twilio')(accountSid, authToken)

    console.log('Message send')
    client.messages
      .create({
        body: messageToSend,
        from: '+19295817257',
        to: '+447417438484'
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err))
  }
}

module.exports = {
  Basket
}
