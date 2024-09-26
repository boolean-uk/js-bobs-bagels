const { Basket } = require('../../src/basket.js');

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should add an item to the basket', () => {
    basket.addItem('BGLO')
    expect(basket.items.length).toBe(1)
  })

  it('should remove an item from the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.removeItem('BGLO')
    expect(basket.items.length).toBe(1)
    expect(basket.items[0].sku).toBe('BGLP')
  })


  it('should know when the basket is full', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.addItem('BGLE')
    basket.addItem('COF')
    basket.addItem('COF')
    expect(basket.isFull()).toBe(true)
  })

  it('should create baskets with larger capacity', () => {
    basket.setCapacity(8)
    expect(basket.capacity).toBe(8)
  })

  it('should not overfill a larger basket', () => {
    basket.setCapacity(8)
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.addItem('BGLE')
    basket.addItem('COF')
    basket.addItem('COF')
    basket.addItem('BGLP')
    expect(basket.isFull()).toBe(false)
  })

  it('should not remove an item that doesn\'t exist in the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    const result = basket.removeItem('BGLE')
    expect(result).toBe(false)
  })


  it('should display the price of each item before adding it to the basket', () => {
    const items = basket.addItem('BGLO')
    expect(items[0].price).toBeDefined()
  })

  it('should allow adding multiple quantities of the same bagel', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    expect(basket.items[0].quantity).toBe(2)
  })

  it('should calculate the total sum of the bagels in the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.addItem('BGLE')
    basket.addItem('COF')
    expect(Number(basket.getTotalPrice().toFixed(2))).toBeCloseTo(2.36, 2)
  })

  it('should apply the special offer for BGLO (6 for 2.49)', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.getDiscount()
    expect(Number(basket.getTotalPrice().toFixed(2))).toBeCloseTo(2.49, 2)
  })
  
  it('should apply the special offer for BGLP (12 for 3.99)', () => {
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.addItem('BGLP')
    basket.getDiscount()
    expect(Number(basket.getTotalPrice().toFixed(2))).toBeCloseTo(3.99, 2)
  })
  
  it('should apply the special offer for BGLE (6 for 2.49)', () => {
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    basket.getDiscount()
    expect(Number(basket.getTotalPrice().toFixed(2))).toBeCloseTo(2.49, 2)
  })
  
  it('should apply the special offer for COF (Coffee & Plain Bagel for 1.25)', () => {
    basket.addItem('COF')
    basket.addItem('BGLP')
    basket.getDiscount()
    expect(Number(basket.getTotalPrice().toFixed(2))).toBeCloseTo(1.25, 2)
  })
})