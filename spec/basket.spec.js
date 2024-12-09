// Functions:
// addItem(obj)
// removeItem(obj)
// isFull()
// changeCapacity(newCapacity)
// getPriceOfItem(obj)
// totalPrice()

describe('Basket', () => {
  let basket

  beforeEach(() => {
    delete require.cache[require.resolve('../src/basket.js')]
    basket = require('../src/basket.js')
  })

  it('should add one item to basket', () => {
    // Set up
    const result = basket.addItem({ name: 'Bagel', variant: 'Onion' })
    // Test
    expect(result).toEqual(true)
  })

  it('shouldnt add sixth item to basket', () => {
    // Set up
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    const result = basket.addItem({ name: 'Bagel', variant: 'Onion' })
    // Test
    expect(result).toEqual(false)
  })

  it('should remove item from basket', () => {
    const bagel = { name: 'Bagel', variant: 'Plain' }
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem(bagel)
    const result = basket.removeItem(bagel)
    expect(result).toEqual(true)
  })

  it('should throw error', () => {
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    expect(() =>
      basket.removeItem({ name: 'Bagel', variant: 'Plain' })
    ).toThrowError()
  })

  it('should return true - basket is full', () => {
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    const result = basket.isFull()
    expect(result).toEqual(true)
  })

  it('should return false - basket is not full', () => {
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    basket.addItem({ name: 'Bagel', variant: 'Onion' })
    const result = basket.isFull()
    expect(result).toEqual(false)
  })

  it('should return 7', () => {
    const result = basket.changeCapacity(7)
    expect(result).toEqual(7)
  })

  it('should throw error', () => {
    expect(() => basket.changeCapacity(3)).toThrowError()
  })

  it('should return equal to 0.39', () => {
    basket.getPriceOfItem({ name: 'Bagel', variant: 'Plain', price: 0.39 })
  })

  it('should return equal to 0.49', () => {
    basket.getPriceOfItem({ name: 'Bagel', variant: 'Onion', price: 0.49 })
  })

  it('should return equal 0.49', () => {
    basket.addItem({ name: 'Bagel', variant: 'Onion', price: 0.49 })
    const result = basket.totalPrice()
    expect(result).toEqual(0.49)
  })

  it('should return equal 1.47', () => {
    basket.addItem({ name: 'Bagel', variant: 'Onion', price: 0.49 })
    basket.addItem({ name: 'Bagel', variant: 'Onion', price: 0.49 })
    basket.addItem({ name: 'Bagel', variant: 'Onion', price: 0.49 })
    const result = basket.totalPrice()
    expect(result).toEqual(1.47)
  })
})
