const { Basket } = require('../../src/basket.js')

describe('basket tests', () => {
  let basket
  beforeEach(() => {
    basket = new Basket(10)
  })

  it('bagel added to array', () => {
    expect(basket.add('BGLP')).toEqual([
      {
        sku: 'BGLP',
        price: '0.39',
        name: 'Bagel',
        variant: 'Plain',
        quantity: 1
      }
    ])
  })

  it('bagel not added to array', () => {
    expect(basket.add('NONEXISTING')).toEqual([])
  })

  it('bagel removed from array', () => {
    basket.add('BGLP')
    expect(basket.remove('BGLP')).toEqual([])
  })
  it('bagel not existing', () => {
    expect(basket.remove('NONEXISTING')).toEqual('item doesnt exist in basket')
  })
  it('capacity changed', () => {
    expect(basket.changeCapacity(15)).toEqual(basket.capacity)
  })
  it('capacity changed', () => {
    basket.add('BGLP')
    basket.add('BGLP')
    expect(basket.changeCapacity(1)).toEqual('cannot change capacity')
  })
  it('check price of existing item', () => {
    expect(basket.checkPrice('BGLP')).toEqual('0.39')
  })
  it('check price of non existing item', () => {
    expect(basket.checkPrice('Nonexisting')).toEqual('item not found in inv')
  })

  it('totalprice', () => {
    basket.add('BGLP')
    basket.add('BGSE')
    expect(basket.totalPrice()).toEqual('3.38')
  })
  it('totalprice for empty basket', () => {
    expect(basket.totalPrice()).toEqual('0.00')
  })
  it('add multiple of same item', () => {
    expect(basket.add('BGLO', 5)).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 5
      }
    ])
  })
})
