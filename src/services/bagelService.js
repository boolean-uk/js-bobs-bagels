const { Bagel } = require('../models/bagel')
const { BagelNotFoundError } = require('../errors/BagelNotFoundError')
const basketService = require('./basketService')

const getAll = (basketUUID) => {
    const basket = basketService.getByUUID(basketUUID)
    return basket.bagels
}

const add = (basketUUID, bagelDTO) => {
    const basket = basketService.getByUUID(basketUUID)
    const bagel = new Bagel(bagelDTO.name, bagelDTO.price)
    basket.addBagel(bagel)
    return bagel.uuid
}

const remove = (basketUUID, bagelUUID) => {
    const basket = basketService.getByUUID(basketUUID)
    try {
        basket.removeBagel(bagelUUID)
    } catch (err) {
        throw new BagelNotFoundError(bagelUUID)
    }
}

module.exports = {
    getAll,
    add,
    remove
}
