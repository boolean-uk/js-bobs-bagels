const Receipt = require("./receipt.js")
const data = require("../inventory.json");
const INVENTORY = data["inventory"];
const small = 5;
const medium = 10;
const large = 15;

class Basket {
  constructor(size = small) {
    this.items = [];
    this.size = size;
  }

  add(item) {
    if (this.isFull()) 
       throw new Error("You cannot add more items, your basket is full");

    const element = INVENTORY.filter(x => x.sku == item)
      if(element.length === 1) {
        this.items.push(element[0])
        }

      if(element.length === 0) {
        return "We do not stock this item"
      }

    if (this.inBasket(item) > 1) 
        return "This item is already in your basket"
    }

      

  remove(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].sku === item) {
        this.items.splice(i, 1);
        return "Item Removed";
      }
    }
    return "You cannot remove items that are not in your basket";
  }

  isFull() {
    return this.items.length >= this.size;
  }

  changeBasketSize(size) {
    if (size !== small && size !== medium && size !== large) {
      return `Pick small, medium or large`;
    }

    if (this.items.length > size) {
      return `Pick a basket bigger than ${this.items.length}`;
    }

    this.size = size;
  }

  inBasket(item) {
      return this.items.filter(x => x.sku === item).length
  }

  priceOfBagel(item) {
    for (let product of INVENTORY) {
      if (product.sku === item) {
        return product.price;
      }
    }
  }

  priceOfBasket() {
    let total = 0;
    let changeArray = this.items.map(x => x)

    total += this.applySpecialOffer(changeArray, "BGLO", 6, 2.49)
    total += this.applySpecialOffer(changeArray, "BGLP", 12, 3.99)
    total += this.applySpecialOffer(changeArray, "BGLE", 6, 2.49)
    total += this.applyCoffeeBagelOffer(changeArray)

    for (let product of changeArray) {
      total += Number(product.price)
    }

    return Math.floor(total * 100) / 100;
  }

  applySpecialOffer(array, item, numberOfItem, dealPrice) {
    
    const howManyInBasket = this.inBasket(item)
    const amountOfDeals = Math.floor(howManyInBasket/numberOfItem) 

   if (amountOfDeals >= 1) {
    for(let j = 0; j < numberOfItem*amountOfDeals; j++) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].sku === item) {
          array.splice(i, 1);
          break
        }}}}
        
    return amountOfDeals*dealPrice
}

applyCoffeeBagelOffer(array) {
let counter = 0

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i].sku === "COF" && array[j].sku === "BGLP") {
        if(i < j) {
        array.splice(i, 1);
        array.splice(j-1,1);
        }
        if(j < i) {
          array.splice(j, 1);
          array.splice(i-1,1);
          }
        counter++
      }
    }
  }     

return counter*1.25
}

checkout() {

  let receipt = new Receipt(this.items)
  return receipt.print(this.priceOfBasket())

}


}



module.exports = Basket;


