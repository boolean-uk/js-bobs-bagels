const {
  add,
  basketReset,
  remove,
  returnBasket,
  totalBagelPrice,
  theCapacity
} = require('../../src/basket.js')

describe('basket ', () => {
  beforeEach(() => {
    basketReset()
  })

  it('should add the bagel to the basket', () => {
    const bagel = add('BGLO')

    expect(bagel).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
  })

  it('Should say false if the bagel not in the basket when trying to remove it', () => {
    const removed = remove('BGLO')

    expect(removed).toBeFalse()
  })

  it('should remove bagel from basket', () => {
    add('BGLO')
    const removed = remove('BGLO')
    const basket = returnBasket()

    expect(removed).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
    expect(basket).toEqual([])
  })

  it('Should return the total price of all my bagels', () => {
    add('BGLO')
    add('BGLO')
    add('BGLP')

    const totalPrice = totalBagelPrice()
    expect(totalPrice).toBe(1.37)
  })

  it('should say false when basket is at capacity', () => {
    theCapacity(3)
    add('BGLO')
    add('BGLD')
    add('BGLE')
    const result = add('BGLP')

    expect(result).toBeFalse()
  })
  it('Should update the quantity of bagels in the basket', () => {
    add('BGLO')
    const bagel = add('BGLO')

    expect(bagel).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 2
    })

    expect(returnBasket()).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 2
      }
    ])
  })
})
