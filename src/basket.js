const { inventory } = require('../inventory.json')
const { specialOffers } = require('../specialOffers')
require('dotenv').config()

class Basket {
  constructor(basketCapacity = 10) {
    this.basketCapacity = basketCapacity
    this.basket = []
  }

  addBagel(sku) {
    const found = inventory.find((bagel) => bagel.sku === sku)

    if (!found) return

    const exists = this.basket.find((bagel) => bagel.sku === found.sku)

    if (exists) ++exists.quantity
    else {
      if (this.basket.length === this.basketCapacity) return false
      const foundCopy = { ...found, quantity: 1 }
      this.basket.push(foundCopy)
      return foundCopy
    }
  }

  removeBagel(sku) {
    const found = this.basket.find((bagel) => bagel.sku === sku)

    if (!found) return false

    this.basket = this.basket.filter((bagel) => bagel.sku !== found.sku)

    return found
  }

  displayPrices() {
    return inventory.map((bagel) => {
      const { sku, price, variant } = bagel
      return { sku, price, variant }
    })
  }

  displayTotal() {
    const { offersTotal, remaining } = this.applyOffers()

    // Creating a copy of the basket and then using that to determine the total- this way the quantities in the original basket don't get edited
    const basketCopy = JSON.parse(JSON.stringify(this.basket))

    // getting what the total would have been without any offers in order to work out the total savings
    const totalWithoutOffersApplied = basketCopy.reduce((total, bagel) => {
      return total + +bagel.price * bagel.quantity
    }, 0)

    // replace quantity with the reamining bagels after offer if an offer has been applied
    remaining.forEach((offerBagel) => {
      basketCopy.forEach((bagel) => {
        if (offerBagel.sku === bagel.sku) {
          bagel.quantity = offerBagel.remainingAfterOffer
        }
      })
    })

    const total = basketCopy
      .reduce((total, bagel) => {
        return total + +bagel.price * bagel.quantity
      }, offersTotal)
      .toFixed(2)

    const savings = (totalWithoutOffersApplied - total).toFixed(2)

    this.printReceipt(total, savings)

    return total
  }

  applyOffers() {
    let offersTotal = 0
    const remaining = []

    specialOffers.forEach((offer) => {
      this.basket.forEach((bagel) => {
        if (bagel.sku === offer.sku && bagel.quantity >= offer.amountNeeded) {
          const remainingAfterOffer = bagel.quantity % offer.amountNeeded

          // push to a 'remaining' array with the remaining amount and which sku it belongs to- we need this info in the displayTotal function
          const sku = bagel.sku
          remaining.push({ sku, remainingAfterOffer })
          const offerAmount = bagel.quantity - remainingAfterOffer

          // work out offer totals
          offersTotal += offer.priceOffer * (offerAmount / offer.amountNeeded)
        }
      })
    })
    return { offersTotal, remaining }
  }

  printReceipt(total, savings) {
    if (this.basket.length < 1) return false

    return `
            --- Bob's Bagels ---
            ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

       --------------------------------

    ${this.basket
      .map((bagel) => {
        const { name, variant, price, quantity } = bagel
        return `    ${variant} ${name}        ${quantity}  £${(
          price * quantity
        ).toFixed(2)} \n`
      })
      .join('')}

       --------------------------------
        Total                 £${total}

        ${
          savings > 0
            ? `You saved a total of £${savings} \n              on this shop`
            : ''
        }

                 Thank you
              for your order!
    `
  }

  textDeliveryMessage(phoneNumber) {
    const deliveryTime = new Date()
    const timeWithoutSeconds = deliveryTime.toLocaleTimeString([], {
      timeStyle: 'short'
    })
    const message = `
Your order is on it's way and will be delivered at: ${timeWithoutSeconds}

Incoming
--------

${this.basket
  .map((bagel) => {
    const { quantity, name, variant } = bagel
    return `${variant} ${name} ---  ${quantity} \n`
  })
  .join('')}
    `

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken)

    client.messages
      .create({
        body: message,
        from: '+13393315088',
        to: phoneNumber
      })
      .then((message) => console.log(message.sid))
  }
}

module.exports = { Basket }
