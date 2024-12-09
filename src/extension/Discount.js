class Discount {
  sku;
  price;
  quantity;

    constructor(sku, price, quantity) {
      this.sku = sku;
      this.price = price;
      this.quantity = quantity;
    }
  }
  
  module.exports = Discount;