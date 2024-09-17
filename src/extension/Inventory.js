const Product = require("./Product");

class Inventory {
  products;

  constructor() {
    this.products = [];

    this.products.push(new Product("BGLO", 0.49, "Bagel", "Onion"));
    this.products.push(new Product("BGLP", 0.39, "Bagel", "Plain"));
    this.products.push(new Product("BGLE", 0.49, "Bagel", "Everything"));
    this.products.push(new Product("BGLS", 0.49, "Bagel", "Sesame"));
    this.products.push(new Product("COFB", 0.99, "Coffee", "Black"));
    this.products.push(new Product("COFW", 1.19, "Coffee", "White"));
    this.products.push(new Product("COFC", 1.29, "Coffee", "Capuccino"));
    this.products.push(new Product("COFL", 1.29, "Coffee", "Latte"));
    this.products.push(new Product("FILB", 0.12, "Filling", "Bacon"));
    this.products.push(new Product("FILE", 0.12, "Filling", "Egg"));
    this.products.push(new Product("FILC", 0.12, "Filling", "Cheese"));
    this.products.push(new Product("FILX", 0.12, "Filling", "Cream Cheese"));
    this.products.push(new Product("FILS", 0.12, "Filling", "Smoked Salmon"));
    this.products.push(new Product("FILH", 0.12, "Filling", "Ham"));
  }

  getProduct(sku) {
    return this.products.filter((product) => product.sku === sku)[0];
  }
}

module.exports = Inventory;
