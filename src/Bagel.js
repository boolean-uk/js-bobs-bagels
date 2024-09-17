const { Product } = require("./Product")

export class Bagel extends Product {
    constructor (sku, price, name, variant) {
       super (sku, name, price, variant)
    }
}