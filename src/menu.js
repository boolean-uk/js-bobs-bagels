class Menu {
  counter = 0;
  bagelMenu = [];

  createSkuCode(string) {
    let SKU = "";
    if (string.slice(0, 1) !== "B") {
      SKU = string.slice(0, 3).toUpperCase();
      return SKU;
    }
    const stringArray = [...string];
    const stringSplit = string.split(" ");

    for (let j = 0; j < stringArray.length; j++) {
      if (j % 2 === 0) {
        SKU += stringArray[j];
      }
      SKU = SKU.slice(0, 3);
    }
    SKU += stringSplit[1].slice(0, 1);
    return SKU.toUpperCase();
  }

  createItemUpdateMenu(newMenuItem, price) {
    const SKU = this.createSkuCode(newMenuItem);
    const newBagel = {
      SKU: SKU,
      id: this.counter,
      name: newMenuItem,
      price: price
    };
    this.bagelMenu.push(newBagel);
    this.counter += 1;
    return this.bagelMenu;
  }
}

module.exports = Menu;
