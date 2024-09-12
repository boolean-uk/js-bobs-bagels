const data = require("../inventory-quant.json");
const INVENTORY = data["inventory"];


class Receipt2 {
    constructor(basketCheckout, savings) {
      this.items = basketCheckout;
      this.totalSavings = savings
    }

totalEachItem(object, numberOfItemsInDeal, priceOfDeal) {
   
const numberOfDeals = Math.floor(object.quantity/numberOfItemsInDeal)
const total = numberOfDeals*priceOfDeal + Number(object.price)*(object.quantity - numberOfDeals*numberOfItemsInDeal)

return Math.floor(total * 100) / 100;
}

printReceiptItems(object, numberOfItems, price) {
    return `    ${object.variant} ${object.name}`.padEnd(21, " ") + `${object.quantity}`.padStart(2," ") 
    +`£${this.totalEachItem(object, numberOfItems, price)}`.padStart(8, " ") + `\n`
    + `(-£${(Math.ceil((Number(object.price)*object.quantity - this.totalEachItem(object, numberOfItems, price))*100)/100).toFixed(2)})\n`.padStart(33, " ")
}

savingsMessage() {
    if(this.totalSavings === 0) {
        return " "
    }

    return `\n    You saved a total of £${this.totalSavings.toFixed(2)}
    \t on this shop\n` 
}

print(price) {

    let receiptItems = `\n`

    for(let i = 0; i< this.items.length; i++) {
        if(this.items[i].sku === "BGLO" && this.items[i].quantity >= 6) {
            receiptItems += this.printReceiptItems(this.items[i], 6, 2.49)       
        }
        else if(this.items[i].sku === "BGLE" && this.items[i].quantity >= 6) {
            receiptItems += this.printReceiptItems(this.items[i], 6, 2.49)
        }
        else if(this.items[i].sku === "BGLP" && this.items[i].quantity >= 12) {
            receiptItems += this.printReceiptItems(this.items[i], 12, 3.99)

        }
        else {
        receiptItems +=  `    ${this.items[i].variant} ${this.items[i].name}`.padEnd(21, " ") + `${this.items[i].quantity}`.padStart(2," ") 
        +`£${Math.ceil((Number(this.items[i].price)*this.items[i].quantity)*100)/100}`.padStart(8, " ") + `\n`
        }
    }
      
    for(let i = 0; i < this.items.length; i++) {
        for(let j = 0; j < this.items.length; j++) {
            if(this.items[i].sku === "BGLP" && this.items[i].quantity % 12 !== 0 && this.items[j].sku === "COF") {
                receiptItems += `Bagel Deal (-£${0.13*Math.min((this.items[i].quantity % 12), this.items[j].quantity)})\n`.padStart(33, " ")
            }
        }
    }
    
    return  `
        ~~~ Bob's Bagels ~~~
    
       ${Date().substring(3,24)}
    
    ----------------------------
    ${receiptItems}
    ----------------------------
    Total                 £${price.toFixed(2)}
    ${this.savingsMessage()}
           Thank you
         for your order!
    
    `
    }
  

}


module.exports = Receipt2