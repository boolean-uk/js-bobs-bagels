class Basket {
  constructor(capacity) {
    this.capacity = capacity
    this.products = []
  }

  isFull() {
    return this.products.length === this.capacity
  }

  add(product) {
    if(!this.isFull())
    this.products.push(product)
  }

  doesBagelExist(bagel) {
    const Bagel = require('../src/bagel.js')
    return bagel instanceof Bagel && this.products.includes(bagel);
  }

  remove(product) {
    if(this.doesBagelExist(product)) this.products.splice(product, 1)
  }

  totalCost() {
  let cost = 0
  for (const bagel of this.products) {
    cost += bagel.price
  }
  return cost
}

  calculateDiscounts() {
    const quantities = this.getProductQuantities();
    const discounts = new Map();
    const discountedBagels = this.getBagels().reduce((acc, bagel) => {
      acc[bagel.getSku()] = acc[bagel.getSku()] || [];
      acc[bagel.getSku()].push(bagel);
      return acc;
    }, {});
    for (const [product, quantity] of quantities.entries()) {
      switch (product.getSku()) {
        case 'BGLO':
        case 'BGLE': {
          const discounted = Math.floor(quantity / 6);
          discounts.set(product, discounted * 0.45);
          if(!discountedBagels===undefined)
          discountedBagels[product.getSku()].splice(0, discounted * 6);
          break;
        }
        case 'BGLP': {
          const discounted = Math.floor(quantity / 12);
          discounts.set(product, discounted * 0.69);
          if(!discountedBagels===undefined)
          discountedBagels[product.getSku()].splice(0, discounted * 12);
          break;
        }
      }
    }
    for (const [product, quantity] of quantities.entries()) {
      if (product.getSku() === 'COFB') {
        const bagels = Object.values(discountedBagels).flatMap((bagelList) => bagelList)
          .sort((a, b) => a.getPrice() - b.getPrice());
        //const bagels = Object.values(discountedBagels)

        let discount = 0;
        const coffeePrice = product.getPrice();
        let coffeeQuantity = quantity;

        for (const bagel of bagels) {
          if (coffeeQuantity === 0) {
            break;
          }

          const bagelPrice = bagel.getPrice();
          discount += coffeePrice + bagelPrice - 1.25
          coffeeQuantity--;
        }

        discounts.set(product, discount);
      }
    }

    return discounts;
  }

  getProductQuantities() {
    return this.products.reduce((acc, product) => {
      acc.set(product, (acc.get(product) || 0) + 1);
      return acc;
    }, new Map());
  }

  getBagels() {
    return this.products.filter((p) => p.name === 'Bagel');
  }
}
module.exports = Basket