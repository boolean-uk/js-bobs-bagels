const { Inventory } = require('./Inventory')
class Basket {
    constructor (capacity = 5) {
       this.capacity = capacity
        this.basketList = {}
        this.inventory = new Inventory()
    }

    addProduct = (product, amount) => {
        if (this.capacity - this.getNumberOfProducts() >= amount) {
            this.basketList[product.sku] = (this.basketList[product.sku] || 0) + amount
        }
    }

    removeProduct = (product, amount) => {
        if (Object.keys(this.basketList).includes(product.sku)) {
            delete this.basketList[product.sku]
        } else return 'Product not in basket'
    }

    getPricesOfBagelsWithoutDiscount6Or12 = () => {
        return Object.entries(this.basketList)
        .filter(([product, quantity]) => product[0] === 'B')
        .flatMap(([product, quantity]) => Array((quantity % 6)).fill(this.inventory.getProductBySKU(product).getPrice()))
    }

    getPricesOfCoffees = () => {
        return Object.entries(this.basketList)
        .filter(([product, quantity]) => product[0] === 'C')
        .flatMap(([product, quantity]) => Array(quantity).fill(this.inventory.getProductBySKU(product).getPrice()))
    }


    getPriceOfProductsWithoutDiscount6Or12 = () => {
        const bagelsWithoutDiscount6Or12 = this.getPricesOfBagelsWithoutDiscount6Or12()
            
        const coffees = this.getPricesOfCoffees()
        if (bagelsWithoutDiscount6Or12.length > coffees.length) {
            return bagelsWithoutDiscount6Or12
                .slice(coffees.length)
                .reduce((x,y) => x + y, 0)
        } else {
            return coffees
                .slice(bagelsWithoutDiscount6Or12.length)
                .reduce((x,y) => x + y, 0)
        }
    }

    getPriceOfPromoCoffeeAndBagel = () => {
        const bagelsWithoutDiscount6Or12 = this.getPricesOfBagelsWithoutDiscount6Or12()
        const coffees = this.getPricesOfCoffees()
        if(bagelsWithoutDiscount6Or12.length > coffees.length) {
            return bagelsWithoutDiscount6Or12.slice(0, coffees.length).length * 1.25
        } else {
            return coffees.slice(0, bagelsWithoutDiscount6Or12.length).length * 1.25
        }
    }

    getPriceOfFillings = () => {
        return Object.entries(this.basketList)
            .filter(([product, quantity]) => product[0] === 'F')
            .map(([product, quantity]) => quantity * 0.12)
            .reduce((x, y) => x + y, 0)
    }

    getPriceOfMultipleBagels = () => {
        return Object.entries(this.basketList)
            .filter(([product, quantity]) => product.startsWith('B'))
            .map(([product, quantity]) => {
                if (quantity >= 6) {
                    const count = Math.floor(quantity / 6)
                    return 3.99 * Math.floor(count/2) + 2.49 * (count%2)
                }
                return 0.00
            }).reduce((x,y) => x+y,0)
    }

    getCapacity = () => {
        return this.capacity
    }
    setCapacity = (newCapacity) => {
        this.capacity = newCapacity
    }
    getBasketList = () => {
        return this.basketList
    }

    getNumberOfProducts = () => {
        return Object.values(this.basketList).reduce((x, y) => x + y, 0)
    }

    getNumberOfBagels = () => {
        const bagels = Object
            .entries(this.basketList)
            .filter(([product, quantity]) => product[0] === 'B')
            .map(([product,quantity])=>quantity)
        return bagels.reduce((x,y) => x+y,0)
    }

    isFull = () => {
        return this.getNumberOfProducts() === this.capacity
    }

    getTotalCost = () => {
        return this.getPriceOfProductsWithoutDiscount6Or12() + this.getPriceOfPromoCoffeeAndBagel() + this.getPriceOfFillings() + this.getPriceOfMultipleBagels()
    }

    getReceipt = () => {
        let receipt = []
        let variant
        let name 
        let price
        const pound = '\u00A3'
        const date = new Date()
        const now = date.getDate() + '-' + (date.getMonth()+1) + '-'
        + date.getFullYear() +" " 
        + date.getHours() + ":"  
        + date.getMinutes() + ":" 
        + date.getSeconds()
        receipt.push("    ~~~ Bob's Bagels ~~~");
        receipt.push("\n");
        receipt.push("\n");
        receipt.push("    " + now.toLocaleString());
        receipt.push("\n");
        receipt.push("\n");
        receipt.push("-".repeat(28));
        receipt.push("\n");

        for(let i in this.basketList) {
            name = this.inventory.getProductBySKU(i).name
            variant = this.inventory.getProductBySKU(i).variant
            price = this.inventory.getProductBySKU(i).getPrice() * this.basketList[i] 

            receipt.push(variant)
            receipt.push(' ')
            receipt.push(name)
            receipt.push(' ')
            receipt.push(this.basketList[i])
            receipt.push(' ')
            receipt.push(pound)
            receipt.push(price.toFixed(2))
            receipt.push('\n')
        }        

        receipt.push("-".repeat(28));
        receipt.push("\n");
        receipt.push("Total" + " ".repeat(18) + pound + this.getTotalCost().toFixed(2));
        receipt.push("\n");
        receipt.push("\n");

        receipt.push(" ".repeat(8) + "Thank you" + "\n");
        receipt.push(" ".repeat(6) + "for your order!");

        return receipt.join("")
    }
}

module.exports = {
    Basket
}