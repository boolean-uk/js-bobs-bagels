const Basket = require('./basket.js')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('should create a new basket', () => {
    expect(basket).toBeInstanceOf(Basket)
    expect(basket.basketQuantity).toBe(10)
    expect(basket.items.length).toBe(0)
  })

  it('should add item from inventory to basket', () => {
    expect(basket.addItem('BGLE')).toEqual({
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything',
      quantity: 1
    })
  })

  it('should return false if item does not exist in inventory', () => {
    expect(basket.addItem('NaN')).toBe(false)
  })

  it('should return false if added item exceeds bag quantity', () => {
    const bagQuantity = 1
    const fullBasket = new Basket(bagQuantity)
    fullBasket.addItem('BGLE')
    expect(fullBasket.addItem('BGLE')).toBe(false)
  })

  it('if the item already exists in basket, increment the quantity on the item', () => {
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    expect(basket.items.length).toBe(1)
    expect(basket.items[0].quantity).toBe(2)
  })

  it('should delete item from basket if it exists in the basket', () => {
    basket.addItem('BGLE')
    basket.addItem('COF')
    basket.addItem('BGLE')
    expect(basket.deleteItem('BGLE')).toEqual({
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything',
      quantity: 2
    })
    expect(basket.items.length).toBe(1)
  })

  it('should return false if item, does not exist in basket when deleting', () => {
    basket.addItem('BGLE')
    basket.addItem('COF')
    expect(basket.deleteItem('BGLP')).toBe(false)
    expect(basket.items.length).toBe(2)
  })

  it('should edit item by giving sku and key/value pairs to edit', () => {
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    expect(basket.editItem('BGLE', { price: '1' })).toEqual({
      sku: 'BGLE',
      price: '1',
      name: 'Bagel',
      variant: 'Everything',
      quantity: 2
    })
  })

  it('should return false if item does not exist in basket', () => {
    basket.addItem('BGLE')
    expect(basket.editItem('COF', { price: '1' })).toBe(false)
  })

  it('should delete item if edit reduces quantity to 0', () => {
    basket.addItem('BGLE')
    expect(basket.editItem('BGLE', { quantity: 0 })).toEqual({
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything',
      quantity: 0
    })
    expect(basket.items.length).toBe(0)
  })

  it('should tell you if the basket is full', () => {
    const bagQuantity = 2
    const fullBasket = new Basket(bagQuantity)
    fullBasket.addItem('BGLE')
    fullBasket.addItem('BGLE')
    expect(fullBasket.isFull()).toBe(true)
  })

  it('should be able to search for a basket item', () => {
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    basket.addItem('COF')
    expect(basket.searchBasket('BGLE')).toEqual({
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything',
      quantity: 2
    })
    expect(basket.searchBasket('BGLO')).toBe(false)
  })

  it('should get the total price for the basket', () => {
    basket.addItem('COF')
    basket.addItem('COF')
    basket.addItem('BGLE')
    basket.addItem('BGLE')
    expect(basket.getTotalPrice()).toBeCloseTo('2.96')
  })

  it('should get the correct total price for the basket if one or more deal is present', () => {
    for (let i = 0; i < 16; i++) {
      basket.addItem('BGLE')
    }
    for (let i = 0; i < 16; i++) {
      basket.addItem('BGLO')
    }
    basket.checkForDeal()
    expect(basket.getTotalPrice()).toBeCloseTo('13.88')
  })

  it('should be able to see if the basket contains an item which warrants a deal', () => {
    for (let i = 0; i < 6; i++) {
      basket.addItem('BGLE')
    }
    expect(basket.checkForDeal()).toBe(true)
  })

  it('if a deal is found, it should add the deal price to the item in the basket and the number of deals obtained', () => {
    for (let i = 0; i < 14; i++) {
      basket.addItem('BGLE')
    }
    expect(basket.checkForDeal()).toBe(true)
    expect(basket.searchBasket('BGLE')).toEqual({
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything',
      dealPrice: '2.49',
      noOfDeals: 2,
      quantity: 2
    })
  })

  it('should be able to see the current order', () => {
    for (let i = 0; i < 14; i++) {
      basket.addItem('BGLE')
    }
    expect(basket.seeCurrentOrder()).toBeDefined()
  })
})
