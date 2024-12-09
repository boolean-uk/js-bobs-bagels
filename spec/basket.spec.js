const Basket = require('../src/basket')
describe('addItem', () => {
  const basket = new Basket(2)
  it('should add item to the basket', () => {
    const item = basket.addItem('BGLO')
    expect(item).toEqual(['BGLO'])
  })
})

describe('addItem', () => {
  const basket = new Basket(3)
  it('should add 2 items to the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    expect(basket.items.length).toEqual(2)
  })
})

describe('addItem', () => {
  const basket = new Basket(0)
  it('shouldnot add any item to the basket', () => {
    const item = basket.addItem('BGLO')
    expect(basket.items.length).toEqual(0)
    expect(item).toEqual('You can not add an item')
  })
})

describe('removeItem', () => {
  const basket = new Basket(2)
  it('should remove item from the basket', () => {
    basket.addItem('BGLO')
    const result = basket.removeItem('BGLO')
    expect(result).toEqual([])
  })
})

describe('removeItem', () => {
  const basket = new Basket(2)
  it('shouldnot remove item from the basket', () => {
    basket.addItem('BGLO')
    const result = basket.removeItem('GH')
    expect(result).toEqual('Item does not exist')
  })
})

describe('checkPrice', () => {
  const basket = new Basket(2)
  it('should return price', () => {
    const result = basket.checkPrice('BGLO')
    expect(result).toEqual('0.49')
  })
})

describe('addItem', () => {
  const basket = new Basket(3)
  it('should add 2 items to the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    expect(basket.items).toEqual(['BGLO', 'BGLO'])
  })
})

describe('calculateTotalPrice', () => {
  const basket = new Basket(3)
  it('should return total price', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    const result = basket.calculateTotalPrice()
    expect(result).toEqual(0.49 + 0.39)
  })
})

describe('calculateTotalPriceManySameBagels', () => {
  const basket = new Basket(3)
  it('should return total price', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    const result = basket.calculateTotalPrice()
    expect(basket.items).toEqual(['BGLO', 'BGLO', 'BGLO'])
    expect(result).toEqual(0.49 * 3)
  })
})
describe('printing receipe', () => {
  const basket = new Basket(3)
  basket.addItem('BGLO')
  basket.addItem('BGLO')
  basket.addItem('BGLE')

  const receipt = basket.generateReceipt()
  console.log(receipt)
})
