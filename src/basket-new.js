const Receipt2 = require("./receipt-new.js");
const data = require("../inventory-quant.json");
const inventory = data.inventory;
const small = 5;
const medium = 10;
const large = 20;

class Basket2 {
  constructor(size = small) {
    this.items = [];
    this.size = size;
  }

  add(item, num = 1) {
    if (this.isFull()) return "You cannot add more items, your basket is full";

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].sku === item) {
        this.items[i].quantity += num;
        return "This item is already in your basket";
      }
    }

    const element = inventory.filter((x) => x.sku == item);
    if (element.length === 1) {
      this.items.push(element[0]);
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].sku === item) {
        this.items[i].quantity = num;
      }
    }

    if (element.length === 0) {
      return "We do not stock this item";
    }
  }

  remove(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].sku === item && this.items[i].quantity === 1) {
        this.items.splice(i, 1);
        return "Item Removed";
      }

      if (this.items[i].sku === item && this.items[i].quantity > 1) {
        this.items[i].quantity--;
        return "Item Removed";
      }
    }
    return "You cannot remove items that are not in your basket";
  }

  totalItemsInBasket() {
    let amount = 0;

    for (let i = 0; i < this.items.length; i++) {
      amount += this.items[i].quantity;
    }

    return amount;
  }

  isFull() {
    return this.totalItemsInBasket() >= this.size;
  }

  changeBasketSize(size) {
    if (size !== small && size !== medium && size !== large) {
      return `Pick small, medium or large`;
    }

    if (this.totalItemsInBasket() > size) {
      return `Pick a basket bigger than ${this.totalItemsInBasket()}`;
    }

    this.size = size;
  }

  howManyOfItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].sku === item) {
        return this.items[i].quantity;
      }
    }
    return 0;
  }

  priceOfBagel(item) {
    for (let product of inventory) {
      if (product.sku === item) {
        return product.price;
      }
    }
  }

  amountOfDeals(item, numberInDeal) {
      return Math.floor(this.howManyOfItem(item)/numberInDeal)
  }

  priceOfBasket() {
    let total = 0;

    for (let product of this.items) {
      total += Number(product.price).toFixed(2) * product.quantity;
    }
    if (this.amountOfDeals("BGLO",6) >= 1) {
      total -= 0.45 * this.amountOfDeals("BGLO",6);
    }
    if (this.amountOfDeals("BGLE",6) >= 1) {
      total -= 0.45 * this.amountOfDeals("BGLE",6);
    }
    if (this.amountOfDeals("BGLP",12) >= 1) {
      total -= 0.69 * this.amountOfDeals("BGLP",12)
    }
    if (
      this.howManyOfItem("COF") > 0 &&
      this.howManyOfItem("BGLP") > 0 &&
      this.howManyOfItem("BGLP") % 12 !== 0
    ) {
      total -=
        0.13 * Math.min(this.howManyOfItem("COF"), this.howManyOfItem("BGLP"));
    }

    return Math.ceil(total * 100) / 100;
  }

  totalSavings() {
    let total = 0;
    for (let product of this.items) {
      total += Number(product.price) * product.quantity;
    }

    return Math.ceil((total - this.priceOfBasket()) * 100) / 100;
  }

  checkOut() {
    const receipt = new Receipt2(this.items, this.totalSavings());
    return receipt.print(this.priceOfBasket());
  }
}


let basket = new Basket2(large);
basket.add("BGLO", 11);
basket.add("BGLP", 3);
basket.add("COF", 1);

console.log(basket.checkOut());

module.exports = Basket2;


