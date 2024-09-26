const Menu = require("./menu.js");

class Basket {
  initialiseMenu() {
    let latestMenu = new Menu();
    latestMenu.createItemUpdateMenu("Bagel Onion", 0.49);
    latestMenu.createItemUpdateMenu("Bagel Plain", 0.39);
    latestMenu.createItemUpdateMenu("Bagel Everything", 0.49);
    this.latestMenu = latestMenu.createItemUpdateMenu("Coffee", 0.99);
  }

  constructor() {
    this.basket = [];
    this.#basketCapacity = 5;
    this.initialiseMenu();
  }
  counter = 4;

  #basketCapacity;

  get basketCapacity() {
    return this.#basketCapacity;
  }

  set basketCapacity(newCapacity) {
    return (this.#basketCapacity = newCapacity);
  }

  addItemToBasketByName(nameOfBagel) {
    if (this.basket.length === this.#basketCapacity) {
      return (this.str = `I'm afraid your basket is full`);
    }
    for (let item of this.latestMenu) {
      if (item.name === nameOfBagel) {
        this.basket.push(item);
        return this.basket;
      }
    }
    console.log("Sorry we do not have your selection");
    return this.basket;
  }

  removeItemByName(nameItemToRemove) {
    const itemInBasket = [];
    for (let item of this.basket) {
      itemInBasket.push(item.name);
    }
    if (!itemInBasket.includes(nameItemToRemove)) {
      return `No such item to remove. Get a grip !!!!`;
    } else {
      this.basket.map((item, index) => {
        if (item.name === nameItemToRemove) {
          this.basket.splice(index, 1);
        }
      });
      return this.basket;
    }
  }

  removeItemByNameVanilla(nameItemToRemove) {
    const itemInBasket = [];
    for (let j = 0; j < this.basket.length; j++) {
      if (nameItemToRemove === this.basket[j].name) {
        continue;
      }
      itemInBasket.push(this.basket[j]);
    }
    this.basket = itemInBasket;
    return this.basket;
  }

  isMyBasketFull() {
    if (this.basket.length === this.#basketCapacity) {
      return `I'm afraid your basket is full`;
    }
    if (this.basket.length < this.#basketCapacity) {
      const spareCapacity = this.#basketCapacity - this.basket.length;
      return `You can buy another ${spareCapacity} bagels`;
    }
    if (this.basket.length > this.#basketCapacity) {
      const overCapacity = this.basket.length - this.#basketCapacity;
      return `Sorry, you are over capacity, please return ${overCapacity} bagels`;
    }
  }

  pricePerItem() {
    let str = "";
    for (let item of this.basket) {
      str += `Your ${item.name} will cost you $${item.price}.` + `\n`;
    }
    return str;
  }

  totalForBasket() {
    let total = 0;
    for (let item of this.basket) {
      total += item.price;
    }
    return `$${total.toFixed(2)}`;
  }

  isMyBasketFull() {
    if (this.basket.length === this.#basketCapacity) {
      return `I'm afraid your basket is full`;
    }
    if (this.basket.length < this.#basketCapacity) {
      const spareCapacity = this.#basketCapacity - this.basket.length;
      return `You can buy another ${spareCapacity} bagels`;
    }
    if (this.basket.length > this.#basketCapacity) {
      const overCapacity = this.basket.length - this.#basketCapacity;
      return `Sorry, you are over capacity, please return ${overCapacity} bagels`;
    }
  }
}
module.exports = Basket;
