const BasketList = require('../src/basket.js')

describe('basketList', () => {
  it('Should add a new item into the basket', () => {
    const input = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const basket = new BasketList()
    basket.addToBasket(input)
    const result = basket.basket.includes(input)
    expect(result).toEqual(true)
  })
  it('Should be able to add two of the same type', () => {
    const onionBagel = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const basket = new BasketList()
    basket.addToBasket(onionBagel)
    basket.addToBasket(onionBagel)
    // I expect that there are two bagel of the same type in the basket list
    const result = basket.basket.filter((x) => {
      return x.sku === onionBagel.sku
    })
    expect(result.length).toEqual(2)
  })
  it('Should remove an item from the basket', () => {
    const basket = new BasketList()
    const bagel1 = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    basket.addToBasket(bagel1)
    const bagel2 = {
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything'
    }
    basket.addToBasket(bagel2)
    basket.RemoveFromBasket(bagel2)
    const result = basket.basket.filter((x) => {
      return x.sku === bagel2.sku
    })
    expect(result.length).toEqual(0)
  })
  it('Should warn when an item is not in the basket', () => {
    const basket = new BasketList()
    const bagel1 = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    basket.addToBasket(bagel1)
    const bagel2 = {
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything'
    }
    basket.RemoveFromBasket(bagel2)
    expect(basket.itemCheck(bagel2)).toEqual(false)
  })
  it('Should tell me if the basket is full', () => {
    const basket = new BasketList()
    basket.addToBasket({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    })
    basket.addToBasket({
      sku: 'BGLE',
      price: '0.49',
      name: 'Bagel',
      variant: 'Everything'
    })
    basket.addToBasket({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    })
    basket.addToBasket({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    })
    const result = basket.isBasketFull()
    expect(result).toEqual(true)
  })
  it('itemCheck', () => {
    const basket = new BasketList()
    basket.addToBasket({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    })
    basket.addToBasket({
      sku: 'DEF',
      price: '0.99',
      name: 'Bagel',
      variant: ''
    })
    const results = basket.itemCheck({ sku: 'DEF' })
    expect(results).toEqual(true)
  })
  it('Should return the price of a given item', () => {
    const basket = new BasketList()
    const item = {
      sku: 'DEF',
      price: '0.99',
      name: 'Bagel',
      variant: ''
    }

    const price = basket.itemPrice(item)
    expect(price).toEqual(item.price)
  })
  it('Should return the total price of the basket', () => {
    const basket = new BasketList()
    const item = {
      sku: 'DEF',
      price: '0.99',
      name: 'Bagel',
      variant: ''
    }
    basket.addToBasket(item)
    const total = basket.calculateSum()
    expect(total).toEqual(0.99)
  })
  it('Should be possible to create a larger basket', () => {
    const basket = new BasketList(5)
    expect(basket.maxcapacity).toEqual(5)
  })
})
