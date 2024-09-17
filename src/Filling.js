const { Product } = require("./Product")

class Filling extends Product {
    constructor (sku, price, name, variant) {
       super (sku, name, price, variant)
    }
}

module.exports = {
    Filling
}