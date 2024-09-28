class Receipt {
  receiptLine (cofDeal, subPrice, savedPrice = '') {
    let receipt = ''
    const receiptLength = Object.keys(subPrice).length
    const sku = Object.keys(subPrice)
    const quantity = Object.values(cofDeal)
    const subTotal = Object.values(subPrice)
    const savedTotal = Object.values(savedPrice)
    const inSKU = sku[0].length <= 4

    for (let i = 0; i < receiptLength; i++) {
      if (inSKU) receipt += `${quantity[i]}x ${sku[i]} = ${subTotal[i]}\n`
      if (!inSKU && savedTotal[i] === 0) receipt += `${sku[i]} ${quantity[i]} £${subTotal[i]}\n`
      if (!inSKU && savedTotal[i] !== 0) receipt += `${sku[i]} ${quantity[i]} £${subTotal[i]}\n       (-£${savedTotal[i]})\n`
    }
    return receipt
  }

  totalSavedPrice (totalSavedPrice) {
    if (totalSavedPrice === 0) return ''
    return `You saved a total of\n £${totalSavedPrice} on this shop`
  }

  today () {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  printSKUReceipt (receiptLine, totalPrice) {
    return `${receiptLine}          ----\n          ${totalPrice}`
  }

  printItemReceipt (receiptLine, totalPrice, totalSavedPrice) {
    return `~~~ Bob's Bagels ~~~\n\n${this.today()}\n\n--------------------\n\n${receiptLine}\n--------------------\nTotal          £${totalPrice}\n\n${totalSavedPrice}\n\n     Thank you\n   for your order!`
  }
}

module.exports = Receipt
