const BasketList = require('../src/basket.js')

describe('basketList', () => {
  it('Add a new item1', () => {
    const input = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const basket = new BasketList()
    const result = basket.addToBasket(input)
    expect(result).toEqual(true)
  })
  it('Remove item', () => {
    const input = {
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion'
    }
    const input2 = {
      sku: 'BGLP',
      price: '0.39',
      name: 'Bagel',
      variant: 'Plain'
    }
    const basket = new BasketList()
    const result = basket.RemoveFromBasket(input, input2)
    expect(result).toEqual(true)
  })
})
