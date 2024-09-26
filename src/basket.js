class Basket {
  basketList = [];

  constructor(capacity = 2) {
    this.capacity = capacity;
  }

  addToBasket(bagel) {
    this.basketList.push(bagel);
    return this.basketList;
  }

  removeFromBasket(bagelName) {
    if (this.checkItemExists(bagelName)) {
      for (let i = 0; i < this.basketList.length; i++) {
        if (this.basketList[i].name === bagelName) {
          this.basketList.splice(i, 1);
          break;
        }
      }
      return this.basketList;
    }
  }

  fullBasket() {
    if (this.basketList.length >= this.capacity) {
      return true;
    } else {
      return false;
    }
  }

  checkItemExists(bagel) {
    // loop over the array to check each item in the basket
    // check if bagel name string matches with bagel name in the basket.
    // if it does, return true.

    for (let i = 0; i < this.basketList.length; i++) {
      if (bagel === this.basketList[i].name) {
        return true;
      }
    }
    return false;
  }

  checkout() {
    let sum = 0;
    for (let i = 0; i < this.basketList.length; i++) {
      const currentBagel = this.basketList[i];
      sum += currentBagel.price;
    }
    return sum;
  }
}

module.exports = Basket;
