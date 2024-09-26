const Basket = require("./basket.js");

let newBasket = new Basket();

newBasket.addItemToBasketByName("Bagel Onion"); // .49
newBasket.addItemToBasketByName("Coffee"); // .99
newBasket.addItemToBasketByName("Coffee"); // .99
newBasket.addItemToBasketByName("Bagel Plain"); // .39
newBasket = newBasket.addItemToBasketByName("Bagel Everything"); // .49

class Cost {
  costAccumulated = 0;
  BGLO = 0;
  BGLP = 0;
  BGLE = 0;
  COF = 0;
  costAcummulated = {
    BGLO: 0,
    BGLP: 0,
    BGLE: 0,
    COF: 0
  };
  totalCost() {
    for (let item of newBasket) {
      console.log("this.costAccumulated", this.costAccumulated);
      this.costAccumulated += item.price;
    }
    return +this.costAccumulated.toFixed(2);
  } // .49, 1.48, 2.47, 2.86, 3.35

  totalDiscountCost() {
    let accumulated;
    let discountedCost = 0;
    for (let item of newBasket) {
      if (item.SKU === "BGLO") {
        this.BGLO += 1;
      }
      if (item.SKU === "BGLP") {
        this.BGLP += 1;
      }
      if (item.SKU === "BGLE") {
        this.BGLE += 1;
      }
      if (item.SKU === "COF") {
        this.COF += 1;
      }
    }
    accumulated = {
      BGLO: this.BGLO,
      BGLP: this.BGLP,
      BGLE: this.BGLE,
      COF: this.COF
    };

    if (accumulated.COF >= 1 && accumulated.BGLP >= 1) {
      discountedCost += 1.25;
      accumulated.BGLP = accumulated.BGLP - 1;
      accumulated.COF = accumulated.COF - 1;
      discountedCost += accumulated.COF * 0.99;
    }

    if (accumulated.BGLO >= 6) {
      discountedCost +=
        Math.floor(accumulated.BGLO / 6) * 2.49 + (accumulated.BGLO % 6) * 0.49;
    } else {
      discountedCost += accumulated.BGLO * 0.49;
    }

    if (accumulated.BGLP >= 12) {
      discountedCost +=
        Math.floor(accumulated.BGLP / 12) * 3.99 +
        (accumulated.BGLP % 6) * 0.39;
    } else {
      discountedCost += accumulated.BGLP * 0.39;
    }

    if (accumulated.BGLE >= 6) {
      discountedCost +=
        Math.floor(accumulated.BGLE / 6) * 2.49 + (accumulated.BGLE % 6) * 0.49;
    } else {
      discountedCost += accumulated.BGLE * 0.49;
    }

    return +discountedCost.toFixed(2);
  }
}

module.exports = Cost;
