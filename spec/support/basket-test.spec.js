const { Basket } = require('../../src/basket.js');

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  //addItem 
  it('should add Onion Bagel to the basket', () => {
    basket.addItem('BGLO')
    expect(basket.items[0].sku).toBe('BGLO')
  })

  it('should add multiple quantities of the same bagel', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    expect(basket.items[0].quantity).toBe(2)
  })

  //removeItem
  it('should remove an item from the basket', () => {
    basket.addItem('BGLO')
    basket.removeItem('BGLO')
    expect(basket.items.length).toBe(0)
  })

  it('should remove Onion Bagel from the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.removeItem('BGLO')
    expect(basket.items[0].sku).toBe('BGLP')
  })
  
  it('should not remove an item that is not present in the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    const result = basket.removeItem('BGLE')
    expect(result).toBe(false)
  })

  //isBasketFull
  it('should return true when the basket is full', () => {
    for (let i=0; i < basket.capacity; i++) {
        basket.addItem('BGLO')
    }
    expect(basket.isBasketFull()).toBe(true)
  })

  it('should return false when the basket is not full', () => {
    expect(basket.isBasketFull()).toBe(false)
  })

  //changeCapacity
  it('should expand basket capacity', () => {
    basket.changeCapacity(6)
    expect(basket.capacity).toBe(6)
  })

  it('should return false when basket is not full', () => {   
    for (let i=0;i<basket.capacity;i++) {
        basket.addItem('BGLO')
    }
    basket.changeCapacity(6)
    expect(basket.isBasketFull()).toBe(false)
  })

  it('should not change basket capacity', () => {   
    for (let i=0;i<basket.capacity;i++) {
        basket.addItem('BGLO')
    }
    basket.changeCapacity(4)
    expect(basket.capacity).toBe(5)
  })

  //getTotalCost
  it('should return total cost of all items in basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.addItem('BGLE')
    basket.addItem('COF')
    expect(Number(basket.getTotalCost())).toBeCloseTo(2.36, 2)
  })

  //getTotalCostWithDiscount
  it('should apply the special offer for BGLE (6 for 2.49)', () => {   
    basket.changeCapacity(6)
    for (let i=0; i < 6; i++) {
        basket.addItem('BGLE')
    }
    expect(Number(basket.getTotalCostWithDiscount())).toBeCloseTo(2.49, 2)
  })

  it('should apply the special offer for BGLP (12 for 3.99)', () => {   
    basket.changeCapacity(12)
    for (let i=0; i < 12; i++) {
        basket.addItem('BGLP')
    }
    expect(Number(basket.getTotalCostWithDiscount())).toBeCloseTo(3.99, 2)
  })

  it('should apply the special offer for Plain Bagel + Coffee', () => {   
    basket.addItem('BGLP')
    basket.addItem('COF')
    expect(Number(basket.getTotalCostWithDiscount())).toBeCloseTo(1.25, 2)
  })

  //checkItemPrice
  it('should return price of an item', () => {
    const result = basket.getItemPrice("BGLO")
    expect(result).toBe(0.49)
  })
})