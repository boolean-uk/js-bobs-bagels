const Discount = require("./Discount");

class DiscountInventory {
  discounts = [];

    constructor() {
        this.discounts.push(new Discount("BGLO", 0.49, 6)),
        this.discounts.push(new Discount("BGLP", 3.99, 12)),
        this.discounts.push(new Discount("BGLE", 2.49, 6)),
        this.discounts.push(new Discount("COFB", 1.25, 1))
    }

   searchDiscount(sku) {
    for (const discount of this.discounts) {
      if (discount.sku === sku) {
        return new Discount(discount.sku, discount.price, discount.quantity);
      }
    }
    return null;
  }

}

module.exports = DiscountInventory;