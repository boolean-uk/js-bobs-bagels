class Bagel {
  constructor(sku, name, price) {
    this.sku = sku;
    this.price = price;
    this.name = name;
  }

  getPrice() {
    return this.price;
  }
}

module.exports = Bagel;