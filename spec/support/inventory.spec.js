/* eslint-disable prettier/prettier */
// const { Basket } = require("../../Basket")
const { Inventory } = require("../../src/Inventory")
const { Product } = require("../../src/Product")


describe('Testing class Inventory', () => {

    let inventory
    let product1
    beforeEach(() => {

        inventory = new Inventory()
        product1 = new Product("BGLO", 0.49, "Bagel", "Onion")
    })
    it('should return Product by SKU', () => {
        expect(inventory.getProductBySKU('BGLO').sku).toEqual(product1.sku)
        expect(inventory.getProductBySKU('BGLO').price).toEqual(product1.price)
        expect(inventory.getProductBySKU('BGLO').name).toEqual(product1.name)
        expect(inventory.getProductBySKU('BGLO').variant).toEqual(product1.variant)
    })


})
