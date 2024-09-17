/* eslint-disable prettier/prettier */
// const { Basket } = require("../../Basket")
const { Product } = require("../../src/Product")


describe('Testing class product', () => {

    let product1
 

    beforeEach(() => {
        product1 = new Product("BGLO", 0.49, "Bagel", "Onion")
    })
    it('should return price of a product', () => {
        expect(product1.getPrice()).toEqual(0.49)
    })


})
