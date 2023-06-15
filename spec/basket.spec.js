import Basket from '../src/basket.js'

describe('Basket', () => {
  // to be more descriptive, add another describe (useful when working with more than one class)
  describe('addItem', () => {
    it('add item to basket', () => {
      // SET UP
      const newBasket = new Basket()
      const expected = [
        { sku: 'BGLE', price: '0.49', name: 'Bagel', variant: 'Everything' }
      ]

      // EXECUTE

      const result = newBasket.addItem('BGLE')
      // VERIFY
      expect(result).toEqual(expected)
    })
  })
  describe('removeItem', () => {
    it('remove item from basket', () => {
      // SET UP
      const newBasket = new Basket()
      newBasket.addItem('BGLE')
      const expected = []
      // EXECUTE
      const result = newBasket.removeItem('BGLE')
      // VERIFY
      expect(result).toEqual(expected)
    })
  })
  describe('addItem, capacity reached', () => {
    it('basket has reached maximum capacity', () => {
      // SETUP
      const newBasket = new Basket()
      newBasket.addItem('BGLE')
      const expected = 'basket full'

      // EXECUTE
      const result = newBasket.addItem('BGLE')

      // VERIFY
      expect(result).toEqual(expected)
    })
  })
  describe('increaseCapacity', () => {
    it('change the maximum capacity of a basket', () => {
      // SETUP
      const newBasket = new Basket()
      const expected = 'maximum basket capacity changed to 3'

      //  EXECUTE
      const result = newBasket.increaseCapacity(3)

      // VERIFY
      expect(result).toEqual(expected)
    })
  })

  describe('removeItem, item not in basket', () => {
    it('trying to remove an item that is not in the basket', () => {
      // SETUP
      const newBasket = new Basket()
      newBasket.addItem('BGLE')
      const expected = 'item not in basket'

      // EXECUTE
      const result = newBasket.removeItem('BGLS')

      // VERIFY
      expect(result).toEqual(expected)
    })
  })

describe('showPrice', () => {
    fit("want to see price appear next to bagel", () =>{
        // SET UP
        const newBasket = new Basket()
        const expected = 'price for Onion Bagel is £0.49'

        // EXECUTE
        const result = newBasket.showPrice('BGLO')

        // VERIFY
        expect(result).toEqual(expected)
    })
})

})
