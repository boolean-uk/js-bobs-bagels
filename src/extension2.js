const pound = '\u00a3'

function getCurrentDateTimeFormatted() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`
}

function generateReceipt(basket) {
  let receipt = '\n'
  receipt += "    ~~~ Bob's Bagels ~~~    "
  receipt += '\n\n'

  receipt += '    ' + getCurrentDateTimeFormatted()
  receipt += '\n\n'
  receipt += '----------------------------'
  receipt += '\n\n'

  for (const item of basket.items) {
    if (item.item.name === 'Coffee') receipt += item.item.name.padEnd(20)
    else receipt += (item.item.variant + ' ' + item.item.name).padEnd(20)
    receipt +=
      String(item.quantity).padEnd(4) +
      pound +
      (item.item.price * item.quantity).toFixed(2) +
      '\n'
  }
  receipt += '\n\n'
  receipt += '----------------------------'
  receipt += '\nTotal'.padEnd(25) + pound + basket.totalCost()
  receipt += '\n\n'
  receipt += '        Thank you\n'
  receipt += '      for your order!'
  return receipt
}

module.exports = {
  generateReceipt
}
