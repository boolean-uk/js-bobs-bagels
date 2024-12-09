const Receipt = require("./Receipt");
const ReceiptLine = require("./ReceiptLine");
const DiscountInventory = require("./DiscountInventory");

class Basket {
  products;
  basketCapacity;
  basketQuantity;

  constructor(capacity) {
    this.products = [];
    this.basketCapacity = capacity;
    this.basketQuantity = 0;
  }

  add(product, quantity) {
    if (!this.isFull(quantity) && quantity > 0) {
      const findResult = this.find(product);

      //if product is already in the basket
      if (findResult.length > 0) {
        findResult[0].quantity += quantity;
      } else {
        //if it is a new product
        this.products.push({
          product,
          quantity,
        });
      }

      this.basketQuantity += quantity;
      return true;
    }

    return false;
  }

  find(product) {
    return this.products.filter((item) => item.product.sku === product.sku);
  }

  isFull(quantity) {
    return this.basketQuantity + quantity > this.basketCapacity;
  }

  mapShoppingListToReceipt() {
    const receipt = new Receipt();
    const discountInventory = new DiscountInventory();
    
    // Calculate bagel coffee sets
    const plainBagelAmount = this.products.find(item => item.product.sku === "BGLP")?.quantity || 0;
    const blackCoffee = this.products.find(item => item.product.sku === "COFB")?.quantity || 0;
  
    if (blackCoffee > 0 && plainBagelAmount > 0) {
      const bagelCoffeeSet = Math.min(plainBagelAmount, blackCoffee);
  
      // Update the amounts in shoppingList
      const plainBagelIndex = this.products.findIndex(item => item.product.sku === "BGLP");
      const blackCoffeeIndex = this.products.findIndex(item => item.product.sku === "COFB");
  
      if (plainBagelIndex !== -1) {
        this.products[plainBagelIndex].quantity = plainBagelAmount - bagelCoffeeSet;
      }
  
      if (blackCoffeeIndex !== -1) {
        this.products[blackCoffeeIndex].quantity = blackCoffee - bagelCoffeeSet;
      }
  
      // Add special coffee offer to the receipt
      const specialCoffeeOfferPrice = bagelCoffeeSet * 1.25;
      receipt.addProduct(new ReceiptLine(this.products.find(item => item.product.sku === "COFB"), bagelCoffeeSet, specialCoffeeOfferPrice, true));
    }

    for (const item of this.products) {
      const quantity = item.quantity;
      if (quantity >0){
      if (item.product.sku.startsWith("BGL")) {
        const discount = discountInventory.searchDiscount(item.product.sku);
  
        if (discount) {
          const discountedSetsAmount = Math.floor(quantity / discount.quantity);
          const remainingAmountRegularPriceAmount = quantity % discount.quantity;
  
          const price = discount.price *discountedSetsAmount + remainingAmountRegularPriceAmount * item.product.price;
    
          receipt.addProduct(new ReceiptLine(item, quantity, Number(price.toFixed(2)), false));
        } else {
          receipt.addProduct(new ReceiptLine(item, quantity), item.product.price *quantity, false);
        }
      } else {
        receipt.addProduct(new ReceiptLine(item, quantity), item.product.price * quantity, false);
      }
    }
  }
  
    return receipt;
  }

  total() {
    const receipt = this.mapShoppingListToReceipt();

    return receipt.products.reduce((total, product) => total + product.price,0);
  }
}

module.exports = Basket;
