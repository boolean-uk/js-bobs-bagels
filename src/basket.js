const Receipt = require("./receipt");

class BobsBagels {
  constructor() {
    this.basket = [];
    this.basketCapacity = 3;
    this.menu = [
      { sku: "BGLP", type: "Bagel", description: "Plain", price: 1.0 },
      { sku: "BGLN", type: "Bagel", description: "Not So Plain", price: 1.5 },
      { sku: "BGLV", type: "Bagel", description: "Very Tasty", price: 2.0 },
      { sku: "BGLE", type: "Bagel", description: "Bagel Extra", price: 2.5 },
      { sku: "BGLS", type: "Bagel", description: "Bagel Special", price: 3.0 },
      { sku: "COFL", type: "Coffee", description: "Latte", price: 2.75 },
    ];
    this.receipt = new Receipt(this.basket, this.menu);
  }

  addBagel(description, quantity) {
    let productToBeAdded = this.findPoduct(description);
    for (let i = 0; i < quantity; i++) {
      this.isBasketFull();
      this.basket.push(productToBeAdded);
    }
    return this.basket;
  }

  findPoduct(description) {
    let product;
    for (let i = 0; i < this.menu.length; i++) {
      if (
        this.menu[i].description === description ||
        this.menu[i].sku === description
      ) {
        product = this.menu[i];
      }
    }
    return product;
  }

  removeBagel(id) {
    if (this.isItemValid === true) {
      this.basket = this.basket.filter((bagel) => bagel.id !== id);
      return this.basket;
    } else {
      return this.basket;
    }
  }

  isBasketFull() {
    if (this.basket.length >= this.basketCapacity) {
      return "YOUR BASKET IS FULL";
    }
  }

  amendBasketCapacity(newCapacity) {
    this.basketCapacity = newCapacity;
    return this.basketCapacity;
  }

  isItemValid(item) {
    let validItems = [];
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].description === item) {
        validItems.push(this.basket[i].description);
      }
    }
    if (validItems.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  price(description) {
    for (let i = 0; i < this.menu.length; i++) {
      if (this.menu[i].description === description) {
        return this.menu[i].price;
      }
    }
  }

  totalQty() {
    return this.basket.length;
  }

  orderSum() {
    let sum = 0;
    for (let i = 0; i < this.basket.length; i++) {
      sum += this.basket[i].price;
    }
    return sum;
  }

  howManyOfEach() {
    return this.receipt.howManyOfEach(this.basket);
  }

  receiptLine() {
    return this.receipt.receiptLine(this.basket);
  }
}

module.exports = BobsBagels;
