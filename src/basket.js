const Manager = require("../src/manager");
const Item = require("../src/item");

class Basket {
  itemsArr = [];
  currentId = 1;
  limit = 5;
  manager = new Manager();

  addItemToBasket(name) {
    const price = name.length * 10;
    const { ...item } = new Item(name, this.currentId, price); //
    this.currentId++;
    this.itemsArr.push(item);

    return this.isBasketFull() ? "Your basket is full!" : this.itemsArr;
  }

  isBasketFull() {
    return this.itemsArr.length > this.limit;
  }

  removeItemFromBasket(id) {
    const itemsBeforeRemove = this.itemsArr;
    this.itemsArr = this.itemsArr.filter((item) => item.id !== id);

    return itemsBeforeRemove.length === this.itemsArr.length
      ? "Item doesn't exist"
      : this.itemsArr;
  }

  changeBasketLimit(newLimit) {
    return (this.limit = this.manager.changeBasketLimit(newLimit));
  }

  checkForPriceBeforeAddToCart(item) {
    const price = `The price of your ${item} is ${item.length * 10} pence`;
    return price;
  }

  addMultipleFavoriteToCart(name, times) {
    if (times > this.limit - this.itemsArr.length)
      return `Too much item for your basket ${this.itemsArr.length} of ${this.limit}`;
    for (let i = 0; i < times; i++) {
      this.addItemToBasket(name);
    }

    return this.itemsArr;
  }

  getTotalSumOfCart() {
    return this.itemsArr.reduce((acc, item) => (acc += item.price), 0);
  }
}

console.log(Basket.limit);

module.exports = Basket;
