class Receipt {
  constructor(data) {
    this.data = data
    this.withOffer = false
    this.discountTotal = 0
  }

  info() {
    return this.data
  }

  receiptItemsConstructor() {
    let string = '\n' // Initial left space
    let basketList = this.data.basket.map((item) => {
      let string = ''

      // Quantity
      string += `x${item.quantity} - `

      // Price
      string += `£${item.stackPrice} - `

      // Names
      string += item.variant ? item.variant + ' ' : ''
      string += item.name

      string += '\n' // Next line and Left space

      const normalStackPrice = item.quantity * item.price
      if (normalStackPrice !== item.stackPrice) {
        this.withOffer = true
        string += `(-£${(normalStackPrice - item.stackPrice).toFixed(2)})`
        string += '\n' // Next line and Left space
        this.discountTotal += normalStackPrice - item.stackPrice
        return string
      }
      return string
    })
    basketList = String(basketList).replace(/,/g, '')
    string += basketList
    return string
  }

  print() {
    console.log('Receipt returned.')
    return `
🧙‍♂️


🥯 Bob's Bagels 🥯
 ${this.data.date}
-----------------------
${this.receiptItemsConstructor()}
-----------------------
Total                  £${this.data.total}

Total saved: £${this.discountTotal.toFixed(2)}
Thank you for your order!
`
  }
}

module.exports = {
  Receipt
}
