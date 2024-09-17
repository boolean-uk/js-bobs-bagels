const { Product } = require("./Product")

class Coffee extends Product {
    constructor (sku, price, name, variant) {
       super (sku, name, price, variant)
    }
}

module.exports = {
    Coffee
}