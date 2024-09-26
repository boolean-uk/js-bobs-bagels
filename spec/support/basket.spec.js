/* eslint-disable prettier/prettier */
const { Basket } = require("../../src/basket")
const { Product } = require("../../src/Product")
const { Inventory } = require("../../src/Inventory")


describe('Testing class basket', () => {

    let inventory
    let basket
    let basket2
    let basket3
    let product1
    let product2
    let product3
    let filling1
    let filling2

    beforeEach(() => {
        inventory = new Inventory()
        basket = new Basket()
        basket2 = new Basket(2)
        basket3 = new Basket(30)
        product1 = new Product("BGLO", 0.49, "Bagel", "Onion")
        product2 = new Product("COFB", 0.99, "Coffee", "Black")
        product3 = new Product("BGLP", 0.39, "Bagel", "Plain")
        product4 = new Product("BGLE", 0.49, "Bagel", "Everything")
        filling1 = new Product("FILB",0.12,"Filling","Bacon")
        filling2 = new Product("FILE",0.12,"Filling","Egg")
    })

    it('should add product to basketList', () => {
        //Set up
        basket.addProduct(product1, 1)
        basket.addProduct(product2, 1)

        //Test
        expect(Object.keys(basket.getBasketList()).length).toEqual(2)
    })

    it('should not add product to basketList', () => {
        //Set up
        basket2.addProduct(product1, 1)
        basket2.addProduct(product2, 1)
        basket2.addProduct(product3, 1)

        //Test
        expect(Object.keys(basket2.getBasketList()).length).toEqual(2)
    })

    it('should remove product from basketList', () => {
        //Set up
        basket.addProduct(product1, 1)
        basket.addProduct(product2, 1)
        basket.removeProduct(product1, 1)

        //Test
        expect(Object.keys(basket.getBasketList()).length).toEqual(1)
        expect(Object.keys(basket.getBasketList()).includes(product1)).toBeFalsy()
    })

    it('should not remove product from basketList', () => {
        //Set up
        basket.addProduct(product1, 1)

        //Test
        expect(Object.keys(basket.getBasketList()).length).toEqual(1)
        expect(basket.removeProduct(product2, 1)).toEqual("Product not in basket")
    })

    it('should tell when basket is full', () => {
        basket2.addProduct(product2, 2)
        expect(basket2.isFull()).toBeTruthy()
    })

    it('should tell when basket is not full', () => {
        basket2.addProduct(product1, 1)
        expect(basket2.isFull()).toBeFalsy()
    })

    it('should change capacity', () => {
        expect(basket2.getCapacity()).toEqual(2)
        basket2.setCapacity(5)
        expect(basket2.getCapacity()).toEqual(5)
    })

    it('should return total sum of Products', () => {
        basket.addProduct(product1, 1)
        basket.addProduct(product2, 2)
        expect(basket.getNumberOfProducts()).toEqual(3)
    })
    it('should return total sum of bagels', () => {
        basket.addProduct(product1, 1)
        basket.addProduct(product2, 2)
        expect(basket.getNumberOfBagels()).toEqual(1)
    })
    it('should return price of bagels with discount', () => {
        basket3.addProduct(product1, 7)
        basket3.addProduct(product3, 14)
        expect(basket3.getPriceOfMultipleBagels()).toEqual(3.99 + 2.49)
    })
    it('should return price of fillings', () => {
        basket.addProduct(filling1, 2)
        basket.addProduct(filling2, 1)
        basket.addProduct(product1)
        expect(basket.getPriceOfFillings()).toEqual(3 * 0.12)
    })
    it('should return price of coffees without discount', () => {
        basket3.addProduct(product1, 2)
        basket3.addProduct(product2, 3)
        expect(basket3.getPriceOfProductsWithoutDiscount6Or12()).toEqual(0.99)
    })
    it('should return price of bagels without discount', () => {
        basket3.addProduct(product1, 3)
        basket3.addProduct(product2, 2)
        expect(basket3.getPriceOfProductsWithoutDiscount6Or12()).toEqual(0.49)
    })
    it('should return price of coffees and bagel promotion', () => {
        basket3.addProduct(product1, 2)
        basket3.addProduct(product2, 3)
        expect(basket3.getPriceOfPromoCoffeeAndBagel()).toEqual(2.50)
    })
    it('should return total cost of basket', () => {
        basket3.addProduct(product1, 2);
        basket3.addProduct(product2, 3);
        basket3.addProduct(product3, 14);
        basket3.addProduct(product4, 6);
        expect(basket3.getTotalCost()).toEqual(2*1.25 + 3.99 + 1.25 + 0.39 + 2.49)
    })

    it('should return the receipt', () => {
        basket3.addProduct(product1, 2);
        basket3.addProduct(product2, 3);
        basket3.addProduct(product3, 14);
        basket3.addProduct(product4, 6);

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

        for(let i in basket3.getBasketList()) {
            name = inventory.getProductBySKU(i).name
            variant = inventory.getProductBySKU(i).variant
            price = inventory.getProductBySKU(i).getPrice() * basket3.getBasketList()[i] 

            receipt.push(variant)
            receipt.push(' ')
            receipt.push(name)
            receipt.push(' ')
            receipt.push(basket3.getBasketList()[i])
            receipt.push(' ')
            receipt.push(pound)
            receipt.push(price.toFixed(2))
            receipt.push('\n')
        }        

        receipt.push("-".repeat(28));
        receipt.push("\n");
        receipt.push("Total" + " ".repeat(18) + pound + basket3.getTotalCost().toFixed(2));
        receipt.push("\n");
        receipt.push("\n");

        receipt.push(" ".repeat(8) + "Thank you" + "\n");
        receipt.push(" ".repeat(6) + "for your order!");

        expect(basket3.getReceipt()).toEqual(receipt.join(""))
    })
})
