const { Basket } = require('../src/basket.js')

describe('Basket', () => {
  let b

  beforeEach(() => {
    b = new Basket()
  })

  describe('adds bagel to the basket', () => {
    it('bagel must be returned as an object', () => {
      const bagel = {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      }

      const result = b.addItemToBasket('BGLO')

      expect(result).toEqual(bagel)
    })

    it('if bagel is not valid object ', () => {
      const result = b.addItemToBasket()
      expect(result).toEqual('No bagels found')
    })

    it('update the basket with the items', () => {
      const bagel = {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      }

      b.addItemToBasket('BGLO')
      const result = b.getBasket()
      expect(result).toEqual([bagel])
    })
  })

  describe('remove bagel from the basket', () => {
    it('remove the selected bagel from the basket', () => {
      const bagel = [
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

      b.addItemToBasket('BGLO')
      b.addItemToBasket('BGLP')
      b.addItemToBasket('BGLE')
      b.removeItemFromBasket('BGLO')

      const result = b.getBasket()
      expect(result).toEqual(bagel)
    })

    it('if invalid return an error message', () => {
      const result = b.removeItemFromBasket()
      expect(result).toEqual('first add bagel in the basket')
    })
  })

  describe('basket full:cannot add bagels more ', () => {
    it('give an error that basket is full', () => {
      b.addItemToBasket('BGLO')
      b.addItemToBasket('BGLP')
      b.addItemToBasket('BGLE')
      b.addItemToBasket('BGLS')
      b.addItemToBasket('BGLO')

      const result = b.addItemToBasket('BGLP')
      expect(result).toEqual('Basket is Full!!cannot add more bagels!')
    })
  })

  fdescribe('increase the max capacity of basket', () => {
    it('basket capacity is changed to this number', () => {
      b.increaseBasket(10)

      const maxCapacity = 10

      const result = b.maxCapacity

      expect(result).toEqual(maxCapacity)
    })

    it('returns an error to input a valid number ', () => {
      const result = b.increaseBasket()
      expect(result).toEqual('Please enter a valid number')
    })
  })
})
