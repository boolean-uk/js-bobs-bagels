const Item = require("../src/item");

class Basket {
  currentBasket = [];

  constructor(basketLimit = 5) {
    this.currentBasketItemLimit = basketLimit;
  }

  addBagelToBasket(name, numOfDesiredbagels = 1) {
    if (this.isFull(numOfDesiredbagels))
      return "youre trying to add too many bagels";

    for (let i = 0; i < numOfDesiredbagels; i++) {
      const item = new Item(name);
      this.currentBasket.push(item);
    }

    return this.currentBasket;
  }

  removeBagelFromBasket(name) {
    const selectedBagelIndex = this.currentBasket.findIndex(
      (bagel) => bagel.name === name
    );

    if (selectedBagelIndex === -1) return "Bagel not found";

    this.currentBasket.splice(selectedBagelIndex, 1);
    return this.currentBasket;
  }

  isFull(num) {
    return num + this.currentBasket.length > this.currentBasketItemLimit;
  }

  checkoutTotalPrice() {
    const totalPrice = this.currentBasket.reduce(
      (acc, item) => (acc += item.price),
      0
    );
    return totalPrice;
  }

  // setNewBasketMaxCapacity(desiredNewItemLimit) {
  //   if (desiredNewItemLimit > 5 && desiredNewItemLimit <= 20)
  //     return (this.currentBasketItemLimit = desiredNewItemLimit);
  // }
}

module.exports = Basket;
