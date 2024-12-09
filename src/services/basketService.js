const { Basket } = require('../models/basket.js')
const { BasketNotFoundError } = require('../errors/BasketNotFoundError')
const baskets = []

const getAll = () => {
    return baskets
}

const add = (capacity) => {
    const basket = new Basket(capacity)
    baskets.push(basket)
    return basket.uuid
} 

const getByUUID = (uuid) => {
    const basket = baskets.filter((b) => b.uuid === uuid)[0]
    if (basket === undefined) {
        throw new BasketNotFoundError(uuid)
    }
    return basket
}

const removeByUUID = (uuid) => {
    const basketToRemove = baskets.filter((b)=> b.uuid === uuid)[0]
    if (basketToRemove === undefined) {
        throw new BasketNotFoundError(uuid)
    }
    baskets.splice(baskets.indexOf(basketToRemove), 1)
}

module.exports = {
    getAll,
    add,
    getByUUID,
    removeByUUID
}
