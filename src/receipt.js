class Receipt {
  constructor(basket, menu) {
    this.basket = basket;
    this.menu = menu;
    this.skuCount = [];
  }
  howManyOfEach(basket) {
    for (let i = 0; i < basket.length; i++) {
      this.skuCount.push(basket[i].sku);
    }
    const basketCount = {};
    for (const element of this.skuCount) {
      if (basketCount[element]) {
        basketCount[element] += 1;
      } else {
        basketCount[element] = 1;
      }
    }
    console.log("SKU COUNT: ", this.skuCount);
    console.log("BASKET COUNT: ", basketCount);
    return basketCount;
  }

  receiptLine() {
    console.log("RECEIPT LINE: ", receiptLine);
    console.log("sku, description, qty, price");
  }
}

module.exports = Receipt;
