const { Basket } = require('../src/basket')
// BGLO BGLP BGLE COF
describe('Basket Class', () => {
  let BasketClass
  beforeEach(() => {
    BasketClass = new Basket(10)
  })

  // isBasketFull
  it('expects true if basket is full', () => {
    BasketClass.basketSize = 3
    BasketClass.addBagel('BGSE')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLE')
    expect(BasketClass.addBagel('COF')).toBeFalse()
  })

  // isInInventory
  it('expects sku to be a string', () => {
    expect(BasketClass.isInInventory(92)).toBeFalse()
    expect(BasketClass.isInInventory(null)).toBeFalse()
  })

  // isInBasket
  it('expects sku to be a string', () => {
    expect(BasketClass.isInBasket(92)).toBeFalse()
    expect(BasketClass.isInBasket(null)).toBeFalse()
  })

  // addBagel
  it('expects sku to be a string', () => {
    expect(BasketClass.addBagel(92)).toBeFalse()
    expect(BasketClass.addBagel(null)).toBeFalse()
  })
  it('expects basket var to have new added bagel', () => {
    BasketClass.addBagel('BGSE')
    expect(BasketClass.basket).toHaveSize(1)
  })
  it('expects addBagel to return false when sku not found', () => {
    expect(BasketClass.addBagel('POTATO')).toBeFalse()
  })
  it('expects addBagel to sum repeated sku', () => {
    BasketClass.addBagel('BGLP')
    BasketClass.addBagel('BGLP')
    BasketClass.addBagel('COF')
    BasketClass.addBagel('COF') // Must increase quantity only
    expect(BasketClass.basket).toHaveSize(2)
  })

  // getAllInventory
  it('expects an array of objects to be returned', () => {
    expect(BasketClass.getAllInventory()).toHaveSize(7)
  })

  // removeBagel
  it('expects return of false if sku does not exist in basket', () => {
    BasketClass.addBagel('BGLP')
    expect(BasketClass.removeBagel('POTATO')).toBeFalse()
  })
  it('expects the item removed to be returned', () => {
    BasketClass.addBagel('BGLP')
    BasketClass.addBagel('COF')
    expect(BasketClass.removeBagel('BGLP').sku).toBe('BGLP')
  })

  // checkForOffers
  it('expects to update stackPrice of items in basket if the offer BGLO 6x per 2.49 is found', () => {
    BasketClass.addBagel('BGLO') // 1x unit of offer
    BasketClass.addBagel('BGLO') // 2x unit of offer
    BasketClass.addBagel('BGLO') // 3x unit of offer
    BasketClass.addBagel('BGLO') // 4x unit of offer
    BasketClass.addBagel('BGLO') // 5x unit of offer
    BasketClass.addBagel('BGLO') // priceOffer: 2.49
    BasketClass.addBagel('BGLO') // 0.49 individual
    BasketClass.addBagel('BGLO') // 0.49 individual
    BasketClass.addBagel('COF') // 0.99
    expect(BasketClass.totalPrice()).toBe(4.46)
  })
  it('expects to update stackPrice of items in this offer of 12x BGLP per 3.99', () => {
    BasketClass.addBagel('BGLP') // 1x unit of offer
    BasketClass.addBagel('BGLP') // 2x unit of offer
    BasketClass.addBagel('BGLP') // 3x unit of offer
    BasketClass.addBagel('BGLP') // 4x unit of offer
    BasketClass.addBagel('BGLP') // 5x unit of offer
    BasketClass.addBagel('BGLP') // 6x unit of offer
    BasketClass.addBagel('BGLP') // 7x unit of offer
    BasketClass.addBagel('BGLP') // 8x unit of offer
    BasketClass.addBagel('BGLP') // 9x unit of offer
    BasketClass.addBagel('BGLP') // 10x unit of offer
    BasketClass.addBagel('BGLP') // 11x unit of offer
    BasketClass.addBagel('BGLP') // 12x unit of offer
    expect(BasketClass.totalPrice()).toBe(3.99)
  })

  // totalPrice
  it('expects total os all item stackPrice to be returned', () => {
    BasketClass.addBagel('COF')
    BasketClass.addBagel('COF')
    BasketClass.addBagel('COF')
    BasketClass.addBagel('COF') // stackPrice: 3.96
    BasketClass.addBagel('BGLP')
    BasketClass.addBagel('BGLP') // stackPrice: 0.78
    BasketClass.addBagel('BGSE') // stackPrice: 2.99
    expect(BasketClass.totalPrice()).toBe(7.73)
  })

  // purchaseBasket
  it('expects a receipt to be returned after a purchase', () => {
    BasketClass.addBagel('COF')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLO')
    BasketClass.addBagel('BGLP')
    BasketClass.addBagel('COF')
    const receipt = BasketClass.purchaseBasket()
    expect(receipt.total).toBe(5.35)
  })
})
