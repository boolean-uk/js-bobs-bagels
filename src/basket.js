// eslint-disable-next-line no-unused-vars
const bagelsInBasket = {}
let currentAmount = 0
let capacity = 10
const json = require('../inventory.json')
const inventory = json.inventory

initializeBasket(inventory)
function initializeBasket(inventory) {
  for (const i in inventory) {
    bagelsInBasket[inventory[i].sku] = 0
  }
}

function clearBasket() {
  capacity = 10
  currentAmount = 0
  for (const i in bagelsInBasket) bagelsInBasket[i] = 0
}

function find(sku) {
  for (const i in inventory) {
    if (inventory[i].sku === sku) return inventory[i]
  }
  return null
}

function add(bagelSku, amount) {
  if (
    !Number.isInteger(amount) ||
    amount <= 0 ||
    amount + currentAmount > capacity ||
    bagelsInBasket[bagelSku] === undefined
  )
    return false
  bagelsInBasket[bagelSku] += amount
  currentAmount += amount
  return true
}

function remove(bagelSku, amount) {
  if (
    !Number.isInteger(amount) ||
    amount <= 0 ||
    bagelsInBasket[bagelSku] === undefined ||
    bagelsInBasket[bagelSku] < amount
  )
    return false
  bagelsInBasket[bagelSku] -= amount
  currentAmount -= amount
  return true
}

function total() {
  let total = 0
  for (const i in bagelsInBasket) {
    total += bagelsInBasket[i] * find(i).price
  }

  return Math.floor(total * 100) / 100
}

function checkBagelPrice(bagelSKU) {
  const bagel = find(bagelSKU)
  return bagel === null ? 0 : bagel.price
}

function changeCapacity(newCapacity) {
  if (newCapacity <= capacity || !Number.isInteger(newCapacity)) return false
  capacity = newCapacity
  return true
}

function getReceipt() {
  let receipt = []
  receipt.push("    ~~~ Bob's Bagels ~~~\n\n")
  let now = Date.now()
  now = new Date(now)
  receipt.push(now.toLocaleDateString().padStart(19) + '\n\n')
  receipt.push('-'.repeat(28) + '\n')

  for (const i in bagelsInBasket) {
    if (bagelsInBasket[i] === 0) continue
    const bagel = find(i)
    const bagelPrice = Math.floor(bagelsInBasket[i] * bagel.price * 100) / 100
    receipt.push(
      (bagel.variant ? bagel.variant + ' ' + bagel.name : bagel.name).padEnd(
        18
      ) +
        String(bagelsInBasket[i]).padEnd(4) +
        ' $' +
        bagelPrice +
        '\n'
    )
  }
  receipt.push('\n' + '-'.repeat(28) + '\n')
  receipt.push('Total                 $' + total() + '\n')
  receipt.push('        Thank you\n')
  receipt.push('      for your order!')

  return receipt.join('')
}

module.exports = {
  clearBasket,
  add,
  remove,
  changeCapacity,
  total,
  checkBagelPrice,
  getReceipt
}
