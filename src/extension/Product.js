class Product {
  sku;
  name;
  price;
  variant;

  constructor(sku, price, name, variant) {
    this.price = price;
    this.name = name;
    this.sku = sku;
    this.variant = variant;
  }
}

module.exports = Product;
