// spec.js
// const basketService = require('../src/services/js')
// const { basketsData, bagelsData } = require('../src/services/basketsData.js')
import { basketsData } from '../src/services/basketsData.js'
import { bagelsData } from '../src/services/bagelsData.js'

import {
  increaseCapacity,
  getBasketsData,
  isBasketFull,
  createBasket,
  getBasket,
  removeFromBasket,
  addToBasket,
  getTotal,
  getBasketSize,
  getBasketCapacity
} from '../src/services/basketService.js'

describe('Basket Service', () => {
  // Initialize test data (you can add more test data as needed)
  const testBasketId = 1
  const testBagelId = 'BGLP'

  beforeEach(() => {
    // Reset data before each test
    basketsData.length = 0

    // Add some initial test data
    createBasket(5) // Creates a basket with capacity 5
    createBasket(3) // Creates a basket with capacity 3

    // Add some items to the first basket
    addToBasket(testBasketId, testBagelId)
  })

  describe('increaseCapacity', () => {
    it('should increase the capacity of a basket', () => {
      const newCapacity = 10
      const updatedBasket = increaseCapacity(testBasketId, newCapacity)
      expect(updatedBasket.capacity).toEqual(newCapacity)
    })
  })

  describe('isBasketFull', () => {
    it('should return true when the basket is full', () => {
      const basketId = 2 // The second basket with capacity 3
      addToBasket(basketId, 'BGLO')
      addToBasket(basketId, 'BGLO')
      addToBasket(basketId, 'BGLP')
      expect(isBasketFull(basketId)).toBe(true)
    })

    it('should return false when the basket is not full', () => {
      expect(isBasketFull(testBasketId)).toBe(false)
    })
  })

  describe('getBasket', () => {
    it('should throw an error when the basket is not found', () => {
      expect(() => getBasket(999)).toThrowError('Basket not found')
    })

    it('should return the basket and total', () => {
      const result = getBasket(testBasketId)
      expect(result).toEqual({
        code: 200,
        status: 'success',
        message: 'Basket details and total fetched successfully',
        data: {
          basket: {
            id: 1,
            capacity: 5,
            items: [
              { sku: 'BGLP', price: '0.39', name: 'Bagel', variant: 'Plain' }
            ]
          },
          total: '0.39'
        }
      })
    })
  })

  describe('removeFromBasket', () => {
    it('should throw an error when the bagel is not found in the basket', () => {
      expect(() => removeFromBasket(testBasketId, 'BGLO')).toThrowError(
        'Bagel not found in the basket'
      )
    })

    it('should remove the bagel from the basket', () => {
      addToBasket(testBasketId, 'BGLP')
      const result = removeFromBasket(testBasketId, 'BGLP')
      expect(result).toEqual({
        code: 200,
        status: 'success',
        message: 'Bagel removed from the basket successfully'
      })
      expect(basketsData[0].items.length).toBe(1)
    })
  })

  describe('addToBasket', () => {
    it('should throw an error when the basket or bagel is not found', () => {
      expect(() => addToBasket(992, 'BGLOS')).toThrowError('Basket not found')
    })

    it('should throw an error when the basket is full', () => {
      addToBasket(testBasketId, 'BGLP')
      addToBasket(testBasketId, 'BGLP')
      addToBasket(testBasketId, 'BGLP')
      addToBasket(testBasketId, 'BGLP')

      // console.error(getBasketCapacity(testBasketId))
      // console.error(getBasketSize(testBasketId))
      expect(() => addToBasket(testBasketId, 'BGLO')).toThrowError(
        'Basket is full'
      )
    })

    it('should add the bagel to the basket', () => {
      const result = addToBasket(testBasketId, 'BGLP')
      expect(result).toEqual({
        code: 200,
        status: 'success',
        message: 'Bagel added to the basket successfully'
      })
      expect(basketsData[0].items.length).toBe(2)
    })
  })

  describe('getTotal', () => {
    it('should return the total price of items in the basket', () => {
      const basketId = 2 // The second basket with capacity 3
      addToBasket(basketId, 'BGLO')
      addToBasket(basketId, 'BGLP')
      const total = getTotal(basketId)
      console.log(total)
      expect(total).toBe('0.88')
    })
  })
})
