class Item {
  price = 2.99;

  constructor(name) {
    this.name = name;
  }

  checkPrice() {
    return this.price;
  }
}
module.exports = Item;
