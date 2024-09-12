const {
  add,
  getBasket,
  setCapacity,
  remove,
  getBasketTotal
} = require('../src/basket.js')

describe('Basket', () => {
  beforeEach(() => {
    setCapacity(10)
  })

  it('should calculate total of my basket', () => {
    add('BGLO')
    add('BGLO')
    add('BGLP')

    const total = getBasketTotal()
    expect(total).toBe(1.37)
  })

  it('should remove a bagel if it exists in the basket', () => {
    add('BGLO')
    const removed = remove('BGLO')
    const basket = getBasket()

    expect(removed).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })

    expect(basket).toEqual([])
  })

  it('should return false if bagel doesnt exist when removing', () => {
    const removed = remove('BGLO')

    expect(removed).toBeFalse()
  })

  it("adds a bagel if Bagel doesn't already exist in the basket", () => {
    const bagel = add('BGLO')

    expect(bagel).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
  })

  it('should return false if basket is at capacity', () => {
    setCapacity(2)
    add('BGLO')
    add('BGLP')
    const result = add('BGLE')

    expect(result).toBeFalse()
  })

  it('should update the quantity on found bagels', () => {
    add('BGLO')
    const bagel = add('BGLO')

    expect(bagel).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 2
    })

    expect(getBasket()).toEqual([
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
