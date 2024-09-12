class Bagel {
  constructor(sku, name, price) {
    this.sku = sku;
    this.price = price;
    this.name = name;
  }

  getPrice() {
    return this.price;
  }

  getSku() {
    return this.sku;
  }
}

module.exports = Bagel;