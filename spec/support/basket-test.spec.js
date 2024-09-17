const { Basket } = require('../../src/basket')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  // Adding item to the basket
  it('adds an item to the basket', () => {
    const item1 = 'BGLO'
    // const newItem = new Item(item1)
    basket.addItem(item1)
    expect(basket.items[0]).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
  })

  it('can add an item more than once to the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    expect(basket.items[0].quantity).toEqual(2)
  })

  // Removing item from the basket
  it('removes an item from the basket', () => {
    basket.addItem('BGLO')
    basket.removeItem('BGLO')
    expect(basket.items.length).toEqual(0)
  })

  it('should remove 2nd item from the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.removeItem('BGLO')
    expect(basket.items[0].sku).toEqual('BGLP')
  })

  it('cannot remove item not in the basket', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    const result = basket.removeItem('BGLE')
    expect(result).toBeFalse()
  })

  // isFullBasket()
  it('should return true if basket is full', () => {
    for (let i = 0; i < basket.capacity; i++) {
      basket.addItem('BGLO')
    }
    expect(basket.isBasketFull()).toBeTrue()
  })

  // Change the current basket capacity
  it('should change the current basket capacity', () => {
    const result = basket.changeCapacity(5)
    expect(result).toEqual(6)
  })

  // Getting the item price
  it('gets the ptice for each item', () => {
    const result = basket.getItemPrice('BGLO')
    expect(result).toEqual(0.49)
  })

  // Getting the total cost
  it('should get the total cost of items', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLP')
    basket.addItem('BGLE')
    expect(basket.getTotalCost()).toEqual(1.37)
  })

  // Extension 1

  it('should apply the special offer for BGLO (6 for 2.49)', () => {
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    const result = basket.getDiscount()
    expect(Number(result)).toEqual(2.49)
  })
})
