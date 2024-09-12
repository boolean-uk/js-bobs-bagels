const data = require("../inventory.json");
const INVENTORY = data["inventory"];

class Receipt {
    constructor(basketCheckout) {
      this.items = basketCheckout;
    }

print(price) {
    // here we make receipt
    
    let onionBagel = this.items.filter(x => x.sku === "BGLO").length
    let everythingBagel = this.items.filter(x => x.sku === "BGLE").length
    let plainBagel = this.items.filter(x => x.sku === "BGLP").length
    let sesameBagel = this.items.filter(x => x.sku === "BGLS").length
    let coffee = this.items.filter(x => x.sku === "COF").length
    let everythingSandwich = this.items.filter(x => x.sku === "BGSE").length
    let sesameSandwich = this.items.filter(x => x.sku === "BGSS").length

    let receiptItems = `\n${this.addingItemsToReceipt(onionBagel, "BGLO")}` + `${this.addingItemsToReceipt(everythingBagel, "BGLE")}` +
    `${this.addingItemsToReceipt(plainBagel, "BGLP")}` + `${this.addingItemsToReceipt(sesameBagel, "BGLS")}` +
    `${this.addingItemsToReceipt(everythingSandwich, "BGSE")}` + `${this.addingItemsToReceipt(sesameSandwich, "BGLE")}` + `${this.addingItemsToReceipt(coffee, "COF")}`

    
  
    
    return  `
        ~~~ Bob's Bagels ~~~
    
       ${Date().substring(3,24)}
    
    ----------------------------
    
    ${receiptItems}
    
    ----------------------------
    Total                 £${price.toFixed(2)}
    
    
           Thank you
         for your order!
    
    `
    }

addingItemsToReceipt(value, item) {
    if(value > 0) {
        for(let i = 0; i< INVENTORY.length; i++) {
            if(INVENTORY[i].sku === item) {
                return `    ${INVENTORY[i].variant} ${INVENTORY[i].name}  \t${value}\t£${(Number(INVENTORY[i].price))*value}\n` 
            }
        }
  
    }
    return ``
}  

}

const exampleBasket = [
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
    { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' },
    { sku: 'BGLS', price: '0.49', name: 'Bagel', variant: 'Sesame' },
    { sku: 'BGLE', price: '0.49', name: 'Bagel', variant: 'Everything' },
    { sku: 'BGLO', price: '0.49', name: 'Bagel', variant: 'Onion' }
  ]

  let receipt = new Receipt(exampleBasket)
  console.log(receipt.print(10))

module.exports = Receipt