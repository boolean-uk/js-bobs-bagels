const { Basket } = require('../src/basket.js')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  describe('adding bagels to the basket', () => {
    it('should return a bagel as an object', () => {
      const bagel = {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      }

      const result = basket.addItemToBasket('BGLO')

      expect(result).toEqual(bagel)
    })

    it('should handle an invalid bagel object', () => {
      const result = basket.addItemToBasket()
      expect(result).toEqual('No bagels found')
    })

    it('should update the basket with the items', () => {
      const bagel = {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      }

      basket.addItemToBasket('BGLO')
      const result = basket.getBasket()
      expect(result).toEqual([bagel])
    })
  })

  describe('removing bagels from the basket', () => {
    it('should remove the selected bagel from the basket', () => {
      const bagels = [
        {
          sku: 'BGLP',
          price: '0.39',
          name: 'Bagel',
          variant: 'Plain'
        },
        {
          sku: 'BGLE',
          price: '0.49',
          name: 'Bagel',
          variant: 'Everything'
        }
      ]

      basket.addItemToBasket('BGLO')
      basket.addItemToBasket('BGLP')
      basket.addItemToBasket('BGLE')
      basket.removeItemFromBasket('BGLO')

      const result = basket.getBasket()
      expect(result).toEqual(bagels)
    })

    it('should handle invalid removal and return an error message', () => {
      const result = basket.removeItemFromBasket()
      expect(result).toEqual('First add a bagel to the basket')
    })
  })

  describe('basket full: cannot add more bagels', () => {
    it('should give an error when the basket is full', () => {
      basket.addItemToBasket('BGLO')
      basket.addItemToBasket('BGLP')
      basket.addItemToBasket('BGLE')
      basket.addItemToBasket('BGLS')
      basket.addItemToBasket('BGLO')

      const result = basket.addItemToBasket('BGLP')
      expect(result).toEqual('Basket is Full!! Cannot add more bagels!')
    })
  })

  fdescribe('increasing the max capacity of the basket', () => {
    it('should change the basket capacity to the specified number', () => {
      basket.increaseBasket(10)

      const maxCapacity = 10

      const result = basket.maxCapacity

      expect(result).toEqual(maxCapacity)
    })

    it('should return an error for an invalid input', () => {
      const result = basket.increaseBasket()
      expect(result).toEqual('Please enter a valid number')
    })
  })
})
