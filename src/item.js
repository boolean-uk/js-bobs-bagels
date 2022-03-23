class Item {
  constructor (sku, name, price = 1, variant = '') {
    this.sku = sku
    this.name = name
    this.price = price
    this.variant = variant
  }
}

module.exports = Item
