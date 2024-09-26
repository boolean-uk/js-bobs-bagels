const date = new Date()
const nicelyFormattedDate = date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})

function printReceipt(basket) {
  const storeName = "Bob's Bagels"
  const totalPrice = basket.totalPrice()
  const items = basket.shoppingList
  if (items.length === 0) {
    return "There's nothing in your Basket!"
  }
  const receipt = `         ~~~ ${storeName} ~~~
       ${nicelyFormattedDate}
  --------------------------------
  ${items
    .map(
      (item) =>
        `${(item.name + ' ' + item.variant).padEnd(18)} ${item.quantity
          .toString()
          // eslint-disable-next-line prettier/prettier
          .padStart(3)
          .padEnd(2)}   ${
          '£' + (item.quantity * item.price).toFixed(2).padStart(6)
        }`
    )
    .join('\n  ')}
  --------------------------------
  Total                    £${totalPrice.padStart(6)}

      Thank you for your order!`
  console.log(receipt)
  return receipt
}

module.exports = {
  printReceipt: printReceipt
}
