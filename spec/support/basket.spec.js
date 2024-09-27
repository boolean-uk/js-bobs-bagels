const { Basket } = require('../../src/basket.js')


describe('Basket', () => {

    it('should add item', () => {
        const basket = new Basket()
        expect(basket.addItem("BGLO")).toEqual(true)
        expect(basket.addItem("BGLP")).toEqual(true)
        expect(basket.addItem("BGLE")).toEqual(true)
        expect(basket.addItem("BGLO")).toEqual(true)
        expect(basket.addItem("XYZ")).toEqual(false)
        expect(basket.addItem("BGLP")).toEqual(false)
    })
    
    it('should remove item', () => {
        const basket = new Basket()
        basket.addItem("BGLO")
        basket.addItem("BGLP")
        basket.addItem("BGLE")
        basket.addItem("BGLO")
        expect(basket.removeItem("BGLP")).toEqual(true)
        expect(basket.removeItem("BGLO")).toEqual(true)
        expect(basket.removeItem("BGLO")).toEqual(true)
        expect(basket.removeItem("XYZ")).toEqual(false)
    })

    it('should not add if basket is full', () => {
        const basket = new Basket()
        expect(basket.addItem("BGLO")).toEqual(true)
        expect(basket.addItem("BGLP")).toEqual(true)
        expect(basket.addItem("BGLE")).toEqual(true)
        expect(basket.addItem("BGLO")).toEqual(true)
        expect(basket.addItem("BGLP")).toEqual(false)
        expect(basket.addItem("BGLE")).toEqual(false)
        expect(basket.setCapacity(5)).toEqual(true)
        expect(basket.addItem("BGLE")).toEqual(true)
    })

    it('should change default capacity', () => {
        Basket.setDefaultCapacity(2)
        const basket = new Basket()
        expect(basket.addItem("BGLO")).toEqual(true)
        expect(basket.addItem("BGLP")).toEqual(true)
        expect(basket.addItem("BGLP")).toEqual(false)
        expect(basket.addItem("BGLE")).toEqual(false)
        Basket.setDefaultCapacity(4)
    })

    it('should not remove if item does not exist in basket', () => {
        const basket = new Basket()
        basket.addItem("BGLO")
        basket.addItem("BGLP")
        basket.addItem("BGLE")
        basket.addItem("BGLO")
        expect(basket.removeItem("XYZ")).toEqual(false)
        expect(basket.removeItem("BGSE")).toEqual(false)
    })

    it('should return item\'s price', () => {
        expect(Basket.getPrice("XYZ")).toEqual(false)
        expect(Basket.getPrice("BGSE")).toEqual(2.99)
        expect(Basket.getPrice("BGLS")).toEqual(0.49)
    })

    it('should add many items', () => {
        const basket = new Basket()
        basket.setCapacity(6)
        expect(basket.addItem("BGLO", 2)).toEqual(true)
        expect(basket.addItem("BGLP", 3)).toEqual(true)
        expect(basket.addItem("BGLO", 2)).toEqual(false)
    })

    it('should calculate total cost', () => {
        const basket = new Basket()
        basket.setCapacity(10)
        basket.addItem("BGLO", 2)
        basket.addItem("BGLP", 3)
        basket.addItem("BGLO", 2)
        basket.addItem("BGSE", 2)
        expect(basket.totalCost()).toEqual(4 * 0.49 + 3 * 0.39 + 2 * 2.99)
        basket.addItem("BGSS", 1)
        expect(basket.totalCost()).toEqual(4 * 0.49 + 3 * 0.39 + 2 * 2.99 + 1 * 4.99)
    })
})