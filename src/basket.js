const data = require('../inventory.json')
const { inventory } = data

const basket = []
let capacity = 10

function getBasketTotal() {
    return basket.reduce((runningTotal, bagel) => {
        return runningTotal + (Number(bagel.price) * bagel.quantity)
    }, 0)
}

function remove(sku) {
    const found = basket.find(b => b.sku === sku)

    if (!found) {
        return false
    }

    const index = basket.findIndex(b => b.sku === sku)
    basket.splice(index, 1)
    return found
}

function setCapacity(num) {
    capacity = num
    basket.splice(0, basket.length)
}

function add(sku) {
    if (basket.length >= capacity) {
        return false
    }

    const found = basket.find(bagel => bagel.sku === sku)

    if (found) {
        found.quantity += 1
        return found
    }

    const bagelToAdd = inventory.find(bagel => bagel.sku === sku)
    const copiedBagel = {...bagelToAdd, quantity: 1}
    basket.push(copiedBagel)
    return copiedBagel
}

function getBasket() {
    return [...basket]
}

module.exports = {
    add,
    getBasket,
    setCapacity,
    remove,
    getBasketTotal
}