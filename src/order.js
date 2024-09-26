const {inventory} = require("../inventory.json")


let orderNo = 0

function placeOrder(items) {
  const dateOfOrder = getDateTimeNow()
  const receipt = getReceipt(items, dateOfOrder)
  const orderJson = getOrderJson(items, dateOfOrder)

  return [receipt, orderJson]
}

function getReceipt(items, dateOfOrder) {
  const storeName = "~~~ Bob's Bagels ~~~"
  const savingsLine = `You saved a total of £${getTotalSavings(items).toFixed(2)}`
  const [itemRows, longestRow] = getItemRows(items, savingsLine.length)
  const lineSeparator = '-'.repeat(longestRow - 1)
  const totalPrice = `£${getTotalPrice(items).toFixed(2)}`
  const headerPad = Math.floor((longestRow - storeName.length) / 2)
  const totalPad = longestRow - 'Total'.length - 1
  
  let receipt = "\n"
  receipt += ' '.repeat(headerPad) + storeName.padStart(headerPad) + "\n"
  receipt += ' '.repeat(headerPad) + dateOfOrder.padStart(headerPad) + "\n\n"
  receipt += lineSeparator + "\n\n"
  receipt += itemRows
  receipt += lineSeparator + "\n\n"
  receipt += `Total${totalPrice.padStart(totalPad)}` + "\n\n"
  receipt += savingsLine + "\n"
  receipt += "       on this shop" + "\n\n"
  receipt += " Thank you for your order!"

  return receipt
}

function getOrderJson(items, dateOfOrder) {
  const order = {}
  order.Store = "Bob's Bagels"
  order['Order number'] = ++orderNo
  order['Date of order'] = dateOfOrder  
  order['Purchased items'] = getItemsWithDiscount(items)
  order['Original total price'] = getTotalPrice(items)
  order['Total price after discount'] = getTotalDiscountPrice(items).toFixed(2)
  order['Total savings'] = getTotalSavings(items).toFixed(2)

  return JSON.stringify(order, null, 2)
}

function getItemsWithDiscount(items) {
  let coffeeCount = getCoffeeCount(items)
  let itemsArr = deepCopyArr(items)
  for (const [item, quantity] of items.entries()) {
    const [itemSavings, remainingCoffees] = getItemSavings(item, quantity, coffeeCount)
    coffeeCount = remainingCoffees
    const itemCopy = itemsArr.find(el => el.sku === item.sku)
    itemCopy['price for one'] = checkPrice(itemCopy.sku)
    if (itemSavings) {
      itemCopy["price for all"] = itemCopy['price for one'] * quantity - itemSavings
      itemCopy.discount = (-1 * itemSavings).toFixed(2)
    }
  }

  return itemsArr
}

function deepCopyArr(items) {
  return Array.from(items).map(([key, value]) => {
    let {price, ...rest} = key;
    return {...rest, "price for one": checkPrice(key.sku), quantity: value};
  });
}

function getMultiBagelSavings(item, quantity) {
  if (item.name === 'Bagel' && quantity >= 6) {
    const twelves = Math.floor(quantity / 12)
    const sixes = (quantity - (twelves * 12)) >= 6 ? 1 : 0
    const itemTotal = checkPrice(item.sku) * quantity
    
    return itemTotal - twelves * 3.99 - sixes * 2.49
  }
  
  return 0
}

function getCoffeeAndBagelSavings(item, quantity, coffeeCount) {
  if (item.name === 'Bagel' && quantity % 6 > 0) {
    const bagelsForDiscount = quantity % 6
    const discountCount = Math.min(bagelsForDiscount, coffeeCount)
    const remainingCoffees = coffeeCount - discountCount
    const coffeePrice = checkPrice('COF')
    const savings = checkPrice(item.sku) - (1.25 - coffeePrice) * discountCount
    
    return [savings, remainingCoffees]    
  }
  
  return [0, 0]
}

function getTotalPrice(items) {
  let totalPrice = 0
  for (const [item, quantity] of items.entries()) {
    totalPrice += checkPrice(item.sku) * quantity
  }
  
  return totalPrice
}

function getCoffeeCount(items) {
  const coffeeCount = items.get(Array(items.keys()).filter(item => item.sku === 'COF')[0])
  
  return coffeeCount ? coffeeCount : 0
}

function getTotalSavings(items) {
  let totalSavings = 0
  let coffeeCount = getCoffeeCount(items)
  for (const [item, quantity] of items.entries()) {
    totalSavings += getMultiBagelSavings(item, quantity)
    if (coffeeCount) {
      const [coffeeSavings, remainingCoffees] = getCoffeeAndBagelSavings(item, quantity, coffeeCount)
      totalSavings += coffeeSavings
      coffeeCount = remainingCoffees
    }
  }
  
  return totalSavings
}

function getTotalDiscountPrice(items) {  
  return getTotalPrice(items) - getTotalSavings(items)
}

function getItemRows(items, minLength) {
  const keys = Array.from(items.keys());
  const longestName = Math.max(...keys.map(item => item.name.length));
  const longestVariant = Math.max(...keys.map(item => item.variant.length));
  
  let itemRows = ""
  let longestRow = minLength
  let coffeeCount = getCoffeeCount(items)
  for (let [item, quantity] of items.entries()) {
    const itemName = item.name.padEnd(longestName, ' ')
    const itemVariant = item.variant.padEnd(longestVariant, ' ')
    const itemPrice = (checkPrice(item.sku) * quantity)
    const [itemSavings, remainingCoffees] = getItemSavings(item, quantity, coffeeCount)
    coffeeCount = remainingCoffees
    
    let itemRow = `${itemName}  ${itemVariant} ${String(quantity).padEnd(2, ' ')}  £${itemPrice.toFixed(2)}` + "\n"
    const rowLength = itemRow.length
    const savingsRow = itemSavings ? `(-£${(itemSavings.toFixed(2))})\n` : ""
    itemRow += `${(savingsRow).padStart(itemRow.length  + 1)}\n`
    itemRows += itemRow
    longestRow = longestRow < rowLength ? rowLength : longestRow
  }

  return [itemRows, longestRow]
}

function getItemSavings(item, quantity, coffeeCount) {
  const multiBagelSavings = getMultiBagelSavings(item, quantity)
  const [coffeeAndBagelSavings, remainingCoffees] = getCoffeeAndBagelSavings(item, quantity, coffeeCount)

  return [multiBagelSavings + coffeeAndBagelSavings, remainingCoffees]
}

function getDateTimeNow() {
  const now = new Date();
  const format = (value) => String(value).padStart(2, '0')
  const date = `${now.getFullYear()}-${format(now.getMonth() + 1)}-${format(now.getDate())}`
  const time = `${format(now.getHours())}:${format(now.getMinutes())}:${format(now.getSeconds())}`

  return `${date} ${time}`;
}

function getItemBySku(sku) {  
  return inventory.filter((el) => el.sku === sku)[0]
}

function checkPrice(sku) {
  const item = getItemBySku(sku)
  
  return item.price / 100.0
}

module.exports = placeOrder
