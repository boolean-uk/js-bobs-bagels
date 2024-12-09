
import BobsBagels, { Bagel } from "../../src/basket.js";

describe('Bobs Bagels', () => {
    let bobsBagels
    beforeEach(() => {
        bobsBagels = new BobsBagels()
    })
    it('should exist', () => {
        expect(bobsBagels).toBeInstanceOf(BobsBagels)
    })
    it('should create a bagel order', () => {
        const expected = [new Bagel(1, 'poppyseed', 1)]
        const order = bobsBagels.addToBasket('poppyseed')
        expect(order).toEqual(expected)
    })
    it('should add bagels to the basket', () => {
        bobsBagels.addToBasket({ id: 1, name: 'poppyseed' })
        expect(bobsBagels.basket.length).toBe(1)
    })
    it('should be allow bagels to be removed from basket', () => {
        const expected = new Bagel(2, 'poppyseed', 2)
        bobsBagels.addToBasket('plain')
        bobsBagels.addToBasket('poppyseed')
        const removed = bobsBagels.remove('poppyseed')
        expect(removed).toEqual(expected)
    })
    it('should alert customer when basket has reached 6 bagel limit', () => {
        bobsBagels.addToBasket('poppyseed bagel')
        bobsBagels.addToBasket('plain bagel')
        bobsBagels.addToBasket('sesame bagel')
        bobsBagels.addToBasket('salmon bagel')
        bobsBagels.addToBasket('cream cheese bagel')
        bobsBagels.addToBasket('meat feast bagel')
        expect(() => bobsBagels.addToBasket()).toThrow("basket is at full capacity")
    })
    it('should allow managers to create a larger capacity basket', () => {
        bobsBagels.createManagerXlBasket('poppyseed bagel')
        expect(bobsBagels.xlBasket.length).toBe(1)
    })
    it("should alert customer if they try to remove an item that doesn't exist", () => {
        expect(() => bobsBagels.remove('chips')).toThrow("this item doesn't exist")
    })
    it('should return the price of the bagel selected', () => {
        const expected = { bagel: 'poppyseed', price: 5.99 }
        bobsBagels.checkPrice('poppyseed')
        let price = bobsBagels.checkPrice('poppyseed')
        expect(price).toEqual(expected)
    })
    it('should create a new property on the item that increments', () => {
        bobsBagels.addToBasket('poppyseed')
        const expected = new Bagel(2, 'poppyseed', 2)
        let order = bobsBagels.multiBuys('poppyseed')
        expect(order).toEqual(expected)
    })
    it('should sum up the total price of the basket', () => {
        bobsBagels.addToBasket('poppyseed')
        bobsBagels.addToBasket('plain')
        const expected = '£9.98'
        let result = bobsBagels.basketTotal()
        expect(result).toBe(expected)
    })
})