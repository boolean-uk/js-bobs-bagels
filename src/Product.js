/* eslint-disable prettier/prettier */
class Product {
    constructor (sku, price, name, variant) {
        this.sku = sku
        this.price = price
        this.name = name
        this.variant = variant
    }
    getPrice = () => this.price
}

module.exports = {
  Product
}
