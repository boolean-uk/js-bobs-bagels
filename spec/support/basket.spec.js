const inventory = require('../../src/inventory')
const Basket = require('../../src/basket')

describe('basket', () => {
  it('should add an item to basket', () => {
    const expectedItem = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      }
    ]
    const basket = new Basket()
    const uniqueCode = 'BGLO'
    const result = basket.addToBasket(uniqueCode)
    expect(result).toEqual(expectedItem)
  })
  it('should remove item from basket', () => {
    const startData = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const expectedResult = [
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const basket = new Basket(startData)
    const uniqueCode = 'BGLO'
    const result = basket.removeFromBasket(uniqueCode)
    expect(result).toEqual(expectedResult)
  })
  it('reached capacity', () => {
    const startData = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
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
      },
      {
        sku: 'BGLS',
        price: '0.49',
        name: 'Bagel',
        variant: 'Sesame'
      },
      {
        sku: 'COF',
        price: '0.99',
        name: 'Bagel',
        variant: ''
      },
      {
        sku: 'BGSE',
        price: '2.99',
        name: 'Bagel Sandwich',
        variant: 'Everything',
        fillings: ['Bacon', 'Egg', 'Cheese']
      }
    ]
    const basket = new Basket(startData)
    const uniqueCode = 'BGLO'
    const result = basket.addToBasket(uniqueCode)
    const expectedResult =
      'reached capacity, would you like to increase capacity?'
    expect(result).toEqual(expectedResult)
  })
  it('increase capacity', () => {
    const basket = new Basket()
    const result = basket.increaseCapacity()
    const expectedResult = (basket.capacity = 8)
    expect(result).toEqual(expectedResult)
  })
  it('item does not exist in basket', () => {
    const startData = [
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const basket = new Basket(startData)
    const uniqueCode = 'BGLO'
    const result = basket.removeFromBasket(uniqueCode)
    const expectedResult = 'item does not exist in your basket'
    expect(result).toEqual(expectedResult)
  })
  it('view the price of a individual bagel', () => {
    const startData = [
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const basket = new Basket(startData)
    const uniqueCode = 'BGLP'
    const result = basket.viewPrice(uniqueCode)
    const expectedResult = '0.39'
    expect(result).toEqual(expectedResult)
  })
  it('can add more than one type of bagel to the basket', () => {
    const startData = [
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const basket = new Basket(startData)
    const uniqueCode = 'BGLP'
    const expectedResult = [
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const result = basket.addToBasket(uniqueCode)
    expect(result).toEqual(expectedResult)
  })
  it('show total cost for basket', () => {
    const startData = [
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion'
      },
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain'
      }
    ]
    const basket = new Basket(startData)
    const expectedResult = '0.88'
    const result = basket.totalCost()
    expect(result).toEqual(expectedResult)
  })
  it('total cost of basket with offers applied', () => {
    const startData = [
      inventory[0],
      inventory[0],
      inventory[0],
      inventory[0],
      inventory[0],
      inventory[0]
    ]
    const basket = new Basket(startData)
    const expectedResult = '2.49'
    const result = basket.totalCost()
    expect(result).toEqual(expectedResult)
  })
  it('total cost of mix basket coffe and plain bagels', () => {
    const startData = [
      inventory[4],
      inventory[1],
      inventory[1],
      inventory[4],
      inventory[4]
    ]
    const basket = new Basket(startData)
    const expectedResult = '3.49'
    const result = basket.totalCost()
    expect(result).toEqual(expectedResult)
  })
})
